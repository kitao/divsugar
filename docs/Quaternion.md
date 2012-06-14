DivSugar.Quaternion
===================

A quaternion which is represented by xyzw coordinates.

Constructors
------------

### `(DivSugar.Quaternion) Quaternion()`
Constructs a quaternion.

### `(DivSugar.Quaternion) Quaternion(quat)`
Constructs a quaternion and sets the quaternion `quat` to this quaternion.

### `(DivSugar.Quaternion) Quaternion(x, y, z, w)`
Constructs a quaternion and sets the specified components to this quaternion.

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

### `(DivSugar.Quaternion) set(x, y, z, w)`
Sets the specified components to this quaternion.

### `(DivSugar.Quaternion) fromMatrix(mat)`
Builds the quaternion from the matrix `mat` sets to this quaternion.

### `(DivSugar.Quaternion) slerp(to, ratio)`
Interpolates this quaternion to the quaternion `to` by the `ratio`, using spherical linear interpolation.

### `(Boolean) equal(quat)`
Returns whether this quaternion equals the quaternion `quat`.

### `(String) toString()`
Returns the string representation of this quaternion.
