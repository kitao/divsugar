DivSugar =
  _initialize: ->
    # initialize constants
    @EPSILON = 0.0001
    @DEG_TO_RAD = Math.PI / 180
    @DEG_TO_RAD = 180 / Math.PI

    # cross-browser support
    @transform = 'transform'
    @transformStyle = 'transformStyle'
    @transformOrigin = 'transformOrigin'
    @perspective = 'perspective'
    @perspectiveOrigin = 'perspectiveOrigin'
    @requestAnimationFrame = window.requestAnimationFrame

    div = document.createElement 'div'

    for prefix in ['webkit', 'moz', 'ms', 'o']
      transform = prefix + 'Transform'
      @transform = transform if div.style[transform]?

      transformStyle = prefix + 'TransformStyle'
      @transformStyle = transformStyle if div.style[transformStyle]?

      transformOrigin = prefix + 'TransformOrigin'
      @transformOrigin = transformOrigin if div.style[transformOrigin]?

      perspective = prefix + 'Perspective'
      @perspective = perspective if div.style[perspective]?

      perspectiveOrigin = prefix + 'PerspectiveOrigin'
      @perspectiveOrigin = perspectiveOrigin if div.style[perspectiveOrigin]?

      requestAnimationFrame = prefix + 'RequestAnimationFrame'
      @requestAnimationFrame = requestAnimationFrame if window[requestAnimationFrame]?

      if not @requestAnimationFrame?
        @requestAnimationFrame = (callback) ->
          window.setInterval callback, 1000 / 60 # TBD

  createScene: (id = null) ->
    div = document.createElement 'div'

    for name, func of @_Scene
      div[name] = func

    div._initialize(id)

  createSprite: (id = null) ->
    div = document.createElement 'div'

    for name, func of @_Sprite
      div[name] = func

    div._initialize(id)

  addTask: (callback, tag) ->
    # TODO

  startTask: ->
    @_requestAnimationFrame =>
      # update tasks

(window.DivSugar = DivSugar)._initialize()
