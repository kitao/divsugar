class DivSugar.Task
  constructor: (@id = null) ->
    @active = true
    @onUpdate = null
    @onDestroy = null
    @_parent = null
    @_children = []

  getParent: -> @_parent

  update: (elapsedTime) ->
    if @active
      @onUpdate? elapsedTime

      i = 0
      len = @_children.length
      while i < len
        child = @_children[i]
        if child?
          child.update elapsedTime
          i++
        else
          @_children.splice i, 1
          len--

    return @

  destroy: ->
    @onDestroy?()
    @_parent?.remove this
    child?.destroy() for child in @_children
    return @

  append: (child) ->
    @remove child
    @_children.push child
    child._parent = this
    return @

  appendTo: (parent) ->
    parent.append @
    return @

  remove: (child) ->
    index = @_children.indexOf child
    if index > -1
      @_children[index] = null
      child._parent = null
    return @

  getTaskById: (id) ->
    if @id is id
      return @
    else
      for child in @_children
        if child?
          task = child.getTaskById id
          return task if task?
      return null

DivSugar.rootTask = new DivSugar.Task()
DivSugar.rootTask.isRootTask = true
