DivSugar.Node
=============

Constructors
------------

### `(DivSugar.Node) Node()`

### `(DivSugar.Node) Node(id)`

Properties
----------

### `(HTMLDivElement) div`

Methods
-------

### `(DivSugar.Scene|DivSugar.Node) getParent()`

### `(DivSugar.Node) append(child)`

### `(DivSugar.Node) appendTo(parent)`

### `(DivSugar.Node) remove(child)`

### `(Number) getWidth()`

### `(Number) getHeight()`

### `(DivSugar.Node) setSize(width, height)`

### `(Number) getPositionX()`

### `(Number) getPositionY()`

### `(Number) getPositionZ()`

### `(DivSugar.Node) getPosition(vec)`

### `(DivSugar.Node) setPosition(vec)`

### `(DivSugar.Node) setPosition(x, y, z)`

### `(DivSugar.Node) getTransform(mat)`

### `(DivSugar.Node) setTransform(mat) ->`

### `(Boolean) getVisible()`

### `(DivSugar.Node) setVisible(visible)`

### `(Boolean) getBackface()`

### `(DivSugar.Node) setBackface(backface)`

### `(Boolean) getClip()`

### `(DivSugar.Node) setClip(clip)`

### `(Number) getOpacity()`

### `(DivSugar.Node) setOpacity(opacity)`

### `(String) getImage()`

### `(DivSugar.Node) setImage(src, callback)`

### `(Number) getImageClipU1()`

### `(Number) getImageClipV1()`

### `(Number) getImageClipU2()`

### `(Number) getImageClipV2()`

### `(DivSugar.Node) setImageClip(u1, v1, u2, v2)`

### `(DivSugar.Node) translate(offsetX, offsetY, offsetZ)`

### `(DivSugar.Node) rotate(rotateX, rotateY, rotateZ)`

### `(DivSugar.Node) scale(scaleX, scaleY, scaleZ)`

### `(DivSugar.Task) playAnimation(animation)`

### `(DivSugar.Node) clearAnimation()`

### `(DivSugar.Node) getWorldPosition(vec)`

### `(DivSugar.Node) getWorldTransform(mat)`

Animation Commands
------------------

### `['to', ( prop1: value1, prop2: value2, ... ), time, easeFunc = DivSugar.Ease.linear]`

### `['wait', time]`

### `['play', animation]`

### `['call', func]`

### `['repeat', count = infinite]`

Animation Properties
--------------------

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
