# Authentication

Instead of using `firebase/auth` and the getAuth... functions, we import `import 'package:firebase_auth/firebase_auth.dart'` to our file and use the `FirebaseAuth` object.

```dart
import 'package:firebase_auth/firebase_auth.dart';

final FirebaseAuth _auth = FirebaseAuth.instance;

  Future signInAnon() async {
    try {
      UserCredential result = await _auth.signInAnonymously();
      User? user = result.user;
      print(user);
      return user;
    } catch(e) {
      print(e.toString());
    }
  }
```