# Join

We have three tables `workout`, `workout_period` and `workout_day` where the two last both have a FK `workout_id`.\
We can join without specifying a column because these relations are specified in the db.

When joining the tables

```dart
final future = supabase
      .from('workout')
      .select('*,  workout_days(*)');

// select fields
final future = supabase
      .from('workout')
      .select('*,  workout_days(name)');

// inner join
final future = supabase
      .from('workout')
      .select('*,  workout_days!inner(*)');

// multiple tables
final future = supabase
      .from('workout')
      .select('*,  workout_days!inner(*), workout_days!inner(*)');

// using aliases
final future = supabase
      .from('workout')
      .select('*,  days:workout_days(name), period:workout_period!inner(status)');
```