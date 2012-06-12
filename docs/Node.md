DivSugar.Node
=============

Constructors
------------

```javascript
{DivSugar.Node} Node()
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
{Number} getWidth()
{Number} getHeight()
{Number} getPositionX()
{Number} getPositionY()
{Number} getPositionZ()
{DivSugar.Node} getPosition( vec )
{DivSugar.Node} getTransform( mat )
{Boolean} getVisible()
{Boolean} getBackface()
{Boolean} getClip()
{Number} getOpacity()
{String} getImage()
{Number} getImageClipU1()
{Number} getImageClipV1()
{Number} getImageClipU2()
{Number} getImageClipV2()
{DivSugar.Node} getWorldPosition( vec )
{DivSugar.Node} getWorldTransform( mat )
```

```javascript
{DivSugar.Node} setSize( width, height )
{DivSugar.Node} setPosition( vec )
{DivSugar.Node} setPosition( x, y, z )
{DivSugar.Node} append( child )
{DivSugar.Node} appendTo( parent )
{DivSugar.Node} remove( child )
{DivSugar.Node} setPosition( x, y, z )
{DivSugar.Node} setTransform( mat ) ->
{DivSugar.Node} setVisible( visible )
{DivSugar.Node} setBackface( backface )
{DivSugar.Node} setClip( clip )
{DivSugar.Node} setOpacity( opacity )
{DivSugar.Node} setImage( src, callback )
{DivSugar.Node} setImageClip( u1, v1, u2, v2 )
{DivSugar.Node} translate( offsetX, offsetY, offsetZ )
{DivSugar.Node} rotate( rotateX, rotateY, rotateZ )
{DivSugar.Node} scale( scaleX, scaleY, scaleZ )
{DivSugar.Task} playAnimation( animation )
{DivSugar.Node} clearAnimation()
```

Animation
------------------

### Commands

```javascript
['to', { prop1: value1, prop2: value2, ... }, time, easeFunc = DivSugar.Ease.linear]
['wait', time]
['play', animation]
['call', func]
['repeat', count = infinite]
```

### Properties for the 'to' command

```javascript
size: [width, height]
position: [x, y, z]
transform: mat
visible: visible
backface: backface
clip: clip
opacity: opacity
image: src
imageClip: [u1, v1, u2, v2]
translate: [offsetX, offsetY, offsetZ]
rotate: [rotateX, rotateY, rotateZ]
scale: [scaleX, scaleY, scaleZ]
```
