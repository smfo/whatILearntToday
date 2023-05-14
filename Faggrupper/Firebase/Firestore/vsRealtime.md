# Firestore vs realtime database

Firestore is generally more advanced. It allows for more complex datastructures and queries.

* Data structure: Realtime consists of one giant json tree, whereas Firestore contains documents and subcollections

* Deep queries: in Firestore there are no deep queries, they are all shallow. If you want to get subcollections these have to be collected seperatly. In Realtime deep queries are default. There is however an advanced feature `shallow` that allows shallow requests

* It is easier to set up fetch, as supposed to a stream, in Firestore

* Firestore scale better
