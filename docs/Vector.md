DivSugar.Vector
===============

Constants
---------

```javascript
{DivSugar.Vector} ZERO
```

```javascript
{DivSugar.Vector} X_UNIT
```

```javascript
{DivSugar.Vector} Y_UNIT
```

```javascript
{DivSugar.Vector} Z_UNIT
```

Constructors
------------

```javascript
{DivSugar.Vector} Vector()
```

```javascript
{DivSugar.Vector} Vector( vec )
```

```javascript
{DivSugar.Vector} Vector( x, y, z )
```

Properties
----------

```javascript
{Number} x
```

```javascript
{Number} y
```

```javascript
{Number} z
```

Methods
-------

```javascript
{DivSugar.Vector} set( vec )
```

```javascript
{DivSugar.Vector} set( x, y, z )
```

```javascript
{DivSugar.Vector} neg()
```

```javascript
{DivSugar.Vector} add( vec )
```

```javascript
{DivSugar.Vector} sub( vec )
```

```javascript
{DivSugar.Vector} mul( s )
```

```javascript
{DivSugar.Vector} div( s )
```

```javascript
{Number} norm()
```

```javascript
{Number} sqNorm()
```

```javascript
{Number} dist( vec )
```

```javascript
{Number} sqDist( vec )
```

```javascript
{Number} dot( vec )
```

```javascript
{DivSugar.Vector} cross( vec )
```

```javascript
{DivSugar.Vector} normalize()
```

```javascript
{DivSugar.Vector} rotate( rotateX, rotateY, rotateZ )
```

```javascript
{DivSugar.Vector} lerp( to, ratio )
```

```javascript
{DivSugar.Vector} toLocal( mat )
```

```javascript
{DivSugar.Vector} toGlobal( mat )
```

```javascript
{DivSugar.Vector} toLocal_noTrans( mat )
```

```javascript
{DivSugar.Vector} toGlobal_noTrans( mat )
```

```javascript
{Boolean} equal( vec )
```

```javascript
{String} toString()
```
