# ShadeMask

This is a widget that is used to apply effects/color to it's child widget.

```dart
ShaderMask(
        shaderCallback: (mask) => const LinearGradient(
                colors: [Colors.black12, Colors.black],
                begin: Alignment.center,
                end: Alignment.bottomCenter)
            .createShader(mask),
        blendMode: BlendMode.darken,
        child: Container(
            decoration: const BoxDecoration(
                image: DecorationImage(
                    image: AssetImage('assets/grumpy.jpg'),
                    fit: BoxFit.cover,
                    colorFilter:
                        ColorFilter.mode(Colors.black45, BlendMode.darken)))),
      );
```

## Shadercallback

The callback that creates the shade for your child widget, they add color effects. To do this we use gradients. In order to actually apply the gradient, we need to use `.createShader(callback)`.

### Linear gradient

Takes a list of colors to apply to the list, as well as an optional begin and end position.

### Radial gratient

Displays the shade as a layer of circles. Each effect in the colors list, will be applied in another outer circle.

```dart
body: Center(
  child: ShaderMask(
    shaderCallback: (Rect bounds) {
      return RadialGradient(
          colors: [
            Colors.green,
            Colors.blue,
            Colors.orange
          ]
      ).createShader(bounds);
    }, blendMode: BlendMode.screen,
    child: Container(
        width: double.infinity,
        height: double.infinity,
        child: Image.asset('assets/jpg.jpg', fit: BoxFit.cover)
    )
  )
)
```

### Sweep gradient

Displays he shade at different angles in the image. The gradient takes a start and an end angle.

```dart
return SweepGradient(
      colors: [Colors.indigo, Colors.blue, Colors.green,Colors.yellow,Colors.orange,Colors.red],
        startAngle: 0.1,
        endAngle: 1,
    ).createShader(bounds);
},blendMode: BlendMode.softLight,
```

## BlendMode

Applies different effects to the child by changing brightness, contrast, shadow etc.

Some examples: color, colorburn, colordodge, clear, src, dst