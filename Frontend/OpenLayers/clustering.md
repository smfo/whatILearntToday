# Clustering

Each one of the features in a vector layer is rerendered clientside every time the zoomlevel of the map is changed.\
To solve this one can use clustering. This takes features that are cloas and represents them in one point on far out zoom levels.

To create the cluster you need to define at which distance two features will be clustered together, and provide a source.

```JS
//html, in this example
<input id="distance" type="range" min="0" max="100" step="1" value="40"/>

var distance = document.getElementById('distance');

//Generate a layer with lots of random features//

//Create a cluster
var clusterSource = new Cluster({
  distance: parseInt(distance.value, 10),
  source: source,
});
```

Then provide the cluster as a source for a new vector layer and add it to the map,

```JS
var styleCache = {};
var clusters = new VectorLayer({
  source: clusterSource, //add the cluster to a layer
  style: function (feature) {
    var size = feature.get('features').length;
    var style = styleCache[size];
    if (!style) {
      style = new Style({
        image: new CircleStyle({
          radius: 10,
          stroke: new Stroke({
            color: '#fff',
          }),
          fill: new Fill({
            color: '#3399CC',
          }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({
            color: '#fff',
          }),
        }),
      });
      styleCache[size] = style;
    }
    return style;
  },
});

var raster = new TileLayer({
  source: new OSM(),
});

var map = new Map({
  layers: [raster, clusters], //add the layer to the map
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
```
