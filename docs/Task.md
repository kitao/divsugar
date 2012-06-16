DivSugar.Task
=============

A task which gets updated every frame.

Constructors
------------

### `(DivSugar.Task) Task()`
Constructs a task.

### `(DivSugar.Task) Task(id)`
Constructs a task and sets the `id` to it.

Properties
----------

### `(String) id`
The ID string.

### `(Boolean) active`
The flag whether to get updated automatically.

### `(Number) deltaTime`
The time which elapsed after the last update in milliseconds.

### `(Function) onUpdate`
The function which is called when this task is updated.

### `(Function) onDestroy`
The function which is called when this task is destroyed.

Methods
-------

### `(DivSugar.Task) getParent()`
Returns the parent task of this task.

### `(DivSugar.Task) append(child)`
Appends the `child` task to this task.  
This method is chainable.

### `(DivSugar.Task) appendTo(parent)`
Appends this task to the `parent` task.  
This method is chainable.

### `(DivSugar.Task) remove(child)`
Removes the `child` task from this task.  
This method is chainable.

### `(DivSugar.Task) update(deltaTime)`
Sets this task and the child tasks forward `deltaTime` millseconds.  
Specifically, sets the `deltaTime` property and calls the `onUpdate` method of this task and the child tasks.  
This method is chainable.

### `(DivSugar.Task) destroy()`
Removes this task from the parent task and calls the `onDestroy` function.  
This method is chainable.

### `(DivSugar.Task) getTaskById(id)`
Gets the task with the `id` from this task and the child tasks.
