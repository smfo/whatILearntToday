# Inject token

Allow injection of values that does not have a runtime representation.

Meaning it allows for injection of an interface that only exists in TypeScript, not js.

```JS
//Declaration of token
import { InjectionToken } from '@angular/core';
export declare let IDisplayServiceToken: InjectionToken<string>;
//Read about declare in exportDeclare

//module
@NgModue({
  providers: [
    { provide: IDisplayServiceToken, useClass: DisplayService }
  ]
})
```

Providing this value lets it be injected into the component

```JS
constructor(@Inject(IDisplayServiceToken) public displayService: IDisplayService)
```

## Why?

Injected tokens becomes a secret to angular extensibility.

## Multiple items

```JS
@NgModue({
  providers: [
    { provide: IDisplayServiceToken, useClass: DisplayService, multi: true }
  ]
})

constructor(@Inject(IDisplayServiceToken) public displayService: IDisplayService[])
```
