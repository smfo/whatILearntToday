
# Squash

Squash merges multiple commits together with a previous commit.
The new, modified commit will have a different ID from either of
the previous commits

```git merge --squash <branch>```

This command takes all the commits from the commit sequency of the choosen
branch, merges it into the current branch and puts it in the working tree
Adding

```git commit -m```

allows to modify the commit message of the squashed commit

## Git rebase
[Another option](refactorCommits.md) is to use `git rebase -i` and set all but the first commit to fixup.