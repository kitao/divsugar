DivSugar
========

**DivSugar is a CSS-based 3D graphics library,** which provides a 3D scene graph, an animation system, and geometry classes.
Each node of the scene graph is an extended div element, so it is very easy to integrate 3D animations into existing web pages.

DivSugar depends on CSS 3D transforms and runs on Safari, Chrome, and Firefox for now.

<a href="http://kitao.github.com/divsugar/examples/01.SimpleApplication/" target="_blank">
  <img src="http://kitao.github.com/divsugar/examples/screenshots/01.SimpleApplication.png" width="19.5%">
</a>
<a href="http://kitao.github.com/divsugar/examples/02.TaskAnimation/" target="_blank">
  <img src="http://kitao.github.com/divsugar/examples/screenshots/02.TaskAnimation.png" width="19.5%">
</a>
<a href="http://kitao.github.com/divsugar/examples/03.TweenAnimation/" target="_blank">
  <img src="http://kitao.github.com/divsugar/examples/screenshots/03.TweenAnimation.png" width="19.5%">
</a>
<a href="http://kitao.github.com/divsugar/examples/04.LightAndBillboard/" target="_blank">
  <img src="http://kitao.github.com/divsugar/examples/screenshots/04.LightAndBillboard.png" width="19.5%">
</a>
<a href="http://kitao.github.com/divsugar/examples/05.KeyAndMouseInput/" target="_blank">
  <img src="http://kitao.github.com/divsugar/examples/screenshots/05.KeyAndMouseInput.png" width="19.5%">
</a>

Getting Started
---------------

Include `divsugar.js`, then all of the functions get available via the `DivSugar` global variable.

```html
<script src="divsugar.js"></script>
```

A Scene is the root of a scene graph and specifies the rendering area.
A Node is an element of a scene graph and draws an image.
Both of them contain div elements as their properties.

```javascript
var scn = new DivSugar.Scene()
  .setSize(800, 600)
  .setImage('#000080')
  .appendTo(document.body);

var node = new DivSugar.Node()
  .setSize(300, 300)
  .setPosition(10, 20, 30)
  .setImage('image.jpg')
  .appendTo(scn);
```

DivSugar provides a Task, which calls the `onUpdate` method of the registered Tasks in every frame.
It also calls the `onDestroy` method when the Task is destroyed.

```javascript
var task = new DivSugar.Task().appendTo(DivSugar.rootTask);

task.onUpdate = function() {
  node.rotate(this.deltaTime * 0.1, this.deltaTime * 0.2, this.deltaTime * 0.3);
};

task.onDestroy = function() {
  scn.removeChild(node);
};
```

With the `playAnimation` method of Nodes, it is possible to make the Task which plays a sequence of animations automatically.

```javascript
node.playAnimation([
  ['to', { size: [100, 100], opacity: 0 }, 500, DivSugar.Ease.quadInOut],
  ['wait', 500],
  ['to', { size: [200, 200], opacity: 1 }, 1000, DivSugar.Ease.linear],
  ['play', someAnim],
  ['call', someFunc],
  ['repeat', 10]
]);
```

Examples
--------

- 01.SimpleApplication ([demo](http://kitao.github.com/divsugar/examples/01.SimpleApplication/) | [code](https://github.com/kitao/divsugar/blob/master/examples/01.SimpleApplication))
- 02.TaskAnimation ([demo](http://kitao.github.com/divsugar/examples/02.TaskAnimation/) | [code](https://github.com/kitao/divsugar/blob/master/examples/02.TaskAnimation))
- 03.TweenAnimation ([demo](http://kitao.github.com/divsugar/examples/03.TweenAnimation/) | [code](https://github.com/kitao/divsugar/blob/master/examples/03.TweenAnimation))
- 04.LightAndBillboard ([demo](http://kitao.github.com/divsugar/examples/04.LightAndBillboard/) | [code](https://github.com/kitao/divsugar/blob/master/examples/04.LightAndBillboard))
- 05.KeyAndMouseInput ([demo](http://kitao.github.com/divsugar/examples/05.KeyAndMouseInput/) | [code](https://github.com/kitao/divsugar/blob/master/examples/05.KeyAndMouseInput))

Documentaion
------------

- [API Reference](https://github.com/kitao/divsugar/blob/master/docs)
- Tutorial ([English](https://github.com/kitao/divsugar/wiki/DivSugar-Tutorial) | [Japanese](https://github.com/kitao/divsugar/wiki/DivSugar-Tutorial-in-Japanese))

License
-------

- MIT license
