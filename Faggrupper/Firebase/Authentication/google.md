# Google login

For google login to work, you need to register the [SHA](../../mobile/firebase/authentication.md). And download the google_sign_in package, `flutter pub add google_sign_in`.

With this we can access the GoogleSignIn object that allows us to authenticate Google users.

```dart
final googleSignIn = GoogleSignIn();

  Future googleLogin() async {
        // Authenticate the user with google
      final googleUser = await googleSignIn.signIn();
      if(googleUser == null) return;
      
      final googleAuth = await googleUser.authentication;
      
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken
      );
      
      // Use the google credentials to sign in with Firebase
      await FirebaseAuth.instance.signInWithCredential(credential); 
  }

  Future logOut() async {
    // Disconnect with the google sign in session
    await googleSignIn.disconnect();

    // Log out of Firebase
    FirebaseAuth.instance.signOut();
  }
```