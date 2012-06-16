DivSugar.Node
=============

A node of a 3D scene graph which can draw a rectangle and group other nodes.

Constructors
------------

### `(DivSugar.Node) Node()`
Constructs a node.

### `(DivSugar.Node) Node(id)`
Constructs a node and sets the `id` to it.

Properties
----------

### `(HTMLDivElement) div`
The div element.

Methods
-------

### `(DivSugar.Scene|DivSugar.Node) getParent()`
Returns the parent scene or node of this node.

### `(DivSugar.Node) append(child)`
Appends the `child` node to this node.  
This method is chainable.

### `(DivSugar.Node) appendTo(parent)`
Appends this node to the `parent` node.  
This method is chainable.

### `(DivSugar.Node) remove(child)`
Removes the `child` node from this node.  
This method is chainable.

### `(Number) getWidth()`
Returns the width of this node.

### `(Number) getHeight()`
Returns the height of this node.

### `(DivSugar.Node) setSize(width, height)`
Sets the size of this node.  
This method is chainable.

### `(Number) getPositionX()`
Returns the x-coordinate of this node.

### `(Number) getPositionY()`
Returns the y-coordinate of this node.

### `(Number) getPositionZ()`
Returns the z-coodrinate of this node.

### `(DivSugar.Node) getPosition(vec)`
Sets the position of this node to the vector `vec`.  
This method is chainable.

### `(DivSugar.Node) setPosition(vec)`
Sets the vector `vec` to the position of this node.  
This method is chainable.

### `(DivSugar.Node) setPosition(x, y, z)`
Sets the specified coordinates to the position of this node.  
This method is chainable.

### `(DivSugar.Node) getTransform(mat)`
Sets the transform of this node to the matrix `mat`.  
This method is chainable.

### `(DivSugar.Node) setTransform(mat) ->`
Sets the matrix `mat` to the transform of this node.  
This method is chainable.

### `(Boolean) getVisible()`
Returns whether this node is visible.

### `(DivSugar.Node) setVisible(visible)`
Sets whether this node is visible.  
This method is chainable.

### `(Boolean) getBackface()`
Returns whether to draw the backface of this node.

### `(DivSugar.Node) setBackface(backface)`
Sets whether to draw the backface of this node.  
This method is chainable.

### `(Boolean) getClip()`
Returns whether the child node clipping of this node is enabled.

### `(DivSugar.Node) setClip(clip)`
Sets whether to enable the child node clipping of this node.  
This method is chainable.

### `(Number) getOpacity()`
Returns the opacity of this node.

### `(DivSugar.Node) setOpacity(opacity)`
Sets the opacity of this node.  
This method is chainable.

### `(String) getImage()`
Returns the image source of this node.

### `(DivSugar.Node) setImage(src)`
Sets the image source of this node.  
It is also possible to specify a color in the representation of `'#rrggbb'` instead of an image.  
This method is chainable.

### `(DivSugar.Node) setImage(src, callback)`
Sets the image source of this node.  
When the `src` image is loaded, the `callback` function is called with the width and height of the image as two arguments.  
It is also possible to specify a color in the representation of `'#rrggbb'` instead of an image.  
This method is chainable.

### `(Number) getImageClipU1()`
Returns the left position of the image clip area of this node.

### `(Number) getImageClipV1()`
Returns the top position of the image clip area of this node.

### `(Number) getImageClipU2()`
Returns the right position of the image clip area of this node.

### `(Number) getImageClipV2()`
Returns the bottom position of the image clip area of this node.

### `(DivSugar.Node) setImageClip(u1, v1, u2, v2)`
Sets the image clip area of this node.  
The range of each coordinate is from 0 to 1.  
This method is chainable.

### `(DivSugar.Node) translate(offsetX, offsetY, offsetZ)`
Translates this node along its axes.  
This method is chainable.

### `(DivSugar.Node) rotate(rotateX, rotateY, rotateZ)`
Rotates this node the specified angles in degrees.  
This method is chainable.

### `(DivSugar.Node) scale(scaleX, scaleY, scaleZ)`
Scales this node.  
This method is chainable.

### `(DivSugar.Task) playAnimation(animation)`
Plays the `animation` and returns the animation task.  
The `animation` is an array of the animation commands.

### `(DivSugar.Node) clearAnimation()`
Destroys all of the animation tasks of this node.  
This method is chainable.

### `(DivSugar.Node) getWorldPosition(vec)`
Sets the world position of this node to the vector `vec`.  
This method is chainable.

### `(DivSugar.Node) getWorldTransform(mat)`
Sets the world transform of this node to the vector `mat`.  
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

### `rotate: [rotateX, rotateY, rotateZ]`

### `scale: [scaleX, scaleY, scaleZ]`
