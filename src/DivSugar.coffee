DivSugar =
  _initialize: ->
    # initialize constants
    @VERSION = '1.0.5'
    @EPSILON = 0.0001
    @NUM_OF_DIGITS = 4
    @DEG_TO_RAD = Math.PI / 180
    @RAD_TO_DEG = 180 / Math.PI

    console.log "DivSugar: Version #{@VERSION}"

    # initialize properties
    @rootTask = null
    @_currentId = 0
    @_css3DTransforms = true

    # cross-browser support
    prefixes = ['webkit', 'Moz', 'O', 'ms']
    props = ['transform', 'transformStyle', 'transformOrigin', 'perspective', 'perspectiveOrigin', 'backfaceVisibility']
    div = document.createElement 'div'

    for prop in props
      upperProp = prop.charAt(0).toUpperCase() + prop.substring(1)
      propName = '_css' + upperProp

      if prop of div.style
        @[propName] = prop
      else
        for prefix in prefixes
          prefixProp = prefix + upperProp

          if prefixProp of div.style
            @[propName] = prefixProp
            break

      if @[propName]?
        console.log "DivSugar: Use '#{@[propName]}'"
      else
        console.log "DivSugar: Can't find '#{prop}'"
        @_css3DTransforms = false

    unless @_css3DTransforms
      msg = "DivSugar: CSS 3D Transforms is not supported"
      console.log msg
      alert msg

    if 'requestAnimationFrame' of window
      requestAnimationFrame = 'requestAnimationFrame'
    else
      for prefix in prefixes
        prefixFuncName = prefix.charAt(0).toLowerCase() + prefix.substring(1) + 'RequestAnimationFrame'

        if prefixFuncName of window
          requestAnimationFrame = prefixFuncName
          break

    if requestAnimationFrame?
      @_requestAnimationFrame = (callback) => window[requestAnimationFrame] callback
      console.log "DivSugar: Use '#{requestAnimationFrame}'"
    else
      @_requestAnimationFrame = (callback) -> window.setTimeout callback, 1000 / 60 # TBD
      console.log "DivSugar: Can't find 'requestAnimationFrame'"

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

  generateId: -> "_divsugar_id_#{++@_currentId}"

  getImageSize: (src, callback) ->
    image = new Image()
    image.src = src
    image.onload = -> callback(image.width, image.height)
    return @

  getCSSColor: (r, g, b) ->
    r = Math.floor r + 0.5
    g = Math.floor g + 0.5
    b = Math.floor b + 0.5

    r = if r < 0 then 0 else if r > 255 then 255 else r
    g = if g < 0 then 0 else if g > 255 then 255 else g
    b = if b < 0 then 0 else if b > 255 then 255 else b

    r = r.toString 16
    g = g.toString 16
    b = b.toString 16

    r = '0' + r if r.length <= 1
    g = '0' + g if g.length <= 1
    b = '0' + b if b.length <= 1

    return '#' + r + g + b

(window.DivSugar = DivSugar)._initialize()
