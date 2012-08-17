DivSugar.Scene
==============

A scene graph which has the root node.

Constructors
------------

### `(DivSugar.Scene) Scene()`
Constructs a Scene.

### `(DivSugar.Scene) Scene(id)`
Constructs a Scene and sets the `id` to it.

Properties
----------

### `(HTMLDivElement) div`
The div element.

Methods
-------

### `(HTMLElement) getParent()`
Returns the parent HTML element of this Scene.

### `(DivSugar.Scene) append(child)`
Appends the `child` Node to this Scene.  
This method is chainable.

### `(DivSugar.Scene) appendTo(parent)`
Appends this Scene to the `parent` HTML element.  
This method is chainable.

### `(DivSugar.Scene) remove(child)`
Removes the `child` Node from this Scene.  
This method is chainable.

### `(Number) getViewAngle()`
Returns the angle of view of this Scene in degrees.

### `(Number) getPerspective()`
Returns the CSS perspective of this Scene.

### `(DivSugar.Scene) setViewAngle(viewAngle)`
Sets the angle of view of this Scene in degrees.  
This method is chainable.

### `(Number) getWidth()`
Returns the width of this Scene.

### `(Number) getHeight()`
Returns the height of this Scene.

### `(Number) getViewWidth()`
Returns the width of the inner 3D space of this Scene.

### `(Number) getViewHeight()`
Returns the height of the inner 3D space of this Scene.

### `(DivSugar.Scene) setSize(width, height)`
Sets the size of this Scene itself and the inner 3D space as the same size.  
This method is chainable.

### `(DivSugar.Scene) setSize(width, height, viewWidth, viewHeight)`
Sets the size of this Scene itself and the inner 3D space.  
This method is chainable.

### `(Number) getPositionX()`
Returns the x-coordinate of this Scene.

### `(Number) getPositionY()`
Returns the y-coordinate of this Scene.

### `(DivSugar.Scene) setPosition(x, y)`
Sets the specified coordinates to the position of this Scene.  
This method is chainable.

### `(Boolean) getVisible()`
Returns whether this Scene is visible.

### `(DivSugar.Scene) setVisible(visible)`
Sets whether this Scene is visible.  
This method is chainable.

### `(Boolean) getClip()`
Returns whether the child Node clipping of this Scene is enabled.

### `(DivSugar.Scene) setClip(clip)`
Sets whether to enable the child Node clipping of this Scene.  
This method is chainable.

### `(Number) getOpacity()`
Returns the opacity of this Scene.

### `(DivSugar.Scene) setOpacity(opacity)`
Sets the opacity of this Scene.  
This method is chainable.

### `(String) getImage()`
Returns the image source of this Scene.

### `(DivSugar.Scene) setImage(src)`
Sets the image source of this Scene.  
It is also possible to specify a color in the representation of `'#rrggbb'` instead of an image.  
This method is chainable.

### `(DivSugar.Scene) setImage(src, callback)`
Sets the image source of this Scene.  
When the `src` image is loaded, the `callback` function is called with the width and height of the image as two arguments.  
It is also possible to specify a color in the representation of `'#rrggbb'` instead of an image.  
This method is chainable.

### `(Number) getImageClipU1()`
Returns the left position of the image clip area of this Scene.

### `(Number) getImageClipV1()`
Returns the top position of the image clip area of this Scene.

### `(Number) getImageClipU2()`
Returns the right position of the image clip area of this Scene.

### `(Number) getImageClipV2()`
Returns the bottom position of the image clip area of this Scene.

### `(DivSugar.Scene) setImageClip(u1, v1, u2, v2)`
Sets the image clip area of this Scene.  
The range of each coordinate is from 0 to 1.  
This method is chainable.

### `(DivSugar.Scene) adjustLayout(parentWidth, parentHeight, style)`
Changes the size and position of this Scene based on the `style`.  
The styles can be used are as follows:
- `'center'` moves this Scene to the center of the parent HTML element.
- `'contain'` scales this Scene to the largest size which fit inside the parent HTML element.
- `'cover'` scales this Scene to the smallest size which covers the parent HTML element.

### `(DivSugar.Scene) getLocalPosition(clientX, clientY, vec)`
Converts the client position in the window into the local position of this Scene and sets to the vector `vec`.  
This method is chainable.
