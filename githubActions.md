# Github actions

A way to deploy your code from github.\
A continuous integration and continuous delivery (CI/CD) platform allowing for automation of build, test and deployment pipelines.\
These workflows can be triggered by different things, like commiting to a PR, merging a branch or deploy.

## Components

Configure a workflow to be triggered when an event occures in the repository. THe workflow contains one or more jobs which can run in sequential order og in parallel. Each job runs inside its own virtual machine runner, or inside a container, and consists of one or more steps where you define a script or run an action.

### Workflows
A configurable automated process that will run one of more jobs. They are defined by a YAML file checked into the repository and are triggered by an event, manually or run on a schedule.

These files are defined in `.github/workflows` and one repo can have multiple of these for different purposes.

### Events
A specific activity that are trigges a workflow run.\ Examples: creating a pull request, opening an issue, pushing a commit, merging a branch, releasing the application.


[Events that trigger workflows](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows)

### Jobs
A set of steps in a workflow that is executed on the same runner. Each step is either a shell script or an action. Steos are executed in order and depend on one another. Since they are executed at the same runner, you can share data between them.

By default jobs run in parallel, however it is possible to set dependencies between them. In this case the job, will wait for the dependent job to complete before running.

### Actions
A custom application for the GA platform that performs a complex but frequently repeated task. Using these help reduce the amount of repetitive code to write in your workflow.

### Runners
A server that runs the workflows after they are triggered. Each runner can run a single kob at a time and they can be Ubuntu Linux, Windows or macOS. Each workflow executes in a fresh, newly-provided virtual machine.


## Other things you can do
- Point to another workflow. This can take inputs, secrets as inputs and it can return output variable that can be used later

Example action\
Executed on pull-request to master when opened, commited or closed
```yaml
name: Build and deploy PR for review

on:
  pull_request:
    types:
      - opened
      - synchronize
      - closed
    branches:
      - master

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install tools
        run: dotnet tool restore
      - name: Format project
        run: dotnet tool run fantomas Arrangement-Svc --check
      - name: Format tests
        run: dotnet tool run fantomas Tests --check
      - name: Install dependencies
        run: dotnet restore
      - name: Build
        run: dotnet build --configuration Release --no-restore
      - name: Test
        run: ARRANGEMENT_SVC_CONTAINER_MANAGER=docker dotnet test --no-restore
        env:
            OFFICEEVENTS__TENANTID: ${{ secrets.OFFICEEVENTS__TENANTID }}
            OFFICEEVENTS__MAILBOX: ${{ secrets.OFFICEEVENTS__MAILBOX }}
            OFFICEEVENTS__CLIENTID: ${{ secrets.OFFICEEVENTS__CLIENTID }}
            OFFICEEVENTS__CLIENTSECRET: ${{ secrets.OFFICEEVENTS__CLIENTSECRET }}


  build:
    # General condition
    if: contains(github.event.pull_request.title, 'preview')
    name: Build and push docker image
    # Points to other workflow
    uses: bekk/bekk-ci-workflows/.github/workflows/build.yml@master
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.BEKK_BASEN_ACCESS_KEY_ID_DEV }}
      AWS_SECRET_ACCESS_KEY:  ${{ secrets.BEKK_BASEN_SECRET_ACCESS_KEY_DEV }}

  deploy:
    if: contains(github.event.pull_request.title, 'preview')
    name: Deploy arrangement-svc for review
    uses: bekk/bekk-ci-workflows/.github/workflows/review.yml@master
    # Dependent on earlier job
    needs: build
    with:
    # Uses outputs from the 'build' sted
      IMAGE_NAME: ${{ needs.build.outputs.image_name }}
      IMAGE_TAG: ${{ needs.build.outputs.image_tag }}
      TERRAFORM_WORKSPACE: $GITHUB_HEAD_REF
    secrets:
      AWS_ACCESS_KEY_ID: ${{ secrets.BEKK_BASEN_ACCESS_KEY_ID_DEV }}
      AWS_SECRET_ACCESS_KEY:  ${{ secrets.BEKK_BASEN_SECRET_ACCESS_KEY_DEV }}
      SSH_PRIVATE_KEY: ${{ secrets.BEKK_BASEN_TERRAFORM_SSH_PRIVATE_KEY }}
```

Example that takes inputs and secrets and returns output variables:
```yaml
name: Build and push docker image

on:
  workflow_call:
    inputs:
      AWS_REGION:
        required: false
        type: string
        default: "eu-central-1"
      ECR_REPOSITORY:
        required: false
        type: string
        default: ${{ github.event.repository.name }}
        # Defines output variables used in the 'deploy' job in the example above
    outputs:
      image_name:
        description: "Image name"
        value: ${{ jobs.build.outputs.image }}
      image_tag:
        description: "Image tag"
        value: ${{ jobs.build.outputs.image_tag }}

    secrets:
      AWS_ACCESS_KEY_ID:
        required: true
      AWS_SECRET_ACCESS_KEY:
        required: true

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    outputs:
      image: ${{ steps.set-image-name.outputs.image }}
      image_tag: ${{ steps.set-image-tag.outputs.image_tag }}

    steps:
      ...

      - name: Set image tag in output
        id: "set-image-tag"
        run: |-
# Defines the 'image_tag' output variable

          echo "image_tag=$(
          if ([ "${{ github.ref_name }}" == "main" ] || [ "${{ github.ref_name }}" == "master" ]) && [ "${{ github.event_name }}" == "push" ]; then
            echo DEV-"${{ github.sha }}"
          elif [ "${{ github.event_name }}" == "release" ] && [ "${{ github.event.action }}" == "released" ]; then
            echo PROD-"${{ github.ref_name }}"
          elif [ "${{ github.event_name }}" == "pull_request" ] && ([ "${{ github.event.action }}" == "opened" ] || [ "${{ github.event.action }}" == "synchronize" ] || [ "${{ github.event.action }}" == "closed" ]); then
            echo PREVIEW-"${{ github.head_ref }}"
          else
            echo unknown
          fi
          )" >> $GITHUB_OUTPUT

      ...

      - name: Set image name in output
        id: set-image-name
        env:
          IMAGE: "${{ steps.login-ecr.outputs.registry }}/${{ inputs.ECR_REPOSITORY }}"
        run: |
# Defines the 'image' output variable
          echo "image=$IMAGE" >> $GITHUB_OUTPUT
```