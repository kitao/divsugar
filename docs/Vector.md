DivSugar.Vector
===============

Constants
---------

```javascript
ZERO
X_UNIT
Y_UNIT
Z_UNIT
```

Constructors
------------

```javascript
Vector()
Vector( vec )
Vector( x, y, z )
```

Properties
----------

```javascript
x
y
z
```

Methods
-------

```javascript
norm()
sqNorm()
dist( vec )
sqDist( vec )
dot( vec )
equal( vec )
toString()
```

```javascript
set( vec )
set( x, y, z )
neg()
add( vec )
sub( vec )
mul( s )
div( s )
cross( vec )
normalize()
rotate( rotateX, rotateY, rotateZ )
lerp( to, ratio )
toLocal( mat )
toGlobal( mat )
toLocal_noTrans( mat )
toGlobal_noTrans( mat )
```
