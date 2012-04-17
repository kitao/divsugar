DivSugar._Sprite =
  _initialize: (@id) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'absolute'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0% 0%'

    @_size = {}
    @_pos = {}
    @_rot = {}
    @_scl = {}
    @_imageClip = {}
    @_ps = @_rs = @_ss = ''

    @size 100, 100
    @position 0, 0, 0
    @rotation 0, 0, 0
    @scale 1, 1, 1
    @visible true
    @clip false
    @opacity 1
    @image null
    @imageClip 0, 0, 1, 1

    return @

  size: (w, h) ->
    switch arguments.length
      when 0
        return {w: @_size.w, h: @_size.h}

      when 1
        size = w
        @_size.w = size.w
        @_size.h = size.h

      else
        @_size.w = w
        @_size.h = h

    @style.width = "#{@_size.w}px"
    @style.height = "#{@_size.h}px"

    @imageClip @_imageClip
    return @

  position: (x, y, z) ->
    switch arguments.length
      when 0
        return {x: @_pos.x, y: @_pos.y, z: @_pos.z}

      when 1
        pos = x
        @_pos.x = pos.x
        @_pos.y = pos.y
        @_pos.z = pos.z

      else
        @_pos.x = x
        @_pos.y = y
        @_pos.z = z

    @_ps = "translate3d(#{@_pos.x}px, #{@_pos.y}px, #{@_pos.z}px) "
    @style[DivSugar._transform] = @_ps + @_rs + @_ss
    return @

  rotation: (x, y, z) ->
    switch arguments.length
      when 0
        return {x: @_rot.x, y: @_rot.y, z: @_rot.z}

      when 1
        rot = x
        @_rot.x = rot.x
        @_rot.y = rot.y
        @_rot.z = rot.z

      else
        @_rot.x = x
        @_rot.y = y
        @_rot.z = z

    @_rs = "rotateX(#{@_rot.x}deg) rotateY(#{@_rot.y}deg) rotateZ(#{@_rot.z}deg) "
    @style[DivSugar._transform] = @_ps + @_rs + @_ss
    return @

  scale: (x, y, z) ->
    switch arguments.length
      when 0
        return {x: @_scl.x, y: @_scl.y, z: @_scl.z}

      when 1
        scl = x
        @_scl.x = scl.x
        @_scl.y = scl.y
        @_scl.z = scl.z

      else
        @_scl.x = x
        @_scl.y = y
        @_scl.z = z

    @_ss = "scale3d(#{@_scl.x}, #{@_scl.y}, #{@_scl.z})"
    @style[DivSugar._transform] = @_ps + @_rs + @_ss
    return @

  visible: DivSugar._Scene.visible
  clip: DivSugar._Scene.clip
  opacity: DivSugar._Scene.opacity
  image: DivSugar._Scene.image
  imageClip: DivSugar._Scene.imageClip
