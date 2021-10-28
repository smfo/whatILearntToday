# Revert file to previous state

When you want to revert one or multiple files to the state of a previous commit.


```
git checkout commitHash -- filename file2name
```

Example
```
git checkout 9bd3e40ed10ac3cfc0d28d936903ead3ce394bd5 -- ./src/UDIR.Prover.Runtime/NinjectModules/DataModule.cs
```