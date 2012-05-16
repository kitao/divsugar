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
      @cssTransform = 'transform' unless @cssTransform of div.style
      console.log "DivSugar: use '#{@cssTransform}'"

      @cssTransformStyle = "-#{@_prefix}-transform-style"
      @cssTransformStyle = 'transform-style' unless @cssTransformStyle of div.style
      console.log "DivSugar: use '#{@cssTransformStyle}'"

      @cssTransformOrigin = "-#{@_prefix}-transform-origin"
      @cssTransformOrigin = 'transform-origin' unless @cssTransformOrigin of div.style
      console.log "DivSugar: use '#{@cssTransformOrigin}'"

      @cssPerspective = "-#{@_prefix}-perspective"
      @cssPerspective = 'perspective' unless @cssPerspective of div.style
      console.log "DivSugar: use '#{@cssPerspective}'"

      @cssPerspectiveOrigin = "-#{@_prefix}-perspective-origin"
      @cssPerspectiveOrigin = 'perspective-origin' unless @cssPerspectiveOrigin of div.style
      console.log "DivSugar: use '#{@cssPerspectiveOrigin}'"

      @cssBackfaceVisibility = "-#{@_prefix}-backface-visibility"
      @cssBackfaceVisibility = 'backface-visibility' unless @cssBackfaceVisibility of div.style
      console.log "DivSugar: use '#{@cssBackfaceVisibility}'"

      requestAnimationFrame = @_prefix + 'RequestAnimationFrame'
      requestAnimationFrame = 'requestAnimationFrame' unless requestAnimationFrame of window

      if window[requestAnimationFrame]?
        @requestAnimationFrame = (callback) => window[requestAnimationFrame] callback
        console.log "DivSugar: use '#{requestAnimationFrame}'"
      else
        @requestAnimationFrame = (callback) -> window.setTimeout callback, 1000 / 60 # TBD
        console.log "DivSugar: use 'setTimeout' instead of 'requestAnimationFrame'"

    # start tasks
    updateTasks = =>
      curTime = (new Date()).getTime()
      deltaTime = curTime - @_lastUpdatedTime
      @_lastUpdatedTime = curTime
      @rootTask.update deltaTime
      @requestAnimationFrame updateTasks

    @_lastUpdatedTime = new Date().getTime()
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

(window.DivSugar = DivSugar)._initialize()
