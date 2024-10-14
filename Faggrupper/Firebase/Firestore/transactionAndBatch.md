# Transactions and batches

Some times you need to save documents with certain conditions

## Transactions

Used when it is important that you have the lates data of the document you want to update. Ex. if multiple queries is writing to the same bank account at the same time.

## Batch

With a batch you  can set, update and delete data. Each qurey is added to that batch, and the batch is then commited. If any queries in the batch fail, they are all rolled back.\
You don't automatically get to know which query failed.

```dart
final FirebaseFirestore firestoreInstance = FirebaseFirestore.instance;
WriteBatch batch = firestoreInstance.batch();

// Batch.set() needs a document reference. Therefore we create that beforehand using .doc(). This will not create the document before it is used in a later setting
DocumentReference docRef = routineCollection.doc();

batch.set(docRef, routine);

DocumentReference docRef = dayCollection(workoutId).doc();

batch.set(docRef, day);

batch.commit()
```