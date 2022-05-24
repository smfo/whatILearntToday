# Collect data from FireStore

Data from firestore can be collected in two ways.

Once using a `get` method, if you want to update the data this method will have to be called again.

Or using a stream through `snapshot`. This will provide a stream that will be updated in realtime.