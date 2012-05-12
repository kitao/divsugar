DivSugar =
  _initialize: ->
    console.log 'DivSugar: a CSS-based 3D graphics library (https://github.com/kitao/divsugar)'

    # initialize constants
    @EPSILON = 0.0001
    @NUM_OF_DIGITS = 4
    @DEG_TO_RAD = Math.PI / 180
    @RAD_TO_DEG = 180 / Math.PI

    # initialize properties
    @_curId = 0
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

      @cssTransform = "-#{@_prefix}-transform"
      @cssTransform = 'transform' unless div.style[@cssTransform]?
      console.log "DivSugar: use '#{@cssTransform}'"

      @cssTransformStyle = "-#{@_prefix}-transform-style"
      @cssTransformStyle = 'transform-style' unless div.style[@cssTransformStyle]?
      console.log "DivSugar: use '#{@cssTransformStyle}'"

      @cssTransformOrigin = "-#{@_prefix}-transform-origin"
      @cssTransformOrigin = 'transform-origin' unless div.style[@cssTransformOrigin]?
      console.log "DivSugar: use '#{@cssTransformOrigin}'"

      @cssPerspective = "-#{@_prefix}-perspective"
      @cssPerspective = 'perspective' unless div.style[@cssPerspective]?
      console.log "DivSugar: use '#{@cssPerspective}'"

      @cssPerspectiveOrigin = "-#{@_prefix}-perspective-origin"
      @cssPerspectiveOrigin = 'perspective-origin' unless div.style[@cssPerspectiveOrigin]?
      console.log "DivSugar: use '#{@cssPerspectiveOrigin}'"

      @cssBackfaceVisibility = "-#{@_prefix}-backface-visibility"
      @cssBackfaceVisibility = 'backface-visibility' unless div.style[@cssBackfaceVisibility]?
      console.log "DivSugar: use '#{@cssBackfaceVisibility}'"

      requestAnimationFrame = @_prefix + 'RequestAnimationFrame'
      requestAnimationFrame = 'requestAnimationFrame' unless window[requestAnimationFrame]?

      if window[requestAnimationFrame]?
        @requestAnimationFrame = (callback) =>
          window[requestAnimationFrame] callback
        console.log "DivSugar: use '#{requestAnimationFrame}'"
      else
        @requestAnimationFrame = (callback) ->
          window.setTimeout callback, 1000 / 60 # TBD
        console.log "DivSugar: use 'setTimeout' instead of 'requestAnimationFrame'"

    # start tasks
    updateTasks = =>
      curTime = (new Date()).getTime()
      elapsedTime = curTime - @_lastUpdatedTime
      @_lastUpdatedTime = curTime
      @rootTask.update elapsedTime
      @requestAnimationFrame updateTasks

    @_lastUpdatedTime = (new Date()).getTime()
    @requestAnimationFrame updateTasks

  inherit: (C, P) ->
    F = ->
    F.prototype = P.prototype
    C.prototype = new F()
    C.uber = P.prototype
    C.prototype.constructor = C
    return @

  generateId: -> "_divsugar_id_#{++@_curId}"

  getImageSize: (src, callback) ->
    image = new Image()
    image.src = src
    image.onload = -> callback(image.width, image.height)
    return @

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

(window.DivSugar = DivSugar)._initialize()
