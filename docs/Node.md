DivSugar.Node
=============

A node of a 3D scene graph which can draw a rectangle and group other nodes.

Constructors
------------

### `(DivSugar.Node) Node()`
Constructs a Node.

### `(DivSugar.Node) Node(id)`
Constructs a Node and sets the `id` to it.

Properties
----------

### `(HTMLDivElement) div`
The div element.

Methods
-------

### `(DivSugar.Scene|DivSugar.Node) getParent()`
Returns the parent Scene or Node of this Node.

### `(DivSugar.Node) append(child)`
Appends the `child` Node to this Node.  
This method is chainable.

### `(DivSugar.Node) appendTo(parent)`
Appends this Node to the `parent` Node.  
This method is chainable.

### `(DivSugar.Node) remove(child)`
Removes the `child` Node from this Node.  
This method is chainable.

### `(Number) getWidth()`
Returns the width of this Node.

### `(Number) getHeight()`
Returns the height of this Node.

### `(DivSugar.Node) setSize(width, height)`
Sets the size of this Node.  
This method is chainable.

### `(Number) getPositionX()`
Returns the x-coordinate of this Node.

### `(Number) getPositionY()`
Returns the y-coordinate of this Node.

### `(Number) getPositionZ()`
Returns the z-coodrinate of this Node.

### `(DivSugar.Node) getPosition(vec)`
Sets the position of this Node to the vector `vec`.  
This method is chainable.

### `(DivSugar.Node) setPosition(vec)`
Sets the vector `vec` to the position of this Node.  
This method is chainable.

### `(DivSugar.Node) setPosition(x, y, z)`
Sets the specified coordinates to the position of this Node.  
This method is chainable.

### `(DivSugar.Node) getTransform(mat)`
Sets the transform of this Node to the matrix `mat`.  
This method is chainable.

### `(DivSugar.Node) setTransform(mat) ->`
Sets the matrix `mat` to the transform of this Node.  
This method is chainable.

### `(Boolean) getVisible()`
Returns whether this Node is visible.

### `(DivSugar.Node) setVisible(visible)`
Sets whether this Node is visible.  
This method is chainable.

### `(Boolean) getBackface()`
Returns whether to draw the backface of this Node.

### `(DivSugar.Node) setBackface(backface)`
Sets whether to draw the backface of this Node.  
This method is chainable.

### `(Boolean) getClip()`
Returns whether the child Node clipping of this Node is enabled.

### `(DivSugar.Node) setClip(clip)`
Sets whether to enable the child Node clipping of this Node.  
This method is chainable.

### `(Number) getOpacity()`
Returns the opacity of this Node.

### `(DivSugar.Node) setOpacity(opacity)`
Sets the opacity of this Node.  
This method is chainable.

### `(String) getImage()`
Returns the image source of this Node.

### `(DivSugar.Node) setImage(src)`
Sets the image source of this Node.  
It is also possible to specify a color in the representation of `'#rrggbb'` instead of an image.  
This method is chainable.

### `(DivSugar.Node) setImage(src, callback)`
Sets the image source of this Node.  
When the `src` image is loaded, the `callback` function is called with the width and height of the image as two arguments.  
It is also possible to specify a color in the representation of `'#rrggbb'` instead of an image.  
This method is chainable.

### `(Number) getImageClipU1()`
Returns the left position of the image clip area of this Node.

### `(Number) getImageClipV1()`
Returns the top position of the image clip area of this Node.

### `(Number) getImageClipU2()`
Returns the right position of the image clip area of this Node.

### `(Number) getImageClipV2()`
Returns the bottom position of the image clip area of this Node.

### `(DivSugar.Node) setImageClip(u1, v1, u2, v2)`
Sets the image clip area of this Node.  
The range of each coordinate is from 0 to 1.  
This method is chainable.

### `(DivSugar.Node) translate(offsetX, offsetY, offsetZ)`
Translates this Node along its axes.  
This method is chainable.

### `(DivSugar.Node) rotate(angleX, angleY, angleZ)`
Rotates this Node by the specified angles in degrees.  
This method is chainable.

### `(DivSugar.Node) rotateAround(axis, angle)`
Rotates this Node around the vector `axis` by the `angle` in degrees.  
The length of the `axis` must be 1.  
This method is chainable.

### `(DivSugar.Node) rotateAround(point, axis, angle)`
Rotates this Node around the pivot specified by the vector `point` and vector `axis` by the `angle` in degrees.  
The length of the `axis` must be 1.  
This method is chainable.

### `(DivSugar.Node) scale(scaleX, scaleY, scaleZ)`
Scales this Node.  
This method is chainable.

### `(DivSugar.Task) playAnimation(animation)`
Plays the `animation` and returns the animation Task.  
The `animation` is an array of the animation commands.

### `(DivSugar.Node) clearAnimation()`
Destroys all of the animation Tasks of this Node.  
This method is chainable.

### `(DivSugar.Node) getWorldPosition(vec)`
Sets the world position of this Node to the vector `vec`.  
This method is chainable.

### `(DivSugar.Node) getWorldTransform(mat)`
Sets the world transform of this Node to the vector `mat`.  
This method is chainable.

Animation Commands
------------------

The following commands can be used for the `playAnimation` method.

### `['to', ( p1: v1, p2: v2, ... ), time, easeFunc = DivSugar.Ease.linear]`
Interpolates the specified properties to the specified values with the interpolation equation `easeFunc` for `time` millisecond.  
When the `easeFunc` is omitted, `DivSugar.Ease.linear` is used as the interpolation equation.

### `['wait', time]`
Wait for `time` millisecond.

### `['play', animation]`
Starts playing the another `animation`.

### `['call', func]`
Calls the function `func`.

### `['repeat', count = infinite]`
Repeats this animation for `count` times.  
When the `count` is omitted, repeats unlimitedly.

Animation Properties
--------------------

The following properties can be used for the `'to'` command.

### `size: [width, height]`

### `position: [x, y, z]`

### `transform: mat`

### `visible: visible`

### `backface: backface`

### `clip: clip`

### `opacity: opacity`

### `image: src`

### `imageClip: [u1, v1, u2, v2]`

### `translate: [offsetX, offsetY, offsetZ]`

### `rotate: [angleX, angleY, angleZ]`

### `scale: [scaleX, scaleY, scaleZ]`
