DivSugar.Scene
==============

A scene graph which has the root node.

Constructors
------------

### `(DivSugar.Scene) Scene()`
Constructs a scene.

### `(DivSugar.Scene) Scene(id)`
Constructs a scene and sets the `id` to it.

Properties
----------

### `(HTMLDivElement) div`
The div element.

Methods
-------

### `(HTMLElement) getParent()`
Returns the parent HTML element of this scene.

### `(DivSugar.Scene) append(child)`
Appends the `child` node to this scene.  
This method is chainable.

### `(DivSugar.Scene) appendTo(parent)`
Appends this scene to the `parent` HTML element.  
This method is chainable.

### `(DivSugar.Scene) remove(child)`
Removes the `child` node from this scene.  
This method is chainable.

### `(Number) getViewAngle()`
Returns the angle of view of this scene in degrees.

### `(Number) getPerspective()`
Returns the CSS perspective of this scene.

### `(DivSugar.Scene) setViewAngle(viewAngle)`
Sets the angle of view of this scene in degrees.  
This method is chainable.

### `(Number) getWidth()`
Returns the width of this scene.

### `(Number) getHeight()`
Returns the height of this scene.

### `(Number) getViewWidth()`
Returns the width of the inner 3D space of this scene.

### `(Number) getViewHeight()`
Returns the height of the inner 3D space of this scene.

### `(DivSugar.Scene) setSize(width, height, viewWidth = width, viewHeight = height)`
Sets the size of this scene itself and the inner 3D space.  
When the `viewWidth` and `viewHeight` are omitted, the same values as the `width` and `height` are set.  
This method is chainable.

### `(Number) getPositionX()`
Returns the x-coordinate of this scene.

### `(Number) getPositionY()`
Returns the y-coordinate of this scene.

### `(DivSugar.Scene) setPosition(x, y)`
Sets the specified coordinates to the position of this scene.  
This method is chainable.

### `(Boolean) getVisible()`
Returns whether this scene is visible.

### `(DivSugar.Scene) setVisible(visible)`
Sets whether this scene is visible.  
This method is chainable.

### `(Boolean) getClip()`
Returns whether the child node clipping of this scene is enabled.

### `(DivSugar.Scene) setClip(clip)`
Sets whether to enable the child node clipping of this scene.  
This method is chainable.

### `(Number) getOpacity()`
Returns the opacity of this scene.

### `(DivSugar.Scene) setOpacity(opacity)`
Sets the opacity of this scene.  
This method is chainable.

### `(String) getImage()`
Returns the image source of this scene.

### `(DivSugar.Scene) setImage(src, callback = null)`
Sets the image source of this scene.  
When the `src` image is loaded, the `callback` function is called with the width and height of the image as two arguments.  
It is also possible to specify a color in the representation of '#rrggbb' instead of an image.  
This method is chainable.

### `(Number) getImageClipU1()`
Returns the left position of the image clip area of this scene.

### `(Number) getImageClipV1()`
Returns the top position of the image clip area of this scene.

### `(Number) getImageClipU2()`
Returns the right position of the image clip area of this scene.

### `(Number) getImageClipV2()`
Returns the bottom position of the image clip area of this scene.

### `(DivSugar.Scene) setImageClip(u1, v1, u2, v2)`
Sets the image clip area of this scene.  
The range of each coordinate is from 0 to 1.  
This method is chainable.

### `(DivSugar.Scene) adjustLayout(parentWidth, parentHeight, style)`
Changes the size and position of this scene based on the `style`.  
The styles can be used are as follows:
- 'center' moves this scene to the center of the parent HTML element.
- 'contain' scales this scene to the largest size which fit inside the parent HTML element.
- 'cover' scales this scene to the smallest size which covers the entire region of the parent HTML element.

### `(DivSugar.Scene) getLocalPosition(clientX, clientY, vec)`
Converts the client position in the window into the local position of this scene and sets to the vector `vec`.  
This method is chainable.
