DivSugar =
  _initialize: ->
    # initialize constants
    console.log 'DivSugar: a CSS-based 3D graphics library (https://github.com/kitao/divsugar)'

    @EPSILON = 0.0001
    @NUM_OF_DIGITS = 4
    @DEG_TO_RAD = Math.PI / 180
    @RAD_TO_DEG = 180 / Math.PI

    # initialize properties
    @_id = 0
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
      console.log "DivSugar: use '#{@_prefix}' as prefix"

      div = document.createElement 'div'

      @_transform = "-#{@_prefix}-transform"
      @_transform = 'transform' unless div.style[@_transform]?
      console.log "DivSugar: use '#{@_transform}'"

      @_transformStyle = "-#{@_prefix}-transform-style"
      @_transformStyle = 'transform-style' unless div.style[@_transformStyle]?
      console.log "DivSugar: use '#{@_transformStyle}'"

      @_transformOrigin = "-#{@_prefix}-transform-origin"
      @_transformOrigin = 'transform-origin' unless div.style[@_transformOrigin]?
      console.log "DivSugar: use '#{@_transformOrigin}'"

      @_perspective = "-#{@_prefix}-perspective"
      @_perspective = 'perspective' unless div.style[@_perspective]?
      console.log "DivSugar: use '#{@_perspective}'"

      @_perspectiveOrigin = "-#{@_prefix}-perspective-origin"
      @_perspectiveOrigin = 'perspective-origin' unless div.style[@_perspectiveOrigin]?
      console.log "DivSugar: use '#{@_perspectiveOrigin}'"

      @_backfaceVisibility = "-#{@_prefix}-backface-visibility"
      @_backfaceVisibility = 'backface-visibility' unless div.style[@_backfaceVisibility]?
      console.log "DivSugar: use '#{@_backfaceVisibility}'"

      requestAnimationFrame = @_prefix + 'RequestAnimationFrame'
      requestAnimationFrame = 'requestAnimationFrame' unless window[requestAnimationFrame]?

      if window[requestAnimationFrame]?
        @_requestAnimationFrame = (callback) =>
          window[requestAnimationFrame] callback
        console.log "DivSugar: use '#{requestAnimationFrame}'"
      else
        @_requestAnimationFrame = (callback) ->
          window.setTimeout callback, 1000 / 60 # TBD
        console.log "DivSugar: use 'setTimeout' instead of 'requestAnimationFrame'"

    # start tasks
    updateTasks = =>
      curTime = (new Date()).getTime()
      elapsedTime = curTime - @_lastUpdatedTime
      @_lastUpdatedTime = curTime
      @rootTask.update elapsedTime
      @_requestAnimationFrame updateTasks

    @_lastUpdatedTime = (new Date()).getTime()
    @_requestAnimationFrame updateTasks

  inherit: (C, P) ->
    F = ->
    F.prototype = P.prototype
    C.prototype = new F()
    C.uber = P.prototype
    C.prototype.constructor = C
    return @

  generateId: -> "_divsugar_id_#{++@_id}"

  createScene: (args...) ->
    div = document.createElement 'div'

    for name, func of @_Scene
      div[name] = func

    div._initialize args...

    return div

  createNode: (args...) ->
    div = document.createElement 'div'

    for name, func of @_Node
      div[name] = func

    div._initialize args...

    return div

  getImageSize: (src, callback) ->
    image = new Image()
    image.src = src
    image.onload = -> callback(image.width, image.height)
    return @

(window.DivSugar = DivSugar)._initialize()
