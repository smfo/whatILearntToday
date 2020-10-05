
# My Games

An overview of games I have played, want to play and my favorits. Add new games, change their status and compare your
games to another user.

## Technology
EF Core & Linq, ASP.NET Core api, React, Postman documentation, NUnit tests

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

MyGames.Test - NUnit test\
Mainly tests for the ASP.NET service

### Frontend - React
Create-react project using function components.

Http requests, testing?, forms
Axios - http client

## Problems

**React - render order**
Wanted to get data from the api to show in the rendered component. There were two parts to the problem.
First that the data was not in place when the component was rendered, causing an error because the variable
holding that data were empty. Second, after retriving the data from the api, the component were not rerendered.

Problem 1 were solved by a "If variable is empty, do not render this part" in the JSX. Allowing for the
running of the rest of the program until there were values to collect.

Initially I wanted the JSX to be saved in a const and the api call to happen in a const function. That did not work
because the JSX tried to construct before the API call was returned. Also, the const function were not re called
because there were no factors to trigger it.
```C#
const setValue = async () => {
        GetAllUserNames().then(data => {
            setUserNames(data);
        });
    }
```
The solution was to use a useEffect instead, this would however, also trigger after the rendering of the component.
To force a rerender the state of a variable had to be changed. So I did that in the useEffect and constructed the
JSX in the return statement instead of a variable.

```C#
    React.useEffect(() => {
        GetAllUserNames().then(data => {
            setUserNames(data); // change state after api data retrived
        });
    }, [])

const getNewUser = async (name) => {
        await changeUserName(name);
        getUser();
    }

     return (
        <div>
            {userNames !== [] ? // do not try to render before value is retrived
                <select onChange={(e) => getNewUser(e.target.value)}>
                    {userNames.map(name => {
                        return <option key={name} value={name}>{name}</option>
                    })}
                </select> : null
            }
        </div>
    )
```

**React - useEffect async**
At first I used a async function in useEffect, it turned out not to be nessecary in the end (see previous problem),
but might be more readable.\
To use it there needs to be a async function added to the effect, the effect itself cannot be async, and 
that function needs to be called from useEffect.

```C#
React.useEffect(() => {
    async function getValues(){
        var names = await GetAllUserNames();
        setUserNames(names);
    }

    getValues();
    }, [])


    // used version
    React.useEffect(() => {
        GetAllUserNames().then(data => {
            setUserNames(data); // change state after api data retrived
        });
    }, [])
```

**EF Core - getting related data**
Figured out that starting EF Core 3 it was nessecary to add Newton soft json in order to use
ThenInclude. This is done in the setup, either to AddControllers or AddMvc. See ASP.NET for more details.

```C#
services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
```