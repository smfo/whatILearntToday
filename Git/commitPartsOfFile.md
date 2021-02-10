# Commit/add only parts of a changed file

```git add --patch```

Git will split the changes made in all the files into, what git believes, are reasonably sized chunks. For each chunk you will get these options

```
Stage this hunk [y,n,q,a,d,/,j,J,g,s,e,?]?
```

Then commit the chunks that are added.

Here is a description of each option:

y stage this hunk for the next commit\
n do not stage this hunk for the next commit\
q quit; do not stage this hunk or any of the remaining hunks\
a stage this hunk and all later hunks in the file\
d do not stage this hunk or any of the later hunks in the file\
g select a hunk to go to\
/ search for a hunk matching the given regex\
j leave this hunk undecided, see next undecided hunk\
J leave this hunk undecided, see next hunk\
k leave this hunk undecided, see previous undecided hunk\
K leave this hunk undecided, see previous hunk\
s split the current hunk into smaller hunks\
e manually edit the current hunk\
? print hunk help\