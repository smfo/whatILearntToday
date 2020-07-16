

## .NET Core, .NET Framework, .NET Standard
Framework: older version, only runs on windows. Use if Framework is already used in the project, if NuGet packages are not available in .NET Core or technologies that are not yet available in .NET Core are being used.

Core: crossplatform, runs on mac, windows, linux. not everything needs to be installed on the target computer. Supports cloud services and micro services

Base class library: built in types. Array, string manipulation etc. Moving code between different BCL is a problem, as it changes what the app models build on
.NET Standard: is the common BCL for all .NET implementations (Core, Framework, Xamarin and any future implementations). THe code can run on all platforms using the same version of the standard library.

### Class library (.NET standard)
"A project for creating a class library that targets .NET standard"

### Console app (.NET Core)
"A project for creating a command-line application that can run on .NET Core on Windows, Linux and MacOS".
Contains a program file that can be run by VS. Executable project


## ASP (Active server pages)
An open source web framework for building dynamic and interactive web apps and services with .NET. Extends 
.NET with tools and libraries specifically for building web apps.

### ASP.net web application (.NET Framework)
"Project templates for creating ASP.NET applications. You can create ASP.NET Web forms, mvc, or web api applications and add many other features in ASP.NET"
Windows only version, belongs to .NET Framework.
Large set of capabilities, among them ASP.NET Form

### ASP.net core web application
"Project templates for creating ASP.NET Core web apps and web APIs for Windows, Linux and macOS using .NET Core or .NET Framework. Create web apps with Razor Pages, MVC or Single Page Apps using Angular, React or React + Redux"
Belongs to .NET Core
Cross-platform, self-contained, high-performance. A younger framework than ASP.net, might lack capabilities that this framework supports.

## Blazor
"Project templates for creating Blazor apps that run on the server in an ASP.NET Core app or in the browser on WebAssembly. These templates can be used to build web apps with rich dynamic user interfaces"