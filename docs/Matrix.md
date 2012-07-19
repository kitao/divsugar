DivSugar.Matrix
===============

A 3x4 matrix which is represented by four vectors.

Constants
---------

### `(DivSugar.Matrix) UNIT`
The unit matrix.

Constructors
------------

### `(DivSugar.Matrix) Matrix()`
Constructs a matrix.

### `(DivSugar.Matrix) Matrix(mat)`
Constructs a matrix and sets the matrix `mat` to it.

### `(DivSugar.Matrix) Matrix(m11, m12, m13, m21, m22, ... m43)`
Constructs a matrix and sets the specified elements to it.

Properties
----------

### `(DivSugar.Vector) xAxis`
The x-axis.

### `(DivSugar.Vector) yAxis`
The y-axis.

### `(DivSugar.Vector) zAxis`
The z-axis.

### `(DivSugar.Vector) trans`
The translation.

Methods
-------

### `(DivSugar.Matrix) set(mat)`
Sets the matrix `mat` to this matrix.  
This method is chainable.

### `(DivSugar.Matrix) set(m11, m12, m13, m21, m22, ... m43)`
Sets the specified elements to this matrix.  
This method is chainable.

### `(DivSugar.Matrix) fromQuaternion(quat)`
Builds the matrix from the quaternion `quat` and sets to this matrix.  
This method is chainable.

### `(DivSugar.Matrix) orthonormalize()`
Orthonormalizes this matrix.  
This method is chainable.

### `(DivSugar.Matrix) translate(offsetX, offsetY, offsetZ)`
Translates this matrix along its axes.  
This method is chainable.

### `(DivSugar.Matrix) rotate(rotateX, rotateY, rotateZ)`
Rotates this matrix the specified angles in degrees.  
This method is chainable.

### `(DivSugar.Matrix) rotateAround(axis, angle)`
Rotates this matrix around the vector `axis` by the `angle` in degrees.  
The length of the `axis` must be 1.  
This method is chainable.

### `(DivSugar.Matrix) rotateAround(point, axis, angle)`
Rotates this matrix around the pivot specified by the vector `point` and vector `axis` by the `angle` in degrees.  
The length of the `axis` must be 1.  
This method is chainable.

### `(DivSugar.Matrix) scale(scaleX, scaleY, scaleZ)`
Scales this matrix.  
This method is chainable.

### `(DivSugar.Matrix) slerp(to, ratio)`
Interpolates this matrix to the matrix `to` by the `ratio`, using spherical linear interpolation.  
This method is chainable.

### `(DivSugar.Matrix) slerp_noTrans(to, ratio)`
Interpolates this matrix to the matrix `to` by the `ratio`, using spherical linear interpolation.  
However, unlike the `slerp` method, the translation of this matrix is regarded as the zero vector.  
This method is chainable.

### `(DivSugar.Matrix) toLocal(mat)`
Converts this matrix from in the world coordinate system to in the local coordinate system of the matrix `mat`.  
This method is chainable.

### `(DivSugar.Matrix) toGlobal(mat)`
Converts this matrix from in the local coordinate system of the matrix `mat` to in the world coordinate system.  
This method is chainable.

### `(DivSugar.Matrix) toLocal_noTrans(mat)`
Converts this matrix from in the world coordinate system to in the local coordinate system of the matrix `mat`.  
However, unlike the `toLocal` method, the translation of the matrices is regarded as the zero vector.  
This method is chainable.

### `(DivSugar.Matrix) toGlobal_noTrans(mat)`
Converts this matrix from in the local coordinate system of the matrix `mat` to in the world coordinate system.  
However, unlike the `toGlobal` method, the translation of the matrices is regarded as the zero vector.  
This method is chainable.

### `(DivSugar.Matrix) lookAt(from, to, up)`
Builds the look-at matrix and sets to this matrix.  
This method is chainable.

### `(Boolean) equal(mat)`
Returns whether this matrix equals the matrix `mat`.

### `(String) toString()`
Returns the string representation of this matrix.

### `(String) toCSSTransform2D()`
Returns the CSS matrix string representation of this matrix.

### `(String) toCSSTransform3D()`
Returns the CSS matrix3d string representation of this matrix.
