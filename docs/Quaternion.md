DivSugar.Quaternion
===================

A quaternion which is represented by xyzw coordinates.

Constructors
------------

### `(DivSugar.Quaternion) Quaternion()`
Constructs a quaternion.

### `(DivSugar.Quaternion) Quaternion(quat)`
Constructs a quaternion and sets the quaternion `quat` to it.

### `(DivSugar.Quaternion) Quaternion(x, y, z, w)`
Constructs a quaternion and sets the specified coordinates to it.

Properties
----------

### `(Number) x`
The x-coordinate.

### `(Number) y`
The y-coordinate.

### `(Number) z`
The z-coordinate.

### `(Number) w`
The w-coordinate.

Methods
-------

### `(DivSugar.Quaternion) set(quat)`
Sets the quaternion `quat` to this quaternion.  
This method is chainable.

### `(DivSugar.Quaternion) set(x, y, z, w)`
Sets the specified coordinates to this quaternion.  
This method is chainable.

### `(DivSugar.Quaternion) fromMatrix(mat)`
Builds the quaternion from the matrix `mat` and sets to this quaternion.  
This method is chainable.

### `(DivSugar.Quaternion) slerp(to, ratio)`
Interpolates this quaternion to the quaternion `to` by the `ratio`, using spherical linear interpolation.  
The range of the `ratio` is from 0 to 1.  
This method is chainable.

### `(Boolean) equal(quat)`
Returns whether this quaternion equals the quaternion `quat`.

### `(String) toString()`
Returns the string representation of this quaternion.
