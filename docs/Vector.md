DivSugar.Vector
===============

Constants
---------

```javascript
{DivSugar.Vector} ZERO
{DivSugar.Vector} X_UNIT
{DivSugar.Vector} Y_UNIT
{DivSugar.Vector} Z_UNIT
```

Constructors
------------

```javascript
{DivSugar.Vector} Vector()
{DivSugar.Vector} Vector( vec )
{DivSugar.Vector} Vector( x, y, z )
```

Properties
----------

```javascript
{Number} x
{Number} y
{Number} z
```

Methods
-------

```javascript
{Number} norm()
{Number} sqNorm()
{Number} dist( vec )
{Number} sqDist( vec )
{Number} dot( vec )
{Boolean} equal( vec )
{String} toString()
```

```javascript
{DivSugar.Vector} set( vec )
{DivSugar.Vector} set( x, y, z )
{DivSugar.Vector} neg()
{DivSugar.Vector} add( vec )
{DivSugar.Vector} sub( vec )
{DivSugar.Vector} mul( s )
{DivSugar.Vector} div( s )
{DivSugar.Vector} cross( vec )
{DivSugar.Vector} normalize()
{DivSugar.Vector} rotate( rotateX, rotateY, rotateZ )
{DivSugar.Vector} lerp( to, ratio )
{DivSugar.Vector} toLocal( mat )
{DivSugar.Vector} toGlobal( mat )
{DivSugar.Vector} toLocal_noTrans( mat )
{DivSugar.Vector} toGlobal_noTrans( mat )
```
