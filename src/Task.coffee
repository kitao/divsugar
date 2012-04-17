class DivSugar._Task
  constructor: (@id) ->
    @active = true
    @onUpdate = null
    @onDestroy = null

    @_parent = null
    @_children = []

  update: (frameCount) =>
    if @active
      @onUpdate? frameCount

      for child in @_children
        child.update frameCount

  destroy: ->
    @onDestroy?()
    @_parent.removeChild this

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

DivSugar.rootTask = DivSugar.createTask('root')
