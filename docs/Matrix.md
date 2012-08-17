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
Constructs a Matrix.

### `(DivSugar.Matrix) Matrix(mat)`
Constructs a Matrix and sets the Matrix `mat` to it.

### `(DivSugar.Matrix) Matrix(m11, m12, m13, m21, m22, ... m43)`
Constructs a Matrix and sets the specified elements to it.

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
Sets the Matrix `mat` to this Matrix.  
This method is chainable.

### `(DivSugar.Matrix) set(m11, m12, m13, m21, m22, ... m43)`
Sets the specified elements to this Matrix.  
This method is chainable.

### `(DivSugar.Matrix) fromQuaternion(quat)`
Builds the Matrix from the Quaternion `quat` and sets to this Matrix.  
This method is chainable.

### `(DivSugar.Matrix) orthonormalize()`
Orthonormalizes this Matrix.  
This method is chainable.

### `(DivSugar.Matrix) translate(offsetX, offsetY, offsetZ)`
Translates this Matrix along its axes.  
This method is chainable.

### `(DivSugar.Matrix) rotate(angleX, angleY, angleZ)`
Rotates this Matrix by the specified angles in degrees.  
This method is chainable.

### `(DivSugar.Matrix) rotateAround(axis, angle)`
Rotates this Matrix around the Vector `axis` by the `angle` in degrees.  
The length of the `axis` must be 1.  
This method is chainable.

### `(DivSugar.Matrix) scale(scaleX, scaleY, scaleZ)`
Scales this Matrix.  
This method is chainable.

### `(DivSugar.Matrix) slerp(to, ratio)`
Interpolates this Matrix to the Matrix `to` by the `ratio`, using spherical linear interpolation.  
This method is chainable.

### `(DivSugar.Matrix) slerp_noTrans(to, ratio)`
Interpolates this Matrix to the Matrix `to` by the `ratio`, using spherical linear interpolation.  
However, unlike the `slerp` method, the translation of this Matrix is regarded as the zero vector.  
This method is chainable.

### `(DivSugar.Matrix) toLocal(mat)`
Converts this Matrix from in the world coordinate system to in the local coordinate system of the Matrix `mat`.  
This method is chainable.

### `(DivSugar.Matrix) toGlobal(mat)`
Converts this Matrix from in the local coordinate system of the Matrix `mat` to in the world coordinate system.  
This method is chainable.

### `(DivSugar.Matrix) toLocal_noTrans(mat)`
Converts this Matrix from in the world coordinate system to in the local coordinate system of the Matrix `mat`.  
However, unlike the `toLocal` method, the translation of the matrices is regarded as the zero vector.  
This method is chainable.

### `(DivSugar.Matrix) toGlobal_noTrans(mat)`
Converts this Matrix from in the local coordinate system of the Matrix `mat` to in the world coordinate system.  
However, unlike the `toGlobal` method, the translation of the matrices is regarded as the zero vector.  
This method is chainable.

### `(DivSugar.Matrix) lookAt(from, to, up)`
Builds the look-at Matrix and sets to this Matrix.  
This method is chainable.

### `(Boolean) equal(mat)`
Returns whether this Matrix equals the Matrix `mat`.

### `(String) toString()`
Returns the string representation of this Matrix.

### `(String) toCSSTransform2D()`
Returns the CSS matrix string representation of this Matrix.

### `(String) toCSSTransform3D()`
Returns the CSS matrix3d string representation of this Matrix.
