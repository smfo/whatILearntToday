# Errors

Errors I've had with hard to find answers

## Found this candidate but the arguments don't match

https://github.com/flutter/flutter/issues/75167

Probably you installed something with a dependency that doesn't match your own version of this package.

```
Flutter update --force
Flutter clean
<!-- delete .lock -->
Flutter pub get
Run app
```

## InputDecorator, ... cannot have an unbounded width

See [here](widgets/Forms)

## 