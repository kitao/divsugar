DivSugar.Matrix
===============

Constants
---------

### `(DivSugar.Matrix) UNIT`
The unit matrix

Constructors
------------

### `(DivSugar.Matrix) Matrix()`
Constructs a matrix.

### `(DivSugar.Matrix) Matrix(mat)`
Constructs a matrix and sets the elements of the specified matrix.

### `(DivSugar.Matrix) Matrix(m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42, m43)`
Constructs a matrix and sets the specified elements.

Properties
----------

### `(DivSugar.Vector) xAxis`
The x-axis

### `(DivSugar.Vector) yAxis`
The y-axis

### `(DivSugar.Vector) zAxis`
The z-axis

### `(DivSugar.Vector) trans`
The translation

Methods
-------

### `(DivSugar.Matrix) set(mat)`
Sets the elements of the specified matrix.
This method is chainable.

### `(DivSugar.Matrix) set(m11, m12, m13, m21, m22, m23, m31, m32, m33, m41, m42, m43)`
Sets the specified elements.
This method is chainable.

### `(DivSugar.Matrix) fromQuaternion(quat)`
Builds the matrix from the quaternion and sets to this matrix.
This method is chainable.

### `(DivSugar.Matrix) orthonormalize()`
Orthonormalizes this matrix.
This method is chainable.

### `(DivSugar.Matrix) translate(offsetX, offsetY, offsetZ)`
Translates this matrix along its axes.
This method is chainable.

### `(DivSugar.Matrix) rotate(rotateX, rotateY, rotateZ)`
Rotates this matrix the specified degrees.
This method is chainable.

### `(DivSugar.Matrix) scale(scaleX, scaleY, scaleZ)`
Scales this matrix.
This method is chainable.

### `(DivSugar.Matrix) slerp(to, ratio)`
Interpolates this matrix to the specified matrix.
This method is chainable.

### `(DivSugar.Matrix) slerp_noTrans(to, ratio)`
Interpolates this matrix to the specified matrix but the translation.
This method is chainable.

### `(DivSugar.Matrix) toLocal(mat)`
Converts this matrix to the local matrix of the specified matrix.
This method is chainable.

### `(DivSugar.Matrix) toGlobal(mat)`
Converts this matrix to the world matrix as the local matrix of the specified matrix.
This method is chainable.

### `(DivSugar.Matrix) toLocal_noTrans(mat)`
Converts this matrix to the local matrix of the specified matrix.
However, the translation of the specified matrix is regarded as the zero vector.
This method is chainable.

### `(DivSugar.Matrix) toGlobal_noTrans(mat)`
Converts this matrix to the world matrix as the local matrix of the specified matrix.
However, the translation of the specified matrix is regarded as the zero vector.

### `(DivSugar.Matrix) lookAt(from, to, up)`
Builds the look-at matrix and sets to this matrix.
This method is chainable.

### `(Boolean) equal(mat)`
Returns whether this matrix equals the specified matrix.

### `(String) toString()`
Returns the string representation of this matrix.

### `(String) toCSSTransform2D()`
Returns the CSS matrix string representation of this matrix.

### `(String) toCSSTransform3D()`
Returns the CSS matrix3d string representation of this matrix.
