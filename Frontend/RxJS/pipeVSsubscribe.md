
# Pipe vs Subscribe

Pipe is for chaining observable operators together. Each operator returns a new observable to the next operator to continue working with.

Subscribe is for activating the observable and listening for emitted values from the stream. In subscribe you access the subscription object, not the value itself.