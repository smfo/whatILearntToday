# OpenLayers

Can assembly data from multiple sources and put it into one map.\
(Syntax and packages may vary, so focus on understanding)

## Free data to create maps

[OpenStreetMap](http://openstreetmap.org)\
[Bing Maps REST services](https://docs.microsoft.com/en-us/bingmaps/rest-services/?redirectedfrom=MSDN)\
[MapQuest](https://developer.mapquest.com/)\
[Google maps](http://dev.openlayers.org/examples/google.html) Can only be used with their own products\
Or search for some

## Html

The html file that will contain the map needs a div where it will be rendered, with an is. And a script tag, below this tag. This is because the div needs to exist before the script is run.

The dimentions of the host div also needs to be set in order to be able to view the map.

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>First OpenLayer map</title>
    <style>
      #mymap {
        width: 600px;
        height: 400px;
        border: 1px solid #000;
      }
    </style>
  </head>
  <body>
    <div id="mymap"></div>
    <script></script>
  </body>
</html>
```

## JS

### Target

The host div, the target for the map.

### Layers

The data layers to be displayed in the map.\
Source referes to the source of this layer, where is the data comming from.

### View

View value (in this case default center and zoom value).\
Make sure the coordinates are in the same projection as the projection on the map! OpenLayers does not use longditude and latitude, so these needs to be transformed.

```JS
var coords = [0, 0];
var transCoords = ol.proj.fromLonLat(coords);

const map = new ol.Map({
  target: "mymap",
  layers: [
    new ol.TileLayer({
      source: new ol.OSM(),
    }),
  ],
  view: new ol.View({
    center: transCoords,
    zoom: 3,
  }),
```

## Vector data

(Raster data is data where each pixel represents a data value).\
Vector data is often not a regular grid, and is good for representations of things like borders and streets.

### Feature

A feature is a visualisation of data in the map.

Like with tile layers, the vector layer needs a source, and the source needs at least one feature.

```JS
var point = new ol.geom.Point(ol.proj.fromLonLat([-0.1676, 53.9108]));
var feature = new ol.Feature({
    geometry: point
});
feature.setId('HornSea');

var myVectorSource = new ol.source.Vector({
    features: [feature]
});

var myVectorLayer = new ol.layer.Vector({
    source: myVectorSource
});

//add to map
var myLayers = [myLayer, myVectorLayer];
```

Features have default styling, custom styling can be added.

```JS
// Styling example
var stroke = new ol.style.Stroke({color: 'black', width: 2});
var goldFill = new ol.style.Fill({color: 'gold'});

var squareStyle = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: goldFill,
        stroke: stroke,
        points: 4,
        radius: 10,
        angle: Math.PI / 4
    })
});
```
