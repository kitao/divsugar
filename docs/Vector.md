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
Constructs a Vector.

### `(DivSugar.Vector) Vector(vec)`
Constructs a Vector and sets the Vector `vec` to it.

### `(DivSugar.Vector) Vector(x, y, z)`
Constructs a Vector and sets the specified coordinates to it.

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
Sets the Vector `vec` to this Vector.  
This method is chainable.

### `(DivSugar.Vector) set(x, y, z)`
Sets the specified coordinates to this Vector.  
This method is chainable.

### `(DivSugar.Vector) neg()`
Changes the arithmetic sign of this Vector.  
This method is chainable.

### `(DivSugar.Vector) add(vec)`
Adds the Vector `vec` to this Vector.  
This method is chainable.

### `(DivSugar.Vector) sub(vec)`
Subtracts the Vector `vec` from this Vector.  
This method is chainable.

### `(DivSugar.Vector) mul(s)`
Multiplies this Vector with the scalar value `s`.  
This method is chainable.

### `(DivSugar.Vector) div(s)`
Divides this Vector by the scalar value `s`.  
This method is chainable.

### `(Number) norm()`
Returns the norm of this Vector.

### `(Number) sqNorm()`
Returns the squared norm of this Vector.

### `(Number) dist(vec)`
Returns the distance between this Vector and the Vector `vec`.

### `(Number) sqDist(vec)`
Returns the squared distance between this Vector and the Vector `vec`.

### `(Number) dot(vec)`
Returns the inner product of this Vector and the Vector `vec`.

### `(DivSugar.Vector) cross(vec)`
Sets the outer product of this Vector and the Vector `vec` to this Vector.  
This method is chainable.

### `(DivSugar.Vector) normalize()`
Normalizes this Vector.  
This method is chainable.

### `(DivSugar.Vector) rotate(rotateX, rotateY, rotateZ)`
Rotates this Vector the specified angles in degrees.  
This method is chainable.

### `(DivSugar.Vector) lerp(to, ratio)`
Interpolates this Vector to the Vector `to` by the `ratio`.  
The range of the `ratio` is from 0 to 1.  
This method is chainable.

### `(DivSugar.Vector) toLocal(mat)`
Converts this Vector from in the world coordinate system to in the local coordinate system of the Matrix `mat`.  
This method is chainable.

### `(DivSugar.Vector) toGlobal(mat)`
Converts this Vector from in the local coordinate system of the Matrix `mat` to in the world coordinate system.  
This method is chainable.

### `(DivSugar.Vector) toLocal_noTrans(mat)`
Converts this Vector from in the world coordinate system to in the local coordinate system of the Matrix `mat`.  
However, unlike the `toLocal` method, the translation of the Matrix is regarded as the zero vector.  
This method is chainable.

### `(DivSugar.Vector) toGlobal_noTrans(mat)`
Converts this Vector from in the local coordinate system of the Matrix `mat` to in the world coordinate system.  
However, unlike the `toGlobal` method, the translation of the Matrix is regarded as the zero vector.  
This method is chainable.

### `(Boolean) equal(vec)`
Returns whether this Vector equals the Vector `vec`.

### `(String) toString()`
Returns the string representation of this Vector.
