# Services

In many ways similar to a component, but needs a `Injectable` decorator (changed in later versions) if it will use other services and needs to be provided either to the component itself or the module holding the component. This will create a singleton of the service.

If the service is provided in multiple modules, multiple service instances will be created.

## Ways to provide a service

```ts
//Constructor injection
private _dataService: DataService();

constructor(dataService: DateService){
    this._dataService = dataService
}

//shorthand version
constructor(private dataService: DataService)

//app module or other module
@NgModule({
  providers: [DataService]
});
```

Starting at angular 6, it is prefered to instead provide the service to the root using `providedIn`. This will provide the service in the application root, app.modules.

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
}
```

## Tokens

Tells angular which recipe to create an instance of whenever seeing the token used in the app.

The example above is just the shorthand version of the token and recipe has the same name.

```js
//app module or other module
//{provide: token, useClass: Recipes}
@NgModule({
  providers: [{ provide: DataServiceToken, useClass: DataService}]
});
```

## Injection token
Use an InjectionToken whenever the type you are injecting is not reified (does not have a runtime representation) such as when injecting an interface, callable type, array or parameterized type.

InjectionToken is parameterized on T which is the type of object which will be returned by the Injector. This provides additional level of type safety.

```js
//Interface declaration
export let IDatePickerServiceToken = new InjectionToken<string>('IDatePickerService');

export interface IDatePickerService {

//Module provider
{ provide: IDatePickerServiceToken, useClass: DatePickerService }

//Dependency injection
 constructor(@Inject(IDatePickerServiceToken) private datePickerService: DatePickerService)
```