DivSugar.Task
=============

A task which gets updated every frame.

Constructors
------------

### `(DivSugar.Task) Task()`
Constructs a Task.

### `(DivSugar.Task) Task(id)`
Constructs a Task and sets the `id` to it.

Properties
----------

### `(String) id`
The ID string.

### `(Boolean) active`
The flag whether to get updated.

### `(Number) deltaTime`
The time which elapsed after the last update in milliseconds.

### `(Function) onUpdate`
The function which is called when this Task is updated.

### `(Function) onDestroy`
The function which is called when this Task is destroyed.

Methods
-------

### `(DivSugar.Task) getParent()`
Returns the parent Task of this Task.

### `(DivSugar.Task) append(child)`
Appends the `child` Task to this Task.  
This method is chainable.

### `(DivSugar.Task) appendTo(parent)`
Appends this Task to the `parent` Task.  
This method is chainable.

### `(DivSugar.Task) remove(child)`
Removes the `child` Task from this Task.  
This method is chainable.

### `(DivSugar.Task) update(deltaTime)`
Advances this Task and the child Tasks `deltaTime` millseconds.  
Specifically, sets the `deltaTime` property and calls the `onUpdate` method of this Task and the child Tasks.  
This method is chainable.

### `(DivSugar.Task) destroy()`
Removes this Task from the parent Task and calls the `onDestroy` function.  
This method is chainable.

### `(DivSugar.Task) getTaskById(id)`
Gets the Task with the `id` from this Task and the child Tasks.
