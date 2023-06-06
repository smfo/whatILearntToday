# .NET Core application Types

There are two types of .NET Core application types

* Portable Application
* Self-container application

Why do we care: these projects cannot reference one another.

## Portable application

These are applications that expect .NET Core runtime on the deployment machines. They therefore cannot be ran on machines without .NET Core runtime installed.

## Self-contained application

These are applications which include .NET Core runtime when they are published. They can therefore run on machines without .NET Core runtime installed.