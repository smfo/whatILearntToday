# Filter


`.eq(COLUMN_NAME, COLUMN_VALUE)`
## Joined tables

When you want to filter on the value of a joined table:

`TABLE_NAME/QUERY_ALIAS.COLUMN_NAME`

```dart
final future = supabase
      .from('workout')
      .select('*,  days:workout_days(name), period:workout_period!inner(status)').eq('period.status', 'Active');
```

Create a view in supabase and collect this

https://stackoverflow.com/questions/69137919/filtering-in-join-in-supabase