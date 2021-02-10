# Map interaction

## React to mouse clicks

```JS
// adding a new feature to the map
var coords2 = [-86.9125, 40.4419];
var points2 = new ol.geom.Point(ol.proj.fromLonLat(coords2));
var feature2 = new ol.Feature({
    geometry: point2
});
feature2.setId('West Lafayette');
feature2.setStyle(squareStyle);

var myVectorSource = new ol.source.Vector({
    features: [feature, feature2]
});
```

Need to add an event handeler to the map, instead of adding one to every feature.

The forEachFeatureAtPixel method takes the pixel that is clicked on, and executes the callback function, second arguent, for every feature this pixel is a part of.

```JS
map.on('click', function(evt){
    map.forEachFeatureAtPixel(evt.pixel, function(feature, layer){
        alert(feature.getId());
    })
})
```
