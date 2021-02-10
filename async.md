
# Asynch

## What is it?
Asynchronous code refers to code that does not execute at the same time. Most programming languages are by default synchronous and will continue executing other tasks if a previous task takes time to e.g. recive a http return value. While in a asynchronous code, the program will wait for the http value to return.

# Frontend

## Callback
A function that is called back after an async operation is complete.

Can be difficult to manage when working with nested operations.

## Promises
An object that may produce a single value sometime in the future.

Can only handle a single emittion and cannot be canceled.

## Async/await
Syntax that allows for writing async code that looks like its sync.

Can only handle a single emittion and cannot be canceled.

## RxJS - Reactive extensions for javescript.
A library that composes async and event-based programs by using observable sequences.

Built in error handeling, can be canceled.