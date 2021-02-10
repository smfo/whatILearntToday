# Control

A widget with a DOM element in a fixed position on the screen. They can involve userinput or be strictly informational. The position is set using CSS.

Add to map directly when the instance is created or later by using addControl.

```js
var map = new ol.Map({
  //other map setup//
  controle: ol.control.defaults({ attribution: false }).extend([
    new ol.control.Attribution({
      collapsed: true,
      collapsible: true,
    }),
    new ol.control.ScaleLine(),
  ]),
});

this._olMap.addControl(this.controlBaseMap.getLayerControler());
this._olMap.addControl(this.layerControl.getControler());
```

There are a lot of already available controlers, and you can create custom ones.

## Default

By default adds a set of controls to the map (ol.control.Zoom, ol.control.Rotate, ol.control.Attribuion), unless otherwise configured.\
Because these are added by default, any changes should be done in the map initialization.

```JS
this.olMap = new ol.Map({
      target: this.mapElement.nativeElement,
      view: new ol.View({
        center: [0, 0],
        zoom: 2,
        maxZoom: 20,
        minZoom: 2
      }),
      controls: ol.control.defaults({ attribution: false })
      .extend([
        new ol.control.Attribution({
          collapsed: false,
          collapsible: false
        }),
        new ol.control.ScaleLine()
      ])
    });
```

Remove controls by setting them to false.\
NB: removing the controls will not prevent zooming or rotation.

```js
ol.control.defaults({
  attribution: false,
  zoom: false,
  rotate: false,
});
```

To make changes to the controls remove the default control and add a new one. If you don't first remove the original control, you will just add another one.

```js
ol.control.defaults({ attribution: false }).extends([
  new ol.control.Attribution({
    collapse: false,
    collapsible: false,
  }),
]);
```

- Attribution: shows attributions associated with the layer source of the map
- Rotate: A button control to reset the rotation to 0. By default this control is only visible once the map has been rotated. This is done by `alt + shift + drag`
- Zoom: control consists of 2 buttons, to zoom in and outs

## Custom controlers

Create a DOM element to display and make it into a controller using `ol.control.Control`, where the DOM element is initialized as element.

In the DOM element, before creating a control, create the html, css and eventlistener functionality.

```JS
      this.map.addControl(this.createShowAllVesselsButton());


private createShowAllVesselsButton() {
  //Create DOM element
    const e = document.createElement('div');
    const b = document.createElement('button');
    b.innerHTML = '¤'
    e.appendChild(b);

    //styling
    e.className = 'ol-unselectable ol-control';
    e.title = 'Show all sites'
    e.style.top = '4.5em';
    e.style.left = '0.5em';

    //functionality
    b.addEventListener('click', () => {
      this.zoomToVisibleSites()
    }, false);

  //make the element into a controler
    const buttonControl = new ol.control.Control({
      element: e
    });
    return buttonControl;
  }
```
