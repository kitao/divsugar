DivSugar
========

Constants
---------

### `(String) VERSION`
The string of the version of DivSugar

### `(Number) EPSILON`
An extremely small positive quantity

### `(Number) NUM_OF_DIGITS`
The number of digits after decimal point for a fixed-point number

### `(Number) DEG_TO_RAD`
Pi/180

### `(Number) RAD_TO_DEG`
180/Pi

Properties
----------

### `(DivSugar.Task) rootTask`
The root task

Methods
-------

### `(DivSugar) inherit(C, P)`
Makes the child class `C` inherit the parent class `P`.
This method is chainable.

### `(String) generateId()`
Returns a unique ID string.

### `(DivSugar) getImageSize(src, callback)`
Calls the function `callback` with the width and height of the image `src` as two arguments.
This method is chainable.

### `(String) getCSSColor(r, g, b)`
Returns the CSS color string representation of the specified color. The range of each color component is from 0 to 255.
