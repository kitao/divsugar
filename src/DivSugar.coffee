DivSugar =
  _initialize: ->
    # initialize constants
    @EPSILON = 0.0001
    @DEG_TO_RAD = Math.PI / 180
    @DEG_TO_RAD = 180 / Math.PI

    # initialize the root task
    @rootTask = null

    # cross-browser support
    @_transform = 'transform'
    @_transformStyle = 'transformStyle'
    @_transformOrigin = 'transformOrigin'
    @_perspective = 'perspective'
    @_perspectiveOrigin = 'perspectiveOrigin'
    @_requestAnimationFrame = 'requestAnimationFrame'

    div = document.createElement 'div'

    for prefix in ['webkit', 'moz', 'ms', 'o']
      transform = prefix + 'Transform'
      @_transform = transform if div.style[transform]?

      transformStyle = prefix + 'TransformStyle'
      @_transformStyle = transformStyle if div.style[transformStyle]?

      transformOrigin = prefix + 'TransformOrigin'
      @_transformOrigin = transformOrigin if div.style[transformOrigin]?

      perspective = prefix + 'Perspective'
      @_perspective = perspective if div.style[perspective]?

      perspectiveOrigin = prefix + 'PerspectiveOrigin'
      @_perspectiveOrigin = perspectiveOrigin if div.style[perspectiveOrigin]?

      requestAnimationFrame = prefix + 'RequestAnimationFrame'
      @_requestAnimationFrame = requestAnimationFrame if window[requestAnimationFrame]?

    if window[@_requestAnimationFrame]?
      requestAnimationFrame = @_requestAnimationFrame
      @_requestAnimationFrame = (callback) =>
        window[requestAnimationFrame] callback
    else
      @_requestAnimationFrame = (callback) ->
        window.setTimeout callback, 1000 / 60 # TBD

    # start tasks
    updateTasks = =>
      @rootTask.update(1) # TBD
      @_requestAnimationFrame updateTasks

    @_requestAnimationFrame updateTasks

  createScene: (args...) ->
    div = document.createElement 'div'

    for name, func of @_Scene
      div[name] = func

    div._initialize args...

    return div

  createSprite: (args...) ->
    div = document.createElement 'div'

    for name, func of @_Sprite
      div[name] = func

    div._initialize args...

    return div

  createTask: (args...) -> new @_Task args...

  createVector: (args...) -> new @_Vector args...

(window.DivSugar = DivSugar)._initialize()
