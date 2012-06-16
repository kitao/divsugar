DivSugar.Vector
===============

A 3-element vector which is represented by xyz coordinates.

Constants
---------

### `(DivSugar.Vector) ZERO`
The zero vector.

### `(DivSugar.Vector) X_UNIT`
The orthonormal x-axis.

### `(DivSugar.Vector) Y_UNIT`
The orthonormal y-axis.

### `(DivSugar.Vector) Z_UNIT`
The orthonormal z-axis.

Constructors
------------

### `(DivSugar.Vector) Vector()`
Constructs a vector.

### `(DivSugar.Vector) Vector(vec)`
Constructs a vector and sets the vector `vec` to it.

### `(DivSugar.Vector) Vector(x, y, z)`
Constructs a vector and sets the specified coordinates to it.

Properties
----------

### `(Number) x`
The x-coordinate.

### `(Number) y`
The y-coordinate.

### `(Number) z`
The z-coordinate.

Methods
-------

### `(DivSugar.Vector) set(vec)`
Sets the vector `vec` to this vector.  
This method is chainable.

### `(DivSugar.Vector) set(x, y, z)`
Sets the specified coordinates to this vector.  
This method is chainable.

### `(DivSugar.Vector) neg()`
Changes the arithmetic sign of this vector.  
This method is chainable.

### `(DivSugar.Vector) add(vec)`
Adds the vector `vec` to this vector.  
This method is chainable.

### `(DivSugar.Vector) sub(vec)`
Subtracts the vector `vec` from this vector.  
This method is chainable.

### `(DivSugar.Vector) mul(s)`
Multiplies this vector with the scalar value `s`.  
This method is chainable.

### `(DivSugar.Vector) div(s)`
Divides this vector by the scalar value `s`.  
This method is chainable.

### `(Number) norm()`
Returns the norm of this vector.

### `(Number) sqNorm()`
Returns the squared norm of this vector.

### `(Number) dist(vec)`
Returns the distance between this vector and the vector `vec`.

### `(Number) sqDist(vec)`
Returns the squared distance between this vector and the vector `vec`.

### `(Number) dot(vec)`
Returns the inner product of this vector and the vector `vec`.

### `(DivSugar.Vector) cross(vec)`
Sets the outer product of this vector and the vector `vec` to this vector.  
This method is chainable.

### `(DivSugar.Vector) normalize()`
Normalizes this vector.  
This method is chainable.

### `(DivSugar.Vector) rotate(rotateX, rotateY, rotateZ)`
Rotates this vector the specified angles in degrees.  
This method is chainable.

### `(DivSugar.Vector) lerp(to, ratio)`
Interpolates this vector to the vector `to` by the `ratio`.  
The range of the `ratio` is from 0 to 1.  
This method is chainable.

### `(DivSugar.Vector) toLocal(mat)`
Converts this vector from in the world coordinate system to in the local coordinate system of the matrix `mat`.  
This method is chainable.

### `(DivSugar.Vector) toGlobal(mat)`
Converts this vector from in the local coordinate system of the matrix `mat` to in the world coordinate system.  
This method is chainable.

### `(DivSugar.Vector) toLocal_noTrans(mat)`
Converts this vector from in the world coordinate system to in the local coordinate system of the matrix `mat`.  
However, unlike the `toLocal` method, the translation of the matrix is regarded as the zero vector.  
This method is chainable.

### `(DivSugar.Vector) toGlobal_noTrans(mat)`
Converts this vector from in the local coordinate system of the matrix `mat` to in the world coordinate system.  
However, unlike the `toGlobal` method, the translation of the matrix is regarded as the zero vector.  
This method is chainable.

### `(Boolean) equal(vec)`
Returns whether this vector equals the vector `vec`.

### `(String) toString()`
Returns the string representation of this vector.
