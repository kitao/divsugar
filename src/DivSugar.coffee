DivSugar =
  _initialize: ->
    # initialize constants
    @VERSION = '0.9.0'
    @EPSILON = 0.0001
    @NUM_OF_DIGITS = 4
    @DEG_TO_RAD = Math.PI / 180
    @RAD_TO_DEG = 180 / Math.PI

    console.log "DivSugar: version #{@VERSION}"

    # initialize properties
    @_curId = 0
    @rootTask = null

    # cross-browser support
    userAgent = navigator.userAgent.toLowerCase()
    if userAgent.indexOf('safari') > -1 or userAgent.indexOf('chrome') > -1
      @browserPrefix = '-webkit-'
    else if userAgent.indexOf('firefox') > -1
      @browserPrefix = '-moz-'
    else if userAgent.indexOf('opera') > -1
      @browserPrefix = '-o-'
    else if userAgent.indexOf('msie') > -1
      @browserPrefix = '-ms-'
    else
      @browserPrefix = ''
    console.log "DivSugar: use '#{@browserPrefix}' as the prefix"

    div = document.createElement 'div'

    @_cssTransform = @browserPrefix + 'transform'
    @_cssTransform = 'transform' unless @_cssTransform of div.style
    console.log "DivSugar: use '#{@_cssTransform}'"

    @_cssTransformStyle = @browserPrefix + 'transform-style'
    @_cssTransformStyle = 'transform-style' unless @_cssTransformStyle of div.style
    console.log "DivSugar: use '#{@_cssTransformStyle}'"

    @_cssTransformOrigin = @browserPrefix + 'transform-origin'
    @_cssTransformOrigin = 'transform-origin' unless @_cssTransformOrigin of div.style
    console.log "DivSugar: use '#{@_cssTransformOrigin}'"

    @_cssPerspective = @browserPrefix + 'perspective'
    @_cssPerspective = 'perspective' unless @_cssPerspective of div.style
    console.log "DivSugar: use '#{@_cssPerspective}'"

    @_cssPerspectiveOrigin = @browserPrefix + 'perspective-origin'
    @_cssPerspectiveOrigin = 'perspective-origin' unless @_cssPerspectiveOrigin of div.style
    console.log "DivSugar: use '#{@_cssPerspectiveOrigin}'"

    @_cssBackfaceVisibility = @browserPrefix + 'backface-visibility'
    @_cssBackfaceVisibility = 'backface-visibility' unless @_cssBackfaceVisibility of div.style
    console.log "DivSugar: use '#{@_cssBackfaceVisibility}'"

    requestAnimationFrame = @browserPrefix.substring(1, @browserPrefix.length - 1) + 'RequestAnimationFrame'
    requestAnimationFrame = 'requestAnimationFrame' unless requestAnimationFrame of window

    if window[requestAnimationFrame]?
      @_requestAnimationFrame = (callback) => window[requestAnimationFrame] callback
      console.log "DivSugar: use '#{requestAnimationFrame}'"
    else
      @_requestAnimationFrame = (callback) -> window.setTimeout callback, 1000 / 60 # TBD
      console.log "DivSugar: use 'setTimeout' instead of 'requestAnimationFrame'"

    # start tasks
    updateTasks = =>
      curTime = new Date().getTime()
      deltaTime = curTime - @_lastUpdatedTime
      @_lastUpdatedTime = curTime
      @rootTask.update deltaTime
      @_requestAnimationFrame updateTasks

    @_lastUpdatedTime = new Date().getTime()
    @_requestAnimationFrame updateTasks

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
