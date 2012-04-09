DivSugar._Sprite =
  _initialize: ->
    @_ps = @_rs = @_ss = @_ts = ''

    @setSize 100, 100
    @setPosition 0, 0, 0
    @setRotation 0, 0, 0
    @setScale 1, 1, 1
    @setVisible true
    @setClip false
    @setOpacity 1
    @setImage null
    @setImageClip 0, 0, 1, 1

  getSize: @_size

  setSize: (w, h) ->
    @_size.w = w
    @_size.h = h
    #
    return @

  getPosition: @_position

  setPosition: (x, y, z) ->
    @_position.x = x
    @_position.y = y
    @_position.z = z
    @_ps = "translate(#{x}px, #{y}px, #{z}px) "
    @_ts = @_ps + @_rs + @_ss
    #
    return @

  getRotation: @_rotation

  setRotation: (x, y, z) ->
    @_rotation.x = x
    @_rotation.y = y
    @_rotation.z = z
    @_rs = "rotate(#{x}px, #{y}px, #{z}px) "
    @_ts = @_ps + @_rs + @_ss
    #
    return @

  getScale: @_scale

  setScale: (x, y, z) ->
    @_scale.x = x
    @_scale.y = y
    @_scale.z = z
    @_ss = "scale(#{x}, #{y}, #{z});"
    @_ts = @_ps + @_rs + @_ss
    #
    return @

  getVisible: -> @_visible

  setVisible: (visible) ->
    @_visible = visible
    #
    return @

  getClip: -> @_clip

  setClip: (clip) ->
    @_clip = clip
    #
    return @

  getOpacity: -> @_opacity

  setOpacity: (opacity) ->
    @_opacity = opacity
    #
    return @

  getImage: -> @_image

  setImage: (imageUrl, callback) ->
    @_image = imageUrl
    #
    return @

  getImageClip: -> @_imageClip

  setImageClip: (u1, v1, u2, v2) ->
    @_imageClip.u1 = u1
    @_imageClip.v2 = v2
    @_imageClip.u1 = u1
    @_imageClip.v2 = v2
    #
    return @
