DivSugar
========

DivSugar is a CSS-based 3D graphics library, which provides a 3D scene graph, an animation system, and geometry classes.
Each node of the scene graph is an extended div element, so it is very easy to integrate 3D animations into existing web pages.

DivSugar depends on CSS 3D transform and runs on Safari, Chrome, and Firefox for now.

Getting Started
---------------
Include **divsugar.min.js**, then all of the functions get available via the **DivSugar** global variable.

```html
<script src="divsugar.js"></script>
```

A scene is the root of a scene graph and specifies the rendering area.
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

DivSugar provides the task system, which calls the onUpdate method of the registered tasks in every frame.
It also calls the onDestroy method when the task is destroyed.

```javascript
var task = new DivSugar.Task('someTask');

task.onUpdate = function(elapsedTime) {
  node.rotate(elapsedTime * 0.1, elapsedTime * 0.2, elapsedTime * 0.3);
};

task.onDestroy = function() {
  scn.removeChild(node);
};

DivSugar.rootTask.appendChild(task);
```

Examples
--------
- 01.SimpleApplication ([demo](http://kitao.github.com/divsugar/examples/01.SimpleApplication/) | [code](https://github.com/kitao/divsugar/blob/master/examples/01.SimpleApplication))
- 02.TaskSystem ([demo](http://kitao.github.com/divsugar/examples/02.TaskSystem/) | [code](https://github.com/kitao/divsugar/blob/master/examples/02.TaskSystem))

Documentaion
------------
- [API Reference](https://github.com/kitao/divsugar/wiki/API-Reference)

License
-------
- MIT license
