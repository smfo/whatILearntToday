# Split already commited comitt

## Last commit
```js
git reset HEAD~
```

This will reset the HEAD of the current branch one commit, and the changes in the last commit will be moved to `staged`. From here commit files separately at will in as many parts as desired.

## Older commit
This requires rebasing, rewriting history.

First find the right commit
```js
// rebase three commits back
git reset -i HEAD~3

// rebase using SHA1
git reset -i SHA1~
```

This will open the rebase screen. Find the commit you want to split and change `pick` to `edit`. The commit we want to split will now be the last commit in the history. So same as before

```js
git reset HEAD~
```

Make the changes, and as many commits you want. Continue the rebase with `git rebase --continue`. See [refactor commits](refactorCommits.md) for more about rebasing.