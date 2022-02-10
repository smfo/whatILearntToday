# Shortcuts


## Built in

Good to know git commands [here](./goodToKnow.md)

## How to set custom git aliases

The simplest version is to create a shorthand for a whole or parts of a git command.

```
st = status
m = master
pf = push --force-with-lease
```

User on computer -> .gitconfig -> open in notebook\
Save

```
[alias]
lg1 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold green)(%ar)%C(reset) %C(white)%s%C(reset) %C(dim white)- %an%C(reset)%C(bold yellow)%d%C(reset)' --all
lg2 = log --graph --abbrev-commit --decorate --format=format:'%C(bold blue)%h%C(reset) - %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n''          %C(white)%s%C(reset) %C(dim white)- %an%C(reset)' --all
br = branch --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(contents:subject) %(color:green)(%(committerdate:relative)) [%(authorname)]' --sort=-committerdate
sp = "!git stash apply $1"
app = "!git stash apply 0 && git stash apply 1"
ra = restore .

lg = !"git lg2"
st = status
co = checkout
cob = checkout -b
```

lg1: id - since - commit message - author (- branch if head is here)\
lg2: id - date - since - commit message - author (- branch if head is here)
br: list all branche with latest commit message, author and since

## Espace to a shell

Using `!` lets you espace to a shell instead of just writing plain text.

This lets you use parameters, execute multiple git commands with a single alias and more.

### Use variables

* $1 - the first parameter passed to the command
* $2 - the second param passed to the command, and so on..
* $@ - all command like parameters passed

### Combine multiple commands
```
app = "!git stash apply 0 && git stash apply 1"

// Git command
git app
```