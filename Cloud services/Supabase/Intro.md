
## Setup (Flutter)
[Documentation](https://supabase.com/docs/reference/dart/installing)

Install the package 

```
flutter pub add supabase_flutter
```

Initialize in application
```dart
Future<void> main() async {
  await Supabase.initialize(
    url: 'SUPABASE_URL',
    anonKey: 'public-anon-key',
  );

  runApp(MyApp());
}

// Get a reference your Supabase client 
final supabase = Supabase.instance.client;
```

Get details from the consol (settings -> api)