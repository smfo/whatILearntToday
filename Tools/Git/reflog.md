# Reflog

Th ereflog does not treverse the commits of a branch like logging commands does.\
The reflog is an ordered list of the commits that HEAD has pointed to, regarding of branch or if the commit still exsts on a branch.

The reflog makes sure you never really lose any information in git.\
Even if you revert one or multiple commits, or delete a branch, you can still reset to a previous state of the branch.

## vs log

The log only shows a list of commits, while the reflog shows the history of changes done in git. This includes reverts, deletions, checkouts of other branches etc.

## Use git reflog

`git reflog`

### Restore commit

Say you have reset your branch one commit too far.\
How do you restore the lost commit from your branch?

Use `git reflog` and find the sha of the commit you want to keep. Rebase the branch to this.

The same goes for if you have deleted a branch by accident.\
Find the sha for the commit at the tip of your branch and check it out.

`git checkout -b new-branch-name sha`

