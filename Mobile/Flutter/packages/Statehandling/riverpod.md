# Riverpod

There are three packages you can install
* Flutter_riverpod: for flutter and dart
* Riverpod: for dart
* Hooks_riverpod: can be used with flutter hooks
Install the version that gives you the least amount of overhead

Riverpod is a state management package, inspired by Provider. The difference is that it gice many more opportunities. Examples:
* Multiple providers of the same type
* The option to user Provider without having a context (widgets only)

## General

final providerName = Provider<String>((ref) => {}));

ref.read()
ref.watch()
ref.read(providerName.notifier)

## Setup

## Consume provider

## Other functions
.family
autodispose (future and stream)

## Provider types

### Provider

Access stuff that don't change, objects, clients, helper functions etc.

### StateProvider

Store simple state objects that can change over time, enum, string, boolean and number.\
NotifierProvider is similar and more flexible.

### StateNotifierProvider

Like StateProvider, but can be used for more complex objects. Good for states that may change because of user interaction.

Overkill if all you need to do is read

Can use AsyncNotifier instead

### FutureProvider

Provide a Future, result from an API etc.

Async value (data, error, loading)

### StreamProvider

Provides a Stream

###