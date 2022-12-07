
# Postman basics

## What is Postman?
Postman is a API development platform that can be used to test API endpoints and create APIs.\
It can be used by teams, for collaboration or by individual users (my workspace/team workspace)

## Collections: 
A collection is essentially a project. It is a folder where you can save requests for later use and as
use for documentation. The requests can be saved with an appropriate name and a description.

### Examples
An example consists of a request (method, url, parameters, headers, body) and it's response (stats code, body, headers). You create them by adding them to a request in a collection.\
The documentation automatically includes any example added to a collection in its documentation.

## Collaboration:
Invite other users to a workspace. Add collections directly there or add already generates collections 
to a collaboration project.

## Environment
Set an environment, for example `test` in the top right corner. This will dictate which variables will be used in your requests. [See here](variables.md)

## Tabs in the postman request workspace:
**Parameters**: use to add parameters to the url. hardcode or use env variables\
**Tests**: send tests with the request. After submitting there is a new tab "test results" that shows the
result of all the tests submitted with the request. There are some pre defined tests available\
**Pre-request script**: execute script before sending request (generate variables etc)\
**Authorization**: add api authorization if needed\
**Body**: used to customize request, used in post, put, patch

### Sidemenu

From the sidemenu on the right you can access the request **documentation, comments** and **code**

## Runner:
Click on the collection and select "run collection".

From here you can run all requests and tests in a collection, or a subset of them, and decide how many times to run them.

## Code generation:
Generates the request in any chosen language\
Click 'code' in the request, just under "save"\
for angular: can use "javascript - fetch" with modifications

Resources
bootcamp in postman
postman.com/support
explore.postman.com (collection of available apis), creates a collection with all the enpoints in your postman