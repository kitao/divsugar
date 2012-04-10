DivSugar._Sprite =
  _initialize: ->
    @style.webkitTransformStyle = 'preserve-3d'
    @style.webkitTransformOrigin = '0% 0% 0%'
    @style.position = 'absolute'

    @_ps = @_rs = @_ss = ''

    @setSize 100, 100
    @setPosition 0, 0, 0
    @setRotation 0, 0, 0
    @setScale 1, 1, 1
    @setVisible true
    @setClip false
    @setOpacity 1
    @setImage null
    @setImageClip 0, 0, 1, 1

  size: (w, h) ->
    switch arguments.length
      when 0
        return @_size

      when 1
        size = w
        @_size = @style.width = size.x
        @_size = @style.height = size.y

      else
        @_size.w = @_style.width = w
        @_size.h = @_style.height = h

    return @

  position: (x, y, z) ->
    switch arguments.length
      when 0
        return @_pos

      when 1
        pos = x
        @_pos.x = pos.x
        @_pos.y = pos.y
        @_pos.z = pos.z
        @_ps = "translate(#{pos.x}px, #{pos.y}px, #{pos.z}px) "

      else
        @_pos.x = x
        @_pos.y = y
        @_pos.z = z
        @_ps = "translate(#{x}px, #{y}px, #{z}px) "

    @style.webkitTransform = @_ps + @_rs + @_ss
    return @

  rotation: (x, y, z) ->
    switch arguments.length
      when 0
        return @_rot

      when 1
        rot = x
        @_rot.x = rot.x
        @_rot.y = rot.y
        @_rot.z = rot.z
        @_rs = "rotate(#{rot.x}px, #{rot.y}px, #{rot.z}px) "

      else
        @_rot.x = x
        @_rot.y = y
        @_rot.z = z
        @_rs = "rotate(#{x}px, #{y}px, #{z}px) "

    @style.webkitTransform = @_ps + @_rs + @_ss
    return @

  scale: (x, y, z) ->
    switch arguments.length
      when 0
        return @_scl

      when 1
        scl = x
        @_scl.x = scl.x
        @_scl.y = scl.y
        @_scl.z = scl.z
        @_ss = "scale(#{scl.x}, #{scl.y}, #{scl.z});"

      else
        @_scl.x = x
        @_scl.y = y
        @_scl.z = z
        @_ss = "scale(#{x}, #{y}, #{z});"

    @style.webkitTransform = @_ps + @_rs + @_ss
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

  image: (imageSrc, onload) ->
    if arguments.length == 0
      return @_image?.src
    else
      @_image = new Image
      @_image.src = imageSrc
      @_image.onload = =>
        @style.backgroundImage = "url(#{@_image.src})"
        onload()
      return @

  imageClip: (u1, v1, u2, v2) ->
    if arguments.length == 0
      return @_imageClip
    else
      @_imageClip.u1 = u1
      @_imageClip.v1 = v1
      @_imageClip.u2 = u2
      @_imageClip.v2 = k2

      w = @_size.w / (u2 - u1)
      h = @_size.h / (v2 - v1)
      x = -u1 * w
      y = -v1 * h
      @style.backgroundPosition = "#{x}px #{y}px"
      @style.backgroundSize = "#{w}px #{h}px"

      return @
