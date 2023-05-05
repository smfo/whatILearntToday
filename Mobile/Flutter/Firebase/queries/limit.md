# Limit

Limit is firebase/darts version of Take

```dart
var session = await workoutCollection
      .doc(workoutId)
      .collection(sessionTableName)
      .where(dayReference, isEqualTo: dayId)
      .orderBy("session_id", descending: true)
      .limit(1).get();
```