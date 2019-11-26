import { createDecipher } from "crypto"
import { stringify } from "querystring";


// A dependency provider configures an injector that can be used to provide a concrete, runtime
// version of a dependency value. The injector relies on the provider configuration to create instances
// of the dependencies that it injects into components, directives...
// an injector must be configured with a provider, else if will not know how to create the dependency.

// shorthand
providers: [Logger]
// full provider object
[{ provide: Logger, useClass: Logger }]

// the provide property holds the token that serves ar the key for both locationg a dependency value and 
// configure the injector.
// the useClass property is a provider definition Object. This tells the injector how to create the dependency
// value.
// This provider-definition key can be useClass, but also useExisting, useValue or useFactory. Each provide a 
// different type of dependency

// This code tells the injector to return a BetterLogger instance when the component asks for a logger 
// using the Logger token 
[{ provide: Logger, useClass: BetterLogger }]



// Alias
// Suppose you have a component that needs to use OldLogger instead of NewLogger. They have the same interface 
// but some components HAVE to use OldLogger. When these components use Oldlogger we want the singleton instance 
// of NewLogger to handle the event. In this case, the injector should inject this singletion instance when a 
// component asks for either the new or old logger. OldLogger should be an alias for NewLogger.
[ NewLogger,
{ provide: OldLogger, useClass: NewLogger }]
// in this case there are TWO instances of NewLogger. This is not an alias
[ NewLogger,
 { provide: OldLogger, useExisting: NewLogger }]
// this code only creates one instance of NewLogger

// Value providers
// The useValue option is used ti inject an object that is already created 
[{ provide: Logger, useValue: silentLogger }]

// An object in the shape of the logger service
export function SilentLoggerFn() {}

const silentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: SilentLoggerFn
};



// Non-class dependencies
// Sometimes you want to inject a stringify, function or object instead of a class.
// ...


// Factory providers
// sometimes a dependent value needs to be created dynamically, based on information not available until runtime. 
// ...

https://angular.io/guide/dependency-injection-providers