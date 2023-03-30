# Order by

* An orderBy() clause also filters for existence of the given fields. The result set will not include documents that do not contain the given fields

* You cannot order your query by any field included in an equality (=) or in clause

* If you include a filter with a range comparison (<, <=, >, >=, isGreaterThan etc..), your first ordering must be on the same field. See example for valid ordering clauses:

```dart
final citiesRef = db.collection("cities");
citiesRef.where("population", isGreaterThan: 100000)
    .orderBy("population")
    .orderBy("city");
```


By default `orderBy` is ascending.

```dart
Firestore.instance
        .collection('collection_name')
        .orderBy('field_name', descending: true)
        .orderBy('field_name')
```