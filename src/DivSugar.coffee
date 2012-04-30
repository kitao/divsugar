DivSugar =
  _initialize: ->
    # initialize constants
    @VERSION = '0.10'
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
      @_animationDuration = 'animation-duratino' if not div.style[@_animationDuration]?
      console.log "DivSugar: use '#{@_animationDuration}'"

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

  generateId: -> "_divsugar_id_#{++@_id}"

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

  addCSSAnimation: (name, animation) ->
    @removeCSSAnimation name
    style = document.createElement('style')
    style.innerHTML = "@-#{@_prefix}-keyframes #{name}{"
    nod = @NUM_OF_DIGITS

    for keyframe of animation
      style.innerHTML += "#{keyframe}{"

      transform = null
      width = height = 1
      for property, value of animation[keyframe]

        switch property
          when 'size'
            width = value[0]
            height = value[1]
            style.innerHTML += "width:#{width.toFixed(nod)}px;height:#{height.toFixed(nod)}px;"

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
            w = width / (value[2] - value[0])
            h = height / (value[3] - value[1])
            x = -value[0] * w
            y = -value[1] * h
            style.innerHTML += "background-position:#{x.toFixed(nod)}px #{y.toFixed(nod)}px;"
            style.innerHTML += "background-size:#{w.toFixed(nod)}px #{h.toFixed(nod)}px;"

          when 'transform'
            transform ?= new DivSugar.Matrix()
            if value instanceof DivSugar.Matrix
              transform.set value
            else
              transform.set value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8], value[9], value[10], value[11]

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

(window.DivSugar = DivSugar)._initialize()
