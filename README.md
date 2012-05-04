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
Then all of the functions get available via the **DivSugar** global variable.

A scene is the root node of a scene graph and specifies the rendering area.
A node is an element of a scene graph and draws an image.
Both of them are extended div elements and created by the factory methods of DivSugar.
```javascript
var scn = DivSugar.createScene('someScene');
scn.setSize(800, 600).setImage('#000080');
document.body.appendChild(scn);

var node = DivSugar.createNode('someNode');
node.setSize(300, 300).setPosition(10, 20, 30).setImage('image.jpg');
scn.appendChild(node);
```

Examples
--------
- TBD

Documentaion
------------
- TBD

License
-------
- MIT license
