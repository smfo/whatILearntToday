# Authentication

Firebase procides backend services, SKDs and ready-made UD libraries for authenticating your apps. We can use anonumous login, username and password, facebook, google and more.\
By default all authentication isdisabled in the console. To be able to use them in the app we have to enable the authentication we want.

Use the Firebase UI for a complete auth solution or the SDK for a manual integration.

## FirebaseUI

<!-- Fill in when I do this in an app -->
https://firebase.google.com/docs/auth/android/firebaseui

## SDK, how does it work

* Get the credentials from the user (username/password/token from a provider)
* Pass these to the Firebase Authentication SDK. The Firebase backend will verify the credentials
* On success a response with the user profile information will be returned

## Current user

When signing in, the user becomes the current user of the Auth instance in the application. The user's state is persisted, so refreshing or restarting the application won't lose the information.\
When signing out we stop keeping track and there is no current user.

The id that represents the user is the uid field on the auth object.