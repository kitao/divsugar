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
```

```javascript
{DivSugar.Matrix} Matrix( mat )
```

```javascript
{DivSugar.Matrix} Matrix( m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42m, m43 )
```

Properties
----------

```javascript
{DivSugar.Vector} xAxis
```

```javascript
{DivSugar.Vector} yAxis
```

```javascript
{DivSugar.Vector} zAxis
```

```javascript
{DivSugar.Vector} trans
```

Methods
-------

```javascript
{DivSugar.Matrix} set( mat )
```

```javascript
{DivSugar.Matrix} set( m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42m, m43 )
```

```javascript
{DivSugar.Matrix} fromQuaternion( quat )
```

```javascript
{DivSugar.Matrix} orthonormalize()
```

```javascript
{DivSugar.Matrix} translate( offsetX, offsetY, offsetZ )
```

```javascript
{DivSugar.Matrix} rotate( rotateX, rotateY, rotateZ )
```

```javascript
{DivSugar.Matrix} scale( scaleX, scaleY, scaleZ )
```

```javascript
{DivSugar.Matrix} slerp( to, ratio )
```

```javascript
{DivSugar.Matrix} slerp_noTrans( to, ratio )
```

```javascript
{DivSugar.Matrix} toLocal( mat )
```

```javascript
{DivSugar.Matrix} toGlobal( mat )
```

```javascript
{DivSugar.Matrix} toLocal_noTrans( mat )
```

```javascript
{DivSugar.Matrix} toGlobal_noTrans( mat )
```

```javascript
{DivSugar.Matrix} lookAt( from, to, up )
```
```javascript
{Boolean} equal( mat )
```

```javascript
{String} toString()
```

```javascript
{String} toCSSTransform2D()
```

```javascript
{String} toCSSTransform3D()
```
