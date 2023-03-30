# Firestore

Make sure you have added `cloud_firestore: ^x.x.x` to your pubspec.yaml dependencies.\
`flutter pub add cloud_firestore`

## Getting data

Access the data by creating a reference to the collection or document you want to query. There are multiple ways of doing this.

```dart
// Collection reference
final CollectionReference booksCollection = FirebaseFirestore.instance.collection('books');

// Document reference
final DocumentReference bookDocument = FirebaseFirestore.instance.collection('books').doc('8EStAHNexvkeDCOknLjk');

// Start from Firestore reference
final FirebaseFirestore firestore = FirebaseFirestore.instance;

// Access document data from collection
var books = await firestore.collection('books').get().then((event) {
    List<Books> books = [];

    for (var book in event.docs) {
        print("${book.id} -> ${book.data()}");
        books.add(Book.fromSnapshot(book));
      }
    return books;
});

// Access document data for one document directly
firestore.doc('books/8EStAHNexvkeDCOknLjk').get().then((value) {
      print(value.data());
    });
```

### Snapshot

Setting up a snapshot stream. This listens to the changes in the database and updates whenever anything is changed.

```dart
  final CollectionReference booksCollection = FirebaseFirestore.instance.collection('books');

  Stream<QuerySnapshot> get bookStream{
    return booksCollection.snapshots();
  }
```

## Update

```dart
void updateBook(Book book) async {
    await booksCollection.doc(book.id).update(book.toJson());
  }
```

## Add

```dart
final CollectionReference booksCollection = FirebaseFirestore.instance.collection('books');

Future<DocumentReference> addBook(Book book){
    return booksCollection.add(book.toJson());
  }
```

## Delete

```dart
  void deleteBook(Book book) async {
    await booksCollection.doc(book.id).delete();
  }
```