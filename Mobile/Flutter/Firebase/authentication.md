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

The `FirebaseAuth.instance` object is available in any widgets in the application and can be used for a number of things. List set up a streambuilder to listen to `.userChanges()`, access `.currentUser` and many other things.

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

## Google sign in

Install `flutter pub add google_sign_in` and enable google signin in the firebase console.

```dart
<!-- Example of a google signin service -->

  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  Future<String?> signInwithGoogle() async {
    try {
      final GoogleSignInAccount? googleSignInAccount =
          await _googleSignIn.signIn();
      final GoogleSignInAuthentication googleSignInAuthentication =
          await googleSignInAccount!.authentication;
      final AuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleSignInAuthentication.accessToken,
        idToken: googleSignInAuthentication.idToken,
      );
      await _auth.signInWithCredential(credential);
    } on FirebaseAuthException catch (e) {
      print(e.message);
      throw e;
    }
  }

  Future<void> signOutFromGoogle() async{
    await _googleSignIn.signOut();
    await _auth.signOut();
  }
```

First we call `GoogleSignin().signIn()`, this will start the signin method where a dialog displays and you can choose your google account. The `GoogleSignInAuthentication` will give us access to the google authentication values after signing in. We use these credentials to sign in to Firebase.

On logout, we need to log out of both firebase and google.