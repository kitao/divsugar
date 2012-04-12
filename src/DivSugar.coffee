DivSugar =
  _initialize: ->
    div = document.createElement 'div'

    @_transform = 'transform'
    @_transformStyle = 'transformStyle'
    @_transformOrigin = 'transformOrigin'
    @_perspective = 'perspective'
    @_perspectiveOrigin = 'perspectiveOrigin'
    @_requestAnimationFrame = window.requestAnimationFrame

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

    if not @_requestAnimationFrame?
      @_requestAnimationFrame = (callback) -> window.setTimeout callback, 1000 / 60

  createScreen: ->
    div = document.createElement 'div'

    for name, func of @_Screen
      div[name] = func

    div._initialize()

  createSprite: ->
    div = document.createElement 'div'

    for name, func of @_Sprite
      div[name] = func

    div._initialize()

  addTask: (callback, tag) ->
    # TODO

  startTask: ->
    @_requestAnimationFrame =>
      # update tasks

(window.DivSugar = DivSugar)._initialize()
