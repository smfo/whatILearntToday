
# Git cherry-pick
This is used to pull some, but not all, commits from another branch into your own branch.

To do this you only need the id of the commits you want in your branch.

This will create a new, identical commit on your branch and commit it.
```js
git cherry-pick id
```
If you do not want to commit straight away use this command. The selected commits will then be added to the staged changes.
```js
//-n stands for "no commit"
git cherry-pick id -n
```

Include multiple commits like this.
```js
git cherry-pick id1 id2
```

## Interval cherry-picking
This will cherry-pick an interval of commits including both commit 1 and 2.
```js
git cherry-pick id1^..id2
```

To ignore the first commit in the interval, use this.
```js
git cherry-pick id1..id2
```