DivSugar.Matrix
===============

Constants
---------

```javascript
{DivSugar.Matrix} UNIT
  'The unit matrix'
```

Constructors
------------

```javascript
{DivSugar.Matrix} Matrix()
  'Constructs a matrix.'
```

```javascript
{DivSugar.Matrix} Matrix( mat )
  'Constructs a matrix and sets the elements of the specified matrix.'
```

```javascript
{DivSugar.Matrix} Matrix( m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42, m43 )
  'Constructs a matrix and sets the specified elements.'
```

Properties
----------

```javascript
{DivSugar.Vector} xAxis
  'The x-axis'
```

```javascript
{DivSugar.Vector} yAxis
  'The y-axis'
```

```javascript
{DivSugar.Vector} zAxis
  'The z-axis'
```

```javascript
{DivSugar.Vector} trans
  'The translation'
```

Methods
-------

```javascript
{DivSugar.Matrix} set( mat )
  'Sets the elements of the specified matrix.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} set( m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42, m43 )
  'Sets the specified elements.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} fromQuaternion( quat )
  'Builds the matrix from the quaternion and sets to this matrix.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} orthonormalize()
  'Orthonormalizes this matrix.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} translate( offsetX, offsetY, offsetZ )
  'Translates this matrix along its axes.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} rotate( rotateX, rotateY, rotateZ )
  'Rotates this matrix the specified degrees.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} scale( scaleX, scaleY, scaleZ )
  'Scales this matrix.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} slerp( to, ratio )
  'Interpolates this matrix to the specified matrix.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} slerp_noTrans( to, ratio )
  'Interpolates this matrix to the specified matrix but the translation.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} toLocal( mat )
  'Converts this matrix to the local matrix of the specified matrix.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} toGlobal( mat )
  'Converts this matrix to the world matrix as the local matrix of the specified matrix.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} toLocal_noTrans( mat )
  'Converts this matrix to the local matrix of the specified matrix.'
  'However, the translation of the specified matrix is regarded as the zero vector.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} toGlobal_noTrans( mat )
  'Converts this matrix to the world matrix as the local matrix of the specified matrix.'
  'However, the translation of the specified matrix is regarded as the zero vector.'
  'This method is chainable.'
```

```javascript
{DivSugar.Matrix} lookAt( from, to, up )
  'Builds the look-at matrix and sets to this matrix.'
  'This method is chainable.'
```
```javascript
{Boolean} equal( mat )
  'Returns whether this matrix equals the specified matrix.'
```

```javascript
{String} toString()
  'Returns the string representation of this matrix.'
```

```javascript
{String} toCSSTransform2D()
  'Returns the CSS matrix string representation of this matrix.'
```

```javascript
{String} toCSSTransform3D()
  'Returns the CSS matrix3d string representation of this matrix.'
```
