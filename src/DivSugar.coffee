DivSugar =
  _initialize: ->
    # initialize constants
    @VERSION = '0.1.0'
    console.log "DivSugar: version #{@VERSION}"

    @EPSILON = 0.0001
    @NUM_OF_DIGITS = 4
    @DEG_TO_RAD = Math.PI / 180
    @RAD_TO_DEG = 180 / Math.PI

    # initialize properties
    @_id = 0
    @_animations = []
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
      @_transform = 'transform' if not div.style[@_transform]?
      console.log "DivSugar: use '#{@_transform}'"

      @_transformStyle = "-#{@_prefix}-transform-style"
      @_transformStyle = 'transform-style' if not div.style[@_transformStyle]?
      console.log "DivSugar: use '#{@_transformStyle}'"

      @_transformOrigin = "-#{@_prefix}-transform-origin"
      @_transformOrigin = 'transform-origin' if not div.style[@_transformOrigin]?
      console.log "DivSugar: use '#{@_transformOrigin}'"

      @_perspective = "-#{@_prefix}-perspective"
      @_perspective = 'perspective' if not div.style[@_perspective]?
      console.log "DivSugar: use '#{@_perspective}'"

      @_perspectiveOrigin = "-#{@_prefix}-perspective-origin"
      @_perspectiveOrigin = 'perspective-origin' if not div.style[@_perspectiveOrigin]?
      console.log "DivSugar: use '#{@_perspectiveOrigin}'"

      @_animationName = "-#{@_prefix}-animation-name"
      @_animationName = 'animation-name' if not div.style[@_animationName]?
      console.log "DivSugar: use '#{@_animationName}'"

      @_animationDuration = "-#{@_prefix}-animation-duration"
      @_animationDuration = 'animation-duration' if not div.style[@_animationDuration]?
      console.log "DivSugar: use '#{@_animationDuration}'"

      @_animationTimingFunction = "-#{@_prefix}-animation-timing-function"
      @_animationTimingFunction = 'animation-timing-function' if not div.style[@_animationTimingFunction]?
      console.log "DivSugar: use '#{@_animationTimingFunction}'"

      @_animationDelay = "-#{@_prefix}-animation-delay"
      @_animationDelay = 'animation-delay' if not div.style[@_animationDelay]?
      console.log "DivSugar: use '#{@_animationDelay}'"

      @_animationIterationCount = "-#{@_prefix}-animation-iteration-count"
      @_animationIterationCount = 'animation-iteration-count' if not div.style[@_animationIterationCount]?
      console.log "DivSugar: use '#{@_animationIterationCount}'"

      @_animationDirection = "-#{@_prefix}-animation-direction"
      @_animationDirection = 'animation-direction' if not div.style[@_animationDirection]?
      console.log "DivSugar: use '#{@_animationDirection}'"

      @_animationFillMode = "-#{@_prefix}-animation-fill-mode"
      @_animationFillMode = 'animation-fill-mode' if not div.style[@_animationFillMode]?
      console.log "DivSugar: use '#{@_animationFillMode}'"

      requestAnimationFrame = @_prefix + 'RequestAnimationFrame'
      requestAnimationFrame = 'requestAnimationFrame' if not window[requestAnimationFrame]?

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

  addCSSAnimation: (name, animation) ->
    @removeCSSAnimation name
    style = document.createElement('style')
    style.innerHTML = "@-#{@_prefix}-keyframes #{name}{"
    nod = @NUM_OF_DIGITS

    for keyframe of animation
      style.innerHTML += "#{keyframe}{"
      transform = null

      for property, value of animation[keyframe]

        switch property
          when 'size'
            style.innerHTML += "width:#{value[0].toFixed(nod)}px;height:#{value[1].toFixed(nod)}px;"

          when 'visible'
            style.innerHTML += "visibility:#{if value then 'visible' else 'hidden'};"

          when 'clip'
            style.innerHTML += "overflow:#{if value then 'hidden' else 'visible'};"

          when 'opacity'
            style.innerHTML += "opacity:#{value.toFixed(nod)};"

          when 'image'
            if not value?
              style.innerHTML += 'background-color:transparent;'
              style.innerHTML += 'background-image:none;'
            else if value.charAt(0) is '#'
              style.innerHTML += "background-color:#{value};"
              style.innerHTML += 'background-image:none;'
            else
              style.innerHTML += 'background-color:transparent;'
              style.innerHTML += "background-image:url(#{value});"

          when 'imageClip'
            w = 1 / (value[2] - value[0]) * 100
            h = 1 / (value[3] - value[1]) * 100
            x = value[0] * w
            y = value[1] * h
            nod = DivSugar.NUM_OF_DIGITS

            style.innerHTML += "background-position:#{x.toFixed(nod)}% #{y.toFixed(nod)}%;"
            style.innerHTML += "background-size:#{w.toFixed(nod)}% #{h.toFixed(nod)}%;"

          when 'transform'
            transform ?= new DivSugar.Matrix()
            transform.set value

          when 'translate'
            transform ?= new DivSugar.Matrix()
            transform.translate value[0], value[1], value[2]

          when 'rotate'
            transform ?= new DivSugar.Matrix()
            transform.rotate value[0], value[1], value[2]

          when 'scale'
            transform ?= new DivSugar.Matrix()
            transform.scale value[0], value[1], value[2]

      if transform?
        style.innerHTML += "#{@_transform}:#{transform.toCSSTransform()};"

      style.innerHTML += '}'

    style.innerHTML += '}'
    document.head.appendChild(style)
    @_animations[name] = style

    console.log "DivSugar: added css animation"
    console.log style.innerHTML

  removeCSSAnimation: (name) ->
    if name of @_animations
      document.head.removeChild @_animations[name]
      delete @_animations[name]

  getImageSize: (src, callback) ->
    image = new Image()
    image.src = src
    image.onload = -> callback(image.width, image.height)

(window.DivSugar = DivSugar)._initialize()
