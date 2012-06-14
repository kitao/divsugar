DivSugar.Node
=============

Constructors
------------

```javascript
{DivSugar.Node} Node()
```

```javascript
{DivSugar.Node} Node( id )
```

Properties
----------

```javascript
{HTMLDivElement} div
```

Methods
-------

```javascript
{DivSugar.Scene|DivSugar.Node} getParent()
```

```javascript
{DivSugar.Node} append( child )
```

```javascript
{DivSugar.Node} appendTo( parent )
```

```javascript
{DivSugar.Node} remove( child )
```

```javascript
{Number} getWidth()
```

```javascript
{Number} getHeight()
```

```javascript
{DivSugar.Node} setSize( width, height )
```

```javascript
{Number} getPositionX()
```

```javascript
{Number} getPositionY()
```

```javascript
{Number} getPositionZ()
```

```javascript
{DivSugar.Node} getPosition( vec )
```

```javascript
{DivSugar.Node} setPosition( vec )
```

```javascript
{DivSugar.Node} setPosition( x, y, z )
```

```javascript
{DivSugar.Node} getTransform( mat )
```

```javascript
{DivSugar.Node} setTransform( mat ) ->
```

```javascript
{Boolean} getVisible()
```

```javascript
{DivSugar.Node} setVisible( visible )
```

```javascript
{Boolean} getBackface()
```

```javascript
{DivSugar.Node} setBackface( backface )
```

```javascript
{Boolean} getClip()
```

```javascript
{DivSugar.Node} setClip( clip )
```

```javascript
{Number} getOpacity()
```

```javascript
{DivSugar.Node} setOpacity( opacity )
```

```javascript
{String} getImage()
```

```javascript
{DivSugar.Node} setImage( src, callback )
```

```javascript
{Number} getImageClipU1()
```

```javascript
{Number} getImageClipV1()
```

```javascript
{Number} getImageClipU2()
```

```javascript
{Number} getImageClipV2()
```

```javascript
{DivSugar.Node} setImageClip( u1, v1, u2, v2 )
```

```javascript
{DivSugar.Node} translate( offsetX, offsetY, offsetZ )
```

```javascript
{DivSugar.Node} rotate( rotateX, rotateY, rotateZ )
```

```javascript
{DivSugar.Node} scale( scaleX, scaleY, scaleZ )
```

```javascript
{DivSugar.Task} playAnimation( animation )
```

```javascript
{DivSugar.Node} clearAnimation()
```

```javascript
{DivSugar.Node} getWorldPosition( vec )
```

```javascript
{DivSugar.Node} getWorldTransform( mat )
```

Animation
------------------

### Commands

```javascript
['to', { prop1: value1, prop2: value2, ... }, time, easeFunc = DivSugar.Ease.linear]
```

```javascript
['wait', time]
```

```javascript
['play', animation]
```

```javascript
['call', func]
```

```javascript
['repeat', count = infinite]
```

### Properties of the 'to' command

```javascript
size: [width, height]
```

```javascript
position: [x, y, z]
```

```javascript
transform: mat
```

```javascript
visible: visible
```

```javascript
backface: backface
```

```javascript
clip: clip
```

```javascript
opacity: opacity
```

```javascript
image: src
```

```javascript
imageClip: [u1, v1, u2, v2]
```

```javascript
translate: [offsetX, offsetY, offsetZ]
```

```javascript
rotate: [rotateX, rotateY, rotateZ]
```

```javascript
scale: [scaleX, scaleY, scaleZ]
```
