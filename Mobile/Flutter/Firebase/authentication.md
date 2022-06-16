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

## Add SHA fingerprint (Google sign-in)
Needed to make Google sign in work.

Run this from the terminal (remove username if ran from the username folder)
```
// The password is android
keytool -list -v -alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore
```

This will print a lot of information.

In the firabase console navigate to `Project settings -> General -> My apps` and select the android app. Add SHA-1 and SHA-256.\
If you get problems in production, check that you have done this.