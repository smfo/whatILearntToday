# Dockerfile

The file sets up the instructions for building your source code\
For example run on `Build and push docker image` from github actions\
By default the code looks for a file named `Dockerfile`, with no file extension.

Commands
- `FROM <image>` a base for the image
- `RUN <command>`
- `WORKDIR <directory>` sets the working directory for any other command, until a new workdir is specified
- `COPY <src> <dest>` copies files or directories from <scr> and adds them to the filesystem of the container at the <dest> path
- `CMD <command>` define the default program that is run once the container is started. Each Dockerfile only has one CND, if more exist the last will be the one executed

```docker
FROM node:17.3.0 AS node_build

WORKDIR /app
COPY . .

WORKDIR /app/Frontend
RUN npm ci
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet_build

# Copy everything, don't always need all files. Copying only the relevant folders is good too if they are not needed by Docker. Like testprojects
WORKDIR /app
COPY . .

WORKDIR /app/Arrangement-Svc-C
RUN dotnet publish -c release -o out

# RUN
FROM bekkforvaltning/aspnet-datadog-instrumented:6.0
WORKDIR /app/
COPY --from=dotnet_build /app/Arrangement-Svc-C/out .
COPY --from=node_build /app/Frontend/dist/. wwwroot/.

CMD dotnet Arrangement-Svc-C.dll
```

Restore is run as a part of the publish commant, however because of caching publish does not always need to be run. Therefor it can be beneficial to have this in a separate step

```docker
COPY Arrangement-Svc-C/*.csproj ./
RUN dotnet restore
```

Build the app in realse mode, instead of debug which is default and create the assets in the "published" folder.

```docker
RUN dotnet publish -c Release -o published
```

```docker
# Runs the application
CMD dotnet published\aspnetapp.dll
```

## Multiple applications in solution

Copy the project file for the entrypoint application. This should also take care off all dependencies. Therefor, all other relevant applications in the solution should be included from this command, there is no need to include their own project file separatly.\
Include the files of all the relevant code and build only the entrypoint application.\
Run the relevant .dll.

```Docker
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet_build
WORKDIR /app

# Copy project file and restore as distinct layers
COPY Arrangement-Svc-C/*.csproj ./
RUN dotnet restore

# Copy all relevant project files and build
COPY ./Arrangement-Svc-C ./Arrangement-Svc-C
COPY ./Arrangement-Svc ./Arrangement-Svc
COPY ./migration ./migration
WORKDIR /app/Arrangement-Svc-C
RUN dotnet publish -c Release -o out

# RUN
FROM bekkforvaltning/aspnet-datadog-instrumented:6.0
WORKDIR /app/
COPY --from=dotnet_build /app/Arrangement-Svc-C/out .
COPY --from=dotnet_build /app/Arrangement-Svc/wwwroot wwwroot/.
COPY --from=node_build /app/Frontend/dist/. wwwroot/.

CMD dotnet ArrangementSvcC.dll
```