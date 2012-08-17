DivSugar.Quaternion
===================

A quaternion which is represented by xyzw coordinates.

Constructors
------------

### `(DivSugar.Quaternion) Quaternion()`
Constructs a Quaternion.

### `(DivSugar.Quaternion) Quaternion(quat)`
Constructs a Quaternion and sets the Quaternion `quat` to it.

### `(DivSugar.Quaternion) Quaternion(x, y, z, w)`
Constructs a Quaternion and sets the specified coordinates to it.

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
Sets the Quaternion `quat` to this Quaternion.  
This method is chainable.

### `(DivSugar.Quaternion) set(x, y, z, w)`
Sets the specified coordinates to this Quaternion.  
This method is chainable.

### `(DivSugar.Quaternion) fromMatrix(mat)`
Builds the Quaternion from the Matrix `mat` and sets to this Quaternion.  
This method is chainable.

### `(DivSugar.Quaternion) slerp(to, ratio)`
Interpolates this Quaternion to the Quaternion `to` by the `ratio`, using spherical linear interpolation.  
The range of the `ratio` is from 0 to 1.  
This method is chainable.

### `(Boolean) equal(quat)`
Returns whether this Quaternion equals the Quaternion `quat`.

### `(String) toString()`
Returns the string representation of this Quaternion.
