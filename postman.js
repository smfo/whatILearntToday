
// Postman basics

// What is Postman?
// Postman is a API development platform that can be used to test API endpoints and create APIs
// It can be used by teams, for collaboration or by individual users (my workspace/team workspace)


// Collections: 
// a collection is esentially a project. it is a folder where you can save requests for later use and as
// use for documentation. the requests can be saved with an appropriate name and a description


// Tabs in the postman workspace:
// Parameters: use to add parameters to the url. hardcode or use env variables
// Tests: send tests with the request. after submitting there is a new tab "test results" that shows the
// result of all the tests submitted with the request. there are some pre defined tests available
// Pre-request script: execute script before sending request (generate variables etc)
// Authorization: add api authorization if needed
// Body: used to customize request, used in post, put, patch


// Environment variables:
// create multiple environments to easily access and change parameter values in a project. the chosen environment is
// displayed in the top right corner.
// current values are private to the user, while initial values are shared with the team
// use the variables by typing {{variableName}}, in the url, authentication tab or any other tabs I guess


// Code generation:
// generates the request in any chosen language
// click 'code' in the request, just under "save"
// for angular: can use "javascript - fetch" with modifications


Collaboration:
Invite other users to a workspace. Add collections directly there or add already generates collections 
to a collaboration project

// Runner:
// Run all requests and tests in a collection
// chose which environment to use and how many iterations to do


Resources
bootcamp in postman
postman.com/support
explore.postman.com (api collection), creates a collection with all the enpoints

Q&A