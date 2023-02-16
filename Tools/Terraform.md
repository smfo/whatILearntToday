# Terraform

Terraform is an open source software used to write instrastructure as code and lets you manage, update and provision series of instfrastructure. It supports multipel cloud integrations which are specified in the main file of the project.

The history is retained through terraform stat management, and it has workspaces, which makes it easier to manage multiple environments

**Cons:** pushes to live environment. If multiple people is working on the infrastructure of the same environment you have to be carefull not to override other peoples changes.

## Commands

* terraform init - initiates a terraform session
* terraform plan - shows the diff between your local changes and current infrastructure of the environment you have connected to
* terraform validate - validates that the files in the local directory have correct syntax
* terraform apply - applies the changes to the chosen environment