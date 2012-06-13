DivSugar
========

Constants
---------

```javascript
{String} VERSION
  'The string of the version number'
```

```javascript
{Number} EPSILON
  'An extremely small positive quantity'
  'If the difference of two numbers is less than this value, two numbers are considered equal.'
```

```javascript
{Number} NUM_OF_DIGITS
  'The number of digits after decimal point for fixed-point number'
```

```javascript
{Number} DEG_TO_RAD
  'Pi/180'
```

```javascript
{Number} RAD_TO_DEG
  '180/Pi'
```

Properties
----------

```javascript
{DivSugar.Task} rootTask
  'The root task'
```

Methods
-------

```javascript
{DivSugar} inherit( C, P )
  'Makes the child class C inherit the parent class P.'
  'This methods is chainable.'
```

```javascript
{String} generateId()
  'Returns an unique ID string.'
```

```javascript
{DivSugar} getImageSize( src, callback )
  'Calls the callback function with the width and height of the image as two arguments.'
  'This methods is chainable.'
```

```javascript
{String} getCSSColor( r, g, b )
  'Returns the CSS color string like #rrggbb.'
```
