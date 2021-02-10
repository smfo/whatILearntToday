# Only display layers at certain zoom levels

There is a field in `layer.Vector` called `maxResolution` that will only display the layer if the one pixel represents the number of meters defined.

```JS
var vextoryLayer = new ol.layer.Vector({
    source: vectorSource,
    maxResolution: 4
})
```

There's probably also a minResolution.
