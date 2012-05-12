DivSugar
========

**DivSugar is a CSS-based 3D graphics library,** which provides a 3D scene graph, an animation system, and geometry classes.
Each node of the scene graph is an extended div element, so it is very easy to integrate 3D animations into existing web pages.

DivSugar depends on CSS 3D transform and runs on Safari, Chrome, and Firefox for now.

Getting Started
---------------
Include `divsugar.js`, then all of the functions get available via the `DivSugar` global variable.

```html
<script src="divsugar.js"></script>
```

A `Scene` is the root of a scene graph and specifies the rendering area.
A `Node` is an element of a scene graph and draws an image.
Both of them are extended div elements and created by the factory methods of DivSugar.

```javascript
var scn = DivSugar.createScene('someScene')
  .setSize(800, 600)
  .setImage('#000080')
  .appendTo(document.body);

var node = DivSugar.createNode('someNode')
  .setSize(300, 300)
  .setPosition(10, 20, 30)
  .setImage('image.jpg')
  .appendTo(scn);
```

DivSugar provides the `Task`, which calls the `onUpdate` method of the registered tasks in every frame.
It also calls the `onDestroy` method when the task is destroyed.

```javascript
var task = new DivSugar.Task('someTask').appendTo(DivSugar.rootTask);

task.onUpdate = function(elapsedTime) {
  node.rotate(elapsedTime * 0.1, elapsedTime * 0.2, elapsedTime * 0.3);
};

task.onDestroy = function() {
  scn.removeChild(node);
};
```

With the `playAnimation` method of nodes, it is possible to make the task which plays a sequence of animations automatically.

```javasscript
node.playAnimation([
  ['to', { size: [100, 100], opacity: 1 }, 1000, DivSugar.Ease.quadInOut],
  ['wait', 500],
  ['to', { size: [200, 200], opacity: 0 }, 500, DivSugar.Ease.linear],
  ['call', someFunction],
  ['repeat', 10]
]);
```

Examples
--------
- 01.SimpleApplication ([demo](http://kitao.github.com/divsugar/examples/01.SimpleApplication/) | [code](https://github.com/kitao/divsugar/blob/master/examples/01.SimpleApplication))
- 02.TaskSystem ([demo](http://kitao.github.com/divsugar/examples/02.TaskSystem/) | [code](https://github.com/kitao/divsugar/blob/master/examples/02.TaskSystem))
- 03.TweenAnimation ([demo](http://kitao.github.com/divsugar/examples/03.TweenAnimation/) | [code](https://github.com/kitao/divsugar/blob/master/examples/03.TweenAnimation))

Documentaion
------------
- [API Reference](https://github.com/kitao/divsugar/wiki/API-Reference)

License
-------
- MIT license
