DivSugar.Matrix
===============

Constants
---------

```javascript
UNIT
```

Constructors
------------

```javascript
Matrix()
Matrix( mat )
Matrix( m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42m, m43 )
```

Properties
----------

```javascript
xAxis
yAxis
zAxis
trans
```

Methods
-------

```javascript
set( mat )
set( m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42m, m43 )
fromQuaternion( quat )
orthonormalize()
translate( offsetX, offsetY, offsetZ )
rotate( rotateX, rotateY, rotateZ )
scale( scaleX, scaleY, scaleZ )
slerp( to, ratio )
slerp_noTrans( to, ratio )
toLocal( mat )
toGlobal( mat )
toLocal_noTrans( mat )
toGlobal_noTrans( mat )
lookAt( from, to, up )
```

```javascript
equal( mat )
toString()
toCSSTransform()
```
