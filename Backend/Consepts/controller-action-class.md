# Controller - action - class

This consept builds on that the controller should do as little as possible. The action should be where all dependencies are pulled on, and the class should contain the business logic.

## Controller

The controller should do as little as possible, not call any dependencies or contain any business logic. However it is very welcome to call multiple actions. And create view models, see models and view models.

## Action

This is where the dependencies should be called. That doesn't mean you shouldnt use one action to call other actions, the actions should as far as possible be reusable for multiple controllers. See models and view models.

## Class

The class should contain the business logic for the application and take all the information it needs as parameters. This way it is easy to greate tests for the business logic without mocking anything.

There are two ways to go about this
* The class creates a view model, this will be specific for the controller and the class and action can only be used with this controller
* The class creates a model containing general information. Then the action or the controller will modify the model(s) to fit the required viewmodel the controller outputs

## Models and view models

Models are not as spesific as view models, they should be created in a way that lets you reuse them in multiple places.\
View models are more specific and tend to be specifical tailored to return the information the controller wants to send to the frontend.

In this pattern the action should create models and return these to the controller. The controller can then call other methods, mix and match to create the specific view model it needs.

The reason for this is that the model, and action, can be reused in multiple controllers.