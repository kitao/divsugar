DivSugar.Task
=============

Constructors
------------

```javascript
{DivSugar.Task} Task()
{DivSugar.Task} Task( id )
```

Properties
----------

```javascript
{String} id
{Boolean} active
{Number} deltaTime
{Function} onUpdate
{Function} onDestroy
```

Methods
-------

```javascript
{DivSugar.Task} getParent()
{DivSugar.Task} getTaskById( id )
```

```javascript
{DivSugar.Task} append( child )
{DivSugar.Task} appendTo( parent )
{DivSugar.Task} remove( child )
{DivSugar.Task} update( deltaTime )
{DivSugar.Task} destroy()
```
