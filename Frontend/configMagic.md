# Frontend - config magic

## package.json - Scripts

**Run parallell**\
When using this command you can make other commands run in parallell. This is usefull to start a client and a server only using one command.

```JS
"start": "run-p start:dev start:api",
"start:dev": "webpack-dev-server --config webpack.config.dev.js --port 3000",
"start:api": "node tools/apiServer.js",
```

**pre~**\
If a command is run and there is another command in the file with the same name, only adding the prefix pre, this will be run before the called command.

In the example, when running start:api, prestart:api will always run first.

```JS
"prestart:api": "node tools/createMockDb.js",
"start:api": "node tools/apiServer.js",
```

**--watch**\
For testing, will run tests every time the project is saved.

Jest: --watch is only supported in git, if the project is not in git use watchAll.

```JS
"test": "jest --watchAll"
```
