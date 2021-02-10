# Rename branch


## Rename local branch.
If you are on the branch you want to rename: ```git branch -m new-name```\
If you are on a different branch:
```git branch -m old-name new-name```

## Delete the old-name remote branch and push the new-name local branch.

```git push origin :old-name new-name```

## Reset the upstream branch for the new-name local branch.
Switch to the branch and then:
```git push origin -u new-name```