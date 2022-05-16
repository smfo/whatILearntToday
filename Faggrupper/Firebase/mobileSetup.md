# Setup Firebase with mobile (Flutter & Android)

* In the console create a android app. Make sure to give it the same id (package name) that you find in `android/app/build.gradle`.\
build.gradle -> android -> default config -> applicationid

* Download the config file and place it in `android/app`. This file will tell the project which Firebase backend to connect to when it is run

* In `android/build.gradle` add the `classpath 'com.google.gms:google-services:n.n.n'` dependency the console gives you

* In `android/app/build.gradle` add `apply plugin: 'com.google.gms.google-services'` and dependency `implementation platform('com.google.firebase:firebase-bom:30.0.1')`

Now check if the project [runs](./../../Mobile/Flutter/VSCode.md#run-emilator)