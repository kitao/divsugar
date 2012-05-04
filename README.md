DivSugar
========

DivSugar is a CSS-based 3D graphics library, which provides a 3D scene graph, an animation system, and geometry classes.
Each node of the scene graph is an extended div element, so it is very easy to integrate 3D animations into existing web pages.

DivSugar depends on CSS 3D transform and runs on Safari, Chrome, and Firefox for now.

Getting Started
---------------
Include **divsugar.min.js** for normal use or **divsugar.js** for debug use.
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
node.setSize(300, 300).setImage('image.jpg').setPosition(10, 20, 30);
scn.appendChild(node);
```

DivSugar provides the two kinds of animation system.
One is the task system, which calls the onUpdate method of the registered tasks in every redering time.
It also calls the onDestroy method when the task's destroy mothod is called.

```javascript
var task = new DivSugar.Task('someTask');

task.onUpdate = function(elapsedTime) {
  node.rotate(elapsedTime * 0.1, elapsedTime * 0.2, elapsedTime * 0.3);
};

task.onDestroy = function() {
  scn.removeChild(node);
};
```

The other is the CSS animation generator, which helps with making new CSS animations dynamically.
Each generated animation can be adapted to nodes.

```javascript
DivSugar.addCSSAnimation('someAnimation', {
  from: {
    size: [100, 100],
    opacity: 0,
    rotate: [0, 0, 0]
  },
  to: {
    size: [300, 300],
    opacity: 1,
    rotate: [0, 0, 180]
  }
});

node.playCSSAnimation('someAnimation', 15);
```

Examples
--------
- Simple application
- Task animation
- Dynamic CSS animation

Documentaion
------------
- TBD

License
-------
- MIT license
