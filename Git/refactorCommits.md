
# Refactor commits

## Git amend
A commit can be amended, become a part of the previous commit.

Adds staged changes to the content for the previous commit. Behind the scenes this creates a new commit that replaces the old commit as well as the current staged changes, to git it will look like a brand new commit and the previous one will no longer be on the branch.

The metadata for these two commits will be different
```JS
//if a new commit message is desirable
git commit --amend -m ""        

//amend to commit without changing the commit message
git commit --amend --no-edit    
```

If the previous commit is not yet pushed don't worry about it. If the previous commit is changed the new commit needs to be forced pushed (see later paragraph).

NB! Do not amend to public commits! This is because other developers 
might have based their work on the previous commit that will no longer 
be on the current branch

NB!! changes must be tracked --> new files must be added before using
commit amend

## Git rebase -i
This is used when we need to change a specific commit earlier in the history. To do this we need the commits SHA1, the id I guess, this can be found in tortoise or by typing `git log`.

Start from the correct commit: get the SHA1 from the commit previous to the one you want to change. This will start the rebase from this commit in the history and all later commits can be modified.

```JS
git rebase -i sha1ForCommitt
```

Use the hat to include the chosen commit as well.
```JS
git rebase -i sha1ForCommitt^
```

This will take you to the dreaded git bash editor. Here you will get a list of all the commits that will be added to your selected rebase commit when you execute the command. Commits that are lower in the list can be amended to earlier commits (the history is reversed and the top commit will be added first). Select what to do to each commit by changing `pick` to another keyword or rearange the order. Then save and exit.

`Fixup` will amend to the previous commit without this commits message.\
`Squash` will amend to the previous commit with both commit messages.\
`Edit` will stop the rebase when at this commit. You will be able to do whatever changes you want, these needs to be commited, then open git bash again and type `git rebase --continue`.\
Deleting a line will drop the commit.
```js
//commit 3
pick 4155df1cdc7 Page Navigation View
pick c22a3fa0c5c Render navigation partial
//commit 1
pick aa0a35a867e Add styles for navigation

# Rebase 8d74af10294..aa0a35a867e onto 8d74af10294 (3 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commits log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

This leads to a situation where your local branch is separate from the origin branch. Because you have changed commits that are already in the origin they cannot just be pushed in a normal way. They must be forced.

### Git push --force
`force` overwrites a remote branch with your local branch.\
However, if  multiple people are working on the same branch at the same time and they have pushed commits you do not have locally, these will be lost.

Therefore we have `--force-with-lease`, a safer option that will not overwrite any work on the remote branch if more commits were added to the remote branch (by another team-member or coworker). It ensures you do not overwrite someone else's work by force pushing. Therefore this should be the default way to use force in git!

```js
git push --force-with-lease --set-upstream origin <origin branch name>

// e.g.
git push --force-with-lease --set-upstream origin feature/data-export-download-1764
```

### How to force push in tortoise git