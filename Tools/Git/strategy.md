# Git strategy - Miros (git team strategy)

- master/main: production, only changes on deploy, need admin rights to push here
- next: next sprint tasks, ready to deploy, ready for approval from product owner, pull requests from feature branches, no fails here
- dev feature branch: a "free for all" branch where stuff can fail, used by developers to check if features work with eachother (same as test when test is used badly)
- feature branches: branch out from master, do not delete, merge to master on deploy

Gives all changes between master and next branch\
`git master ... next`

Always branch out from `master`\
`Feature` are the only once that should be merged into other branches (dev, next, master)

## New deployment

Rebase `next` on the latest commit to `master`.

## New feature/bugfix

Branch out from last commit in `master`, do whatever to finish. Create pullrequest to `next`.

If necessary, use `dev` to test with other features.

If bugs are found, or a feature needs to be changed after pushed to `next`, they will continue development on its `feature`.

## Ready to deploy

From `next` chose which features should go to deploy. Do not push these features from `next`, they should come from `feature`.

### Deploy branch

An option to merging all chosen features to `master` on deploy is to create a branch purly for this intent.

Branch out from latest commit in `master`, merge features to go in deploy to the new branch. Solve merge conflicts and fix bugs here. Push this branch to `master`. master will now only have one deploy commit.

## Naming conventions

feature/

bug/

chorus/ (Things that are not a feature or a bug but must be done)
