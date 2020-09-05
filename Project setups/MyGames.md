
# My Games

An overview of games I have played, want to play and my favorits. Add new games, change their status and compare your
games to another user.

## Technology
EF Core & Linq, ASP.NET Core api, React, Postman documentation, testing(in what)

### Backend - C#, EF Core, Linq

**Projects**
MyGames.API - ASP.NET Core web application (Http)\
The http API communicating with frontend. References MyGames.Data
and MyGames.Domain. Contains the controllers and services

MyGames - Console app\
Runs the application from console, is used before implementing frontend and the API
to do some simple testing of the functionality. Not used in the final project.
References MyGames.Data and MyGames.Domain.

MyGames.Data - C# library\
Contains the EfCore connection, DbContext, models, DbSets and migrations.
References MyGames.Domain 

MyGames.Domain - C# library\
Contains the application models and interfaces

MyGames.Test - NUnit test

### Frontend - React