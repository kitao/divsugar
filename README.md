DivSugar
========

DivSugar is a CSS-based 3D graphics library, which provides a 3D scene graph, an animation system, and geometry classes.
Each node of the scene graph is an extended div element, so it is very easy to integrate 3D animations into existing web pages.

DivSugar depends on CSS 3D transform and runs on Safari, Chrome, and Firefox for now.

Getting Started
---------------
First, include **divsugar.min.js** for normal use or **divsugar.js** for debug use.
```html
<script src="divsugar.min.js"></script>
```
Then all of the functions get available via the DivSugar variable.

A scene is the root node of a scene graph and can also specify the rendering area.
A node is an element of a scene graph and can draw an image.
Both of them are extended div elements and created by factory methods of DivSugar.
```javascript
var scn = DivSugar.createScene('someScene');
document.body.appendChild(scn);

var node = DivSugar.createNode('someNode');
scn.appendChild(node);
```

Examples
--------
- TBD

Supported Browsers
------------------
- TBD

Documentaion
------------
- TBD

License
-------
- MIT license
