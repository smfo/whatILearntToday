# Emulator android studio

- Install Android Studio
- Complet installation with Android virtual device
- Open Tools -> Avd manager/Device manager and create a device

## Setup in VSCode

Add environmental variable:
- new variable: ANDROID_HOME, SDK location

Cannot find sdk location in programs? Try `windows + R, C:\Users\%USERNAME%\AppData\Local\Android`

Add to path:
- %ANDROID_HOME%\tools
- %ANDROID_HOME%\platform-tools

The created devices should now be available to chose with the [other emulators](.\VSCode.md) in the bottom right corner of VSCode.