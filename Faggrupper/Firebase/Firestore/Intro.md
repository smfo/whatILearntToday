# Firestore

Firestore is a scalable NoSQL cloud database that stores and sync data for client- and server-side development.

The db keeps the data in sync across client apps, using realtime listeners. Ading listeners notify you with a data snapshot whenever the data you listen to changes, retriving only the new changes.

It is recommended to create security rules to protect your data.

## Creating db

Navigate to cloud Firestore in the Firebase console and create a database.


### Starting mode for security rules

**Test mode**: Good for getting started, will allow **anyone** to read and overwrite your data. Make sure to change these settings after finishing testing!\
Use when: getting started with web/mobile applications.

**Locked mode**: Denies all reads and writes from mobile and web clients. Your authenticated application servers can still access the db.\
Use when: getting started wih backend server client library.

## Project setup

Import firestore and create a firestore instance.

```js
import { getFirestore } from "firebase/firestore";

const db = getFirestore();
```
