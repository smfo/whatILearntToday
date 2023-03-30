# Indexes in Firestore

Firestore autmatically creates indexes for any field in your documents.

However, if you try to order your documents in a query, another index is required and is not created automatically. Firestores policy is that you need this index, in order to keep the queries fast, and you need to do this yourself.

If you try to run the query locally you will get an error `FAILED_PRECONDITION: The query requires an index. You can create it here: ...`. Click this link to go create the required index. Or do it in the Firebase console.\
The index will take some time to build.