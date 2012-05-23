DivSugar
========

**DivSugar is a CSS-based 3D graphics library,** which provides a 3D scene graph, an animation system, and geometry classes.
Each node of the scene graph is an extended div element, so it is very easy to integrate 3D animations into existing web pages.

DivSugar depends on CSS 3D transform and runs on Safari, Chrome, and Firefox for now.

Getting Started
---------------
Include `divsugar.js`, then all of the functions get available via the `DivSugar` global variable.

```html
<script src="divsugar.min.js"></script>
```

A `Scene` is the root of a scene graph and specifies the rendering area.
A `Node` is an element of a scene graph and draws an image.
Both of them contain div elements as their properties.

```javascript
var scn = new DivSugar.Scene('someScene')
  .setSize(800, 600)
  .setImage('#000080')
  .appendTo(document.body);

var node = new DivSugar.Node('someNode')
  .setSize(300, 300)
  .setPosition(10, 20, 30)
  .setImage('image.jpg')
  .appendTo(scn);
```

DivSugar provides the `Task`, which calls the `onUpdate` method of the registered tasks in every frame.
It also calls the `onDestroy` method when the task is destroyed.

```javascript
var task = new DivSugar.Task('someTask').appendTo(DivSugar.rootTask);

task.onUpdate = function() {
  node.rotate(this.deltaTime * 0.1, this.deltaTime * 0.2, this.deltaTime * 0.3);
};

task.onDestroy = function() {
  scn.removeChild(node);
};
```

With the `playAnimation` method of nodes, it is possible to make the task which plays a sequence of animations automatically.

```javascript
node.playAnimation([
  ['to', { size: [100, 100], opacity: 1 }, 1000, DivSugar.Ease.quadInOut],
  ['wait', 500],
  ['to', { size: [200, 200], opacity: 0 }, 500, DivSugar.Ease.linear],
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

Documentaion
------------
- [API Reference](https://github.com/kitao/divsugar/blob/master/docs)

Version History
---------------
### 0.8.0
- Changed to throw exceptions for unknown animation commands/params
- Changed the rootNode property of the Scene class to private
- Added the isScene property to the rootNode
- Added the getParent methods to the Scene and Node class
- Removed the isRootTask property of the rootTask
- Changed the Scene and Node class to contain a div element
- Removed the createScene method and the createNode method of the DivSugar class
- Integrated the rotate methods of the Vector class
- Changed to throw exceptions for invalid argument number
- Added the getLocalPosition method to the Scene class

### 0.7.0
- First release

License
-------
- MIT license
