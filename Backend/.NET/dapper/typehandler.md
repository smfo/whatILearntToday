# Typehandler

When collecting data from a db using Dapper, you can only use primitive types in your object. Dapper will simply map the db columns to properties with the same name.

A way to use Dapper is therefore to first collect your data and map it to an entity model. Then later create your complex objects in the constructor of a domain model.

Another way to get around this that requires less code, is to create custom type handlers. The handler will tell Dapper how to handle the conversion from the primitive type, to the complex type and the other way around, on inserts into the db.

A type handler needs to inherit from `SqlMapper.TypeHandler<T>`. The inherited methods are `SetValue`, complex -> primitive, and `Parse`, primitive -> complex. These handler functions typically make use of the `from, create, parse, tostring..` functions in the complex type.

The Handler then needs to be registered to make Dapper aware or it, `SqlMapper.AddTypeHandler(new {HANDLERCLASS})`. After this, Dapper will automatically know how to deal with the complex type in question whenever a conversion is needed.