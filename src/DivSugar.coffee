DivSugar =
  _initialize: ->
    # initialize constants
    @VERSION = '0.10'
    @EPSILON = 0.0001
    @DEG_TO_RAD = Math.PI / 180
    @RAD_TO_DEG = 180 / Math.PI

    # initialize the root task
    @rootTask = null

    # cross-browser support
    do =>
      userAgent = navigator.userAgent.toLowerCase()
      if userAgent.indexOf('safari') > -1 or userAgent.indexOf('chrome') > -1
        @_prefix = 'webkit'
      else if userAgent.indexOf('firefox') > -1
        @_prefix = 'moz'
      else if userAgent.indexOf('opera') > -1
        @_prefix = 'o'
      else if userAgent.indexOf('msie') > -1
        @_prefix = 'ms'
      else
        @_prefix = null

      div = document.createElement 'div'

      transform = @_prefix + 'Transform'
      @_transform = if div.style[transform]? then transform else 'transform'

      transformStyle = @_prefix + 'TransformStyle'
      @_transformStyle = if div.style[transformStyle]? then transformStyle else 'transformStyle'

      transformOrigin = @_prefix + 'TransformOrigin'
      @_transformOrigin = if div.style[transformOrigin]? then transformOrigin else 'transformOrigin'

      perspective = @_prefix + 'Perspective'
      @_perspective = if div.style[perspective]? then perspective else 'perspective'

      perspectiveOrigin = @_prefix + 'PerspectiveOrigin'
      @_perspectiveOrigin = if div.style[perspectiveOrigin]? then perspectiveOrigin else 'perspectiveOrigin'

      requestAnimationFrame = @_prefix + 'RequestAnimationFrame'
      requestAnimationFrame = 'requestAnimationFrame' if not window[requestAnimationFrame]?

      if window[requestAnimationFrame]?
        @_requestAnimationFrame = (callback) =>
          window[requestAnimationFrame] callback
      else
        console.log 'DivSugar: use setTimeout instead of requestAnimationFrame'
        @_requestAnimationFrame = (callback) ->
          window.setTimeout callback, 1000 / 60 # TBD

    # start tasks
    updateTasks = =>
      curTime = (new Date()).getTime()
      elapsedTime = curTime - @_lastUpdatedTime
      @_lastUpdatedTime = curTime
      @rootTask.update elapsedTime
      @_requestAnimationFrame updateTasks

    @_lastUpdatedTime = (new Date()).getTime()
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

  addCSSAnimation: (name) ->
    # TODO
    style = document.createElement('style')
    document.head.appendChild(style)

  removeCSSAnimation: (name) ->
    # TODO

(window.DivSugar = DivSugar)._initialize()
