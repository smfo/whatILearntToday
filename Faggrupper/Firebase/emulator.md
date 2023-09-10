# Firebase emulator

The emulator is a way to use all of firebases services locally, without connecting to your real project. This way, you don't use resources from your project and you don't polute the data.\
The emulator has Firestore, realtime database, authentication, storage and more.

[For connecting to Flutter see here](../../Mobile/Flutter/Firebase/emulator.md)

## Emulator setup

```
firebase init emulators
// Follow the instructions, select the project and resources you wish
```

### Run emulators

To run all resources\
`firebase emulators:start`

To run selected resources\
`firebase emulators:start --only <resourses>`

### Remove resources

Remove resource from the firebase.json file and node_modules if you have one.

## Firestore

Using the emulator for Firestore is also great because it allows you to see all the rewuests against the database.

### Persist data

To persist data use this comand on start. Or a subset of it.

`firebase emulators:start (--only firestore) --import=<export-folder> --export-on-exit=<export-folder>`

To trigger while running run\
`firebase emulators:export/import <folder>`