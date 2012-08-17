DivSugar
========

The package which provides all of the classes and utility functions of DivSugar.

Constants
---------

### `(String) VERSION`
The string of the version of DivSugar.

### `(Number) EPSILON`
An extremely small positive quantity.

### `(Number) NUM_OF_DIGITS`
The number of digits after decimal point for a fixed-point number used in CSS.

### `(Number) DEG_TO_RAD`
Pi/180.

### `(Number) RAD_TO_DEG`
180/Pi.

Properties
----------

### `(DivSugar.Task) rootTask`
The root Task.

Methods
-------

### `(Number) getFrameCount()`
Returns the number of the elapsed frames from the time when the application started.

### `(Boolean) getKeyState(keyCode, state)`
Returns whether the current state of the key specified by the `keyCode` equals the `state`.  
'on', 'off', 'pressed', and 'released' can be used as a `state`.

### `(Number) getMouseX()`
Returns the x-coordinate of the mouse cursor.

### `(Number) getMouseY()`
Returns the y-coordinate of the mouse cursor.

### `(Boolean) getMouseState(button, state)`
Returns whether the current state of the mouse `button` equals the `state`.  
'on', 'off', 'pressed', and 'released' can be used as a `state`.

### `(DivSugar) inherit(C, P)`
Makes the child class `C` inherit the parent class `P`.  
This method is chainable.

### `(String) generateId()`
Returns a unique ID string.

### `(DivSugar) getImageSize(src, callback)`
Calls the `callback` function with the width and height of the `src` image as two arguments.  
This method is chainable.

### `(String) getCSSColor(r, g, b)`
Returns the CSS color string representation of the specified color.  
The range of each color component is from 0 to 255.
