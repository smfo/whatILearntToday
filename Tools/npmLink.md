# npm Link

Used to visualise package changes in local projects without having to push the package and update the it in the main project.

In the package:

- `npm run build`\
  In dist folder
- `npm link`\
  This create a symlink for the dependency, and is a shortcut that points to another directory or file on the computer.

In the project that uses the dependency

`npm link dependencyName (the name defined in f.ex. package.json)`

Example of name
```
"name": "pas-komponentbibliotek"
```

NB: in order for the dependency changes to work in the main project, you need to run `npm run build` in the dependency project.

Updates should happen automatically. This can be checked in the mode_modules folder.\
Some compilers, like VS Code, has an icon displaying that npm link is active.

## Reset

To reset back to normal we need to delete the symlink. This is done using `npm unlink dependencyName`. However, this also deletes the dependencies in the project and removes the unliked dependency from the package.json. Therefore we need to run this

```
npm unlink dependencyName
- Add dependency to package.json
npm install
```
