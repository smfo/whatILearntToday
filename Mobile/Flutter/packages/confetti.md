# Confetti - animation

Animation that lets you use confeti in the backround.

```
flutter pub add confetti
```

we need a controller that starts the confetti, and disposes of it when it is finished.

Use a `ConfettiWidget` and pass it the controller along with any other parameters you want.

```dart
class _ConfettiFactoryState extends State<ConfettiFactory> {
  late ConfettiController _controller;

  @override
  void initState() {
    super.initState();
    _controller = ConfettiController(duration: const Duration(seconds: 10));
    _controller.play();
  }

  @override
  void dispose(){
    super.dispose();
    _controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Align(
          alignment: widget._confettiConfig.align,
          child: ConfettiWidget(
            confettiController: _controller,
            colors: widget._confettiConfig.colors,
            shouldLoop: true,
            numberOfParticles: widget._confettiConfig.particles,
            blastDirection: widget._confettiConfig.direction,
            blastDirectionality: widget._confettiConfig.directionality,
          ),
        );
  }
}
```