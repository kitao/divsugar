DivSugar.Node
=============


Constructors
------------

```javascript
Node()
Node( id )
```

Properties
----------

```javascript
div
```

Methods
-------

```javascript
getParent()
getWidth()
getHeight()
getPositionX()
getPositionY()
getPositionZ()
getPosition( vec )
getTransform( mat )
getVisible: DivSugar.Scene.prototype.getVisible
getBackface: -> @_backface
getClip()
getOpacity()
getImage()
getImageClipU1()
getImageClipV1()
getImageClipU2()
getImageClipV2()
getWorldPosition( vec )
getWorldTransform( mat )
```

```javascript
setSize( width, height )
setPosition( vec )
setPosition( x, y, z )
append( child )
appendTo( parent )
remove( child )
setPosition( x, y, z )
setTransform( mat ) ->
setVisible( visible )
setBackface( backface )
setClip( clip )
setOpacity( opacity )
setImage( src, callback )
setImageClip( u1, v1, u2, v2 )
translate( offsetX, offsetY, offsetZ )
rotate( rotateX, rotateY, rotateZ )
scale( scaleX, scaleY, scaleZ )
playAnimation( animation )
clearAnimation()
```
