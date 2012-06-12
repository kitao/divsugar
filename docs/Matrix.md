DivSugar.Matrix
===============

Constants
---------

```javascript
{DivSugar.Matrix} UNIT
```

Constructors
------------

```javascript
{DivSugar.Matrix} Matrix()
{DivSugar.Matrix} Matrix( mat )
{DivSugar.Matrix} Matrix( m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42m, m43 )
```

Properties
----------

```javascript
{DivSugar.Vector} xAxis
{DivSugar.Vector} yAxis
{DivSugar.Vector} zAxis
{DivSugar.Vector} trans
```

Methods
-------

```javascript
{DivSugar.Matrix} set( mat )
{DivSugar.Matrix} set( m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42m, m43 )
{DivSugar.Matrix} fromQuaternion( quat )
{DivSugar.Matrix} orthonormalize()
{DivSugar.Matrix} translate( offsetX, offsetY, offsetZ )
{DivSugar.Matrix} rotate( rotateX, rotateY, rotateZ )
{DivSugar.Matrix} scale( scaleX, scaleY, scaleZ )
{DivSugar.Matrix} slerp( to, ratio )
{DivSugar.Matrix} slerp_noTrans( to, ratio )
{DivSugar.Matrix} toLocal( mat )
{DivSugar.Matrix} toGlobal( mat )
{DivSugar.Matrix} toLocal_noTrans( mat )
{DivSugar.Matrix} toGlobal_noTrans( mat )
{DivSugar.Matrix} lookAt( from, to, up )
```

```javascript
{Boolean} equal( mat )
{String} toString()
{String} toCSSTransform2D()
{String} toCSSTransform3D()
```
