DivSugar.Scene
==============

Constructors
------------

```javascript
{DivSugar.Scene} Scene()
{DivSugar.Scene} Scene( id )
```

Properties
----------

```javascript
{HTMLDivElement} div
```

Methods
-------

```javascript
{HTMLElement} getParent()
{Number} getViewAngle()
{Number} getPerspective()
{Number} getWidth()
{Number} getHeight()
{Number} getViewWidth()
{Number} getViewHeight()
{Number} getPositionX()
{Number} getPositionY()
{Boolean} getVisible()
{Boolean} getClip()
{Number} getOpacity()
{String} getImage()
{Number} getImageClipU1()
{Number} getImageClipV1()
{Number} getImageClipU2()
{Number} getImageClipV2()
{DivSugar.Scene} getLocalPosition( clientX, clientY, vec )
```

```javascript
{DivSugar.Scene} append( child )
{DivSugar.Scene} appendTo( parent )
{DivSugar.Scene} remove( child )
{DivSugar.Scene} setViewAngle( viewAngle )
{DivSugar.Scene} setSize( width, height, viewWidth = width, viewHeight = height )
{DivSugar.Scene} setPosition( x, y )
{DivSugar.Scene} setVisible( visible )
{DivSugar.Scene} setClip( clip )
{DivSugar.Scene} setOpacity( opacity )
{DivSugar.Scene} setImage( src, callback )
{DivSugar.Scene} setImageClip( u1, v1, u2, v2 )
{DivSugar.Scene} adjustLayout( parentWidth, parentHeight, style )
```
