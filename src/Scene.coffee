DivSugar._Scene =
  _initialize: (@id) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'relative'
    @style.overflow = 'hidden'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0% 0%'
    @style[DivSugar._perspectiveOrigin] = '0% 0% 0%'

    @_size = {}
    @_pos = {}
    @_imageClip = {}

    @perspective 1000
    @size 100, 100, 100, 100
    @position 0, 0
    @visible true
    @clip true
    @opacity 1
    @image '#0000ff'
    @imageClip 0, 0, 1, 1

    return @

  perspective: (perspective) ->
    if arguments.length == 0
      return @_perspective
    else
      @_perspective = perspective
      @style[DivSugar._perspective] = "#{perspective}px"
      return @

  size: (outerW, outerH, innerW, innerH) ->
    switch arguments.length
      when 0
        return {outerW: @_size.outerW, outerH: @_size.outerH, innerW: @_size.innerW, innerH: @_size.innerH}

      when 1
        size = outerW
        @_size.outerW = size.outerW
        @_size.outerH = size.outerH
        @_size.innerW = size.innerW
        @_size.innerH = size.innerH

      else
        @_size.outerW = outerW
        @_size.outerH = outerH
        @_size.innerW = innerW
        @_size.innerH = innerH

    offsetX = (@_size.outerW - @_size.innerW) / 2 + @_pos.x
    offsetY = (@_size.outerH - @_size.innerH) / 2 + @_pos.y
    scaleX = @_size.outerW / @_size.innerW
    scaleY = @_size.outerH / @_size.innerH

    @style.width = "#{@_size.innerW}px"
    @style.height = "#{@_size.innerH}px"
    @style[DivSugar._transform] = "translate(#{offsetX}px, #{offsetY}px) scale(#{scaleX}, #{scaleY})"

    @imageClip @_imageClip
    return @

  position: (x, y) ->
    switch arguments.length
      when 0
        return {x: @_pos.x, y: @_pos.y}

      when 1
        pos = x
        @_pos.x = pos.x
        @_pos.y = pos.y

      else
        @_pos.x = x
        @_pos.y = y

    @size @_size
    return @

  visible: (visible) ->
    if arguments.length == 0
      return @_visible
    else
      @_visible = visible
      @style.visibility = if visible then "visible" else "hidden"
      return @

  clip: (clip) ->
    if arguments.length == 0
      return @_clip
    else
      @_clip = clip
      @style.overflow = if clip then "hidden" else "visible"
      return @

  opacity: (opacity) ->
    if arguments.length == 0
      return @_opacity
    else
      @_opacity = @style.opacity = opacity
      return @

  image: (imageUrlOrColor) ->
    if arguments.length == 0
      return @_image
    else
      @_image = imageUrlOrColor

      if not imageUrlOrColor?
        @style.backgroundColor = null
        @style.backgroundImage = null
      else if imageUrlOrColor.charAt(0) == '#'
        @style.backgroundColor = imageUrlOrColor
        @style.backgroundImage = null
      else
        @style.backgroundColor = null
        @style.backgroundImage = "url(#{imageUrlOrColor})"

      return @

  imageClip: (u1, v1, u2, v2) ->
    switch arguments.length
      when 0
        return {u1: @_imageClip.u1, v1: @_imageClip.v1, u2: @_imageClip.u2, v2: @_imageClip.v2}

      when 1
        imageClip = u1
        @_imageClip.u1 = imageClip.u1
        @_imageClip.v1 = imageClip.v1
        @_imageClip.u2 = imageClip.u2
        @_imageClip.v2 = imageClip.v2

      else
        @_imageClip.u1 = u1
        @_imageClip.v1 = v1
        @_imageClip.u2 = u2
        @_imageClip.v2 = v2

    w = @_size.w / (@_imageClip.u2 - @_imageClip.u1)
    h = @_size.h / (@_imageClip.v2 - @_imageClip.v1)
    x = -@_imageClip.u1 * w
    y = -@_imageClip.v1 * h

    @style.backgroundPosition = "#{x}px #{y}px"
    @style.backgroundSize = "#{w}px #{h}px"

    return @
