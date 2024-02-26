# Hive

Hive is a documentbased inmemory database that can be used to cach data in your application. It is crossplatform and can also be used on web. It is written completly in Dart.

Data is stored in key, value pairs. A value can be a simple type, a list, on json format. Objects require some more work.

## Flutter implementation

```dart
// pubspec.yaml

dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0


// main.dart
  void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Hive.initFlutter();

  ...

  runApp(const ProviderScope(child: MyApp()));
}
```

## Boxes

The data in Hive is stored in boxes. They have no structure and can contain anything. Sort of like a folder. boxes can be encrypted.\

In order to access a box it has to be opened. For regular boxes, opening it loads all its data into memory
```dart
// Open box
var box = await Hive.openBox<T>(MyBoxName);

// Get box reference for already opened box
// With this the box can be accessed anywhere in the code
var b = Hive.box(MyBoxName);
```

If you don't need a box again, you should close it. All cached keys and values of the box will be dropped from memory and the box file is closed after all active read and write operations finished.

```dart
await box.close();
```

## CRUD

```dart
// Add key, value pair
b.put("my value here", 888);
b.put("Second value", "string here");
box.put('friends', ['Dave', 'Simon', 'Lisa']);
// Add multiple keyvalue pairs
box.putAll({'key1': 'value1', 42: 'life'});

// Get value
// Returns null is the key doesn't exist
b.get(key);
b.get(key, defaultValue: "Some default value here")

// Update value
b.put("Second value", "Dinner!!");

// Delete keyvalue pair
b.delete(key);
b.deleteAll([list of keys])
```

You will always get the same instance of an object from a specific key!\
Even though put and delete are async calls, you do not need to use await as these changes are applied instantly.

## Triks

**ValueListenable**\
It is possible to update the information in your application based on a value in Hive. Use ValueListenable for this

**Add**\
A Hive box can also be used as a list. In that case you use `Add()` to insert the next element in the box. By doing this you can access an element by using `box.get(index)` or `box.getAt(index)`

**HiveList**\
A type that can be used to bind value in Hive together. For example is a `Person` has a list of other `Person` objects like Family, or a list of `Animals` pets.

## Objects

To store objects you have to register an adapter which converts the object from and to binary form.

Before using an adapter you have to register it. To do this you need an instance of an adapter and a typeId.\
The typeId is used to match the correct adapter with the value that is returned from the disk. The id is unique per type, and is a number between 0 and 233.

Read is run when the object is read from the disk, while write is called when writing the values to the disk.

```dart
import 'package:hive/hive.dart';

class User {
  String name;

  User(this.name);

  @override
  String toString() => name; // Just for print()
}

// Can be generated automatically
class UserAdapter extends TypeAdapter<User> {
  @override
  final typeId = 0;

  @override
  User read(BinaryReader reader) {
    return User(reader.read());
  }

  @override
  void write(BinaryWriter writer, User obj) {
    writer.write(obj.name);
  }
}

void main() async {
  // Register Adapter
  Hive.registerAdapter(UserAdapter()); 

  var box = await Hive.openBox<User>('userBox');

  box.put('david', User('David'));
  box.put('sandy', User('Sandy'));

  print(box.values);
}
```

<details>
  <summary>Generate adapter</summary>
  
NB!! Install `hive_generator` as a dependency!\
It is important that the name of the file, the hive object and the file to be generated match, see below.

Example to generate an adapter:\
`dart run build_runner build`

If this leads to an error, run `flutter clean` then try again.

```dart
import 'package:hive/hive.dart';

// This is the filename of the adapter that will be generated
part 'system_user.g.dart';

// Select a typeId
@HiveType(typeId: 1)
class SystemUser {

  // Select a unique id (in the type) to each field that should be saved. Theses should not be changed once the class is in use
  @HiveField(0)
  String name;

  @HiveField(1, defaultValue: 12)
  int age;

  @HiveField(2)
  List<Person> friends;
}

```

## Editing fields

Before editing fields of an adapter that is being used, keep this in mind:

- Don't change the field numbers for any existing fields.
- If you add new fields, any objects written by the "old" adapter can still be read by the new adapter. These fields are just ignored. Similarly, objects written by your new code can be read by your old code: the new field is ignored when parsing.
- Fields can be renamed and even changed from public to private or vice versa as long as the field number stays the same.
- Fields can be removed, as long as the field number is not used again in your updated class.
- Changing the type of a field is not supported. You should create a new one instead.
- You have to provide defaultValue for new non-nullable fields after enabling null safety.
</details>