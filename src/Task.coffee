class DivSugar.Task
  constructor: (@name = null) ->
    @active = true
    @onUpdate = null
    @onDestroy = null

    @_parent = null
    @_children = []

  _update: (frameCount) =>
    if @active
      @onUpdate? frameCount

      for child in @_children
        child._update frameCount

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

  toString: ->
    # TBD

DivSugar.rootTask = new DivSugar.Task
