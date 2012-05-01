class DivSugar._Task
  constructor: (@id) ->
    @active = true
    @onUpdate = null
    @onDestroy = null

    @_parent = null
    @_children = []

  getParent: -> @_parent

  update: (elapsedTime) =>
    if @active
      @onUpdate? elapsedTime

      for child in @_children
        child.update elapsedTime

  destroy: ->
    @onDestroy?()
    @_parent?.removeChild this

    for child in @_children
      child.destroy()

  appendChild: (task) ->
    @removeChild task
    @_children.push task
    task._parent = this

  removeChild: (task) ->
    i = @_children.indexOf task
    if i > -1
      @_children.splice i, 1
      task._parent = null
    return @

  getTaskById: (id) ->
    if @id is id
      return @
    else
      for child in @_children
        task = child.getTaskById id
        return task if task?
      return null

DivSugar.rootTask = DivSugar.createTask('rootTask')
