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
    @_parent?.removeChild this

    for child in @_children
      child?.destroy()

    return @

  appendChild: (task) ->
    @removeChild task
    @_children.push task
    task._parent = this
    return @

  removeChild: (task) ->
    i = @_children.indexOf task
    if i > -1
      @_children[i] = null
      task._parent = null
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

DivSugar.rootTask = new DivSugar.Task('rootTask')
