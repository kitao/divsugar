DivSugar._Sprite =
  _initialize: (@id = null) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'absolute'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0% 0%'

    @setSize 100, 100
    @setPosition 0, 0, 0
    @setRotation 0, 0, 0
    @setScale 1, 1, 1
    @setVisible true
    @setClip false
    @setOpacity 1
    @setImage null
    @setImageClip 0, 0, 1, 1

  getWidth: -> @_width
  getHeight: -> @_height

  setSize: (width, height) ->
    @_width = width
    @_height = height

    @style.width = "#{width}px"
    @style.height = "#{height}px"

    @setImageClip @_imageClipU1, @_imageClipV1, @_imageClipU2, @_imageClipV2
    return @

  getPositionX: -> @_positionX
  getPositionY: -> @_positionY
  getPositionZ: -> @_positionZ
  getPosicion: (position) ->
    position.x = @_positionX
    position.y = @_positionY
    position.z = @_positionZ

  setPosition: (x, y, z) ->
    if arguments.length == 1
      position = x
      @_positionX = position.x
      @_positionY = position.y
      @_positionZ = position.z
    else
      @_positionX = x
      @_positionY = y
      @_positionZ = z

    @_ps = "translate3d(#{@_positionX}px, #{@_positionY}px, #{@_positionZ}px) "
    @style[DivSugar._transform] = @_ps + @_rs + @_ss

    return @

  getRotationX: -> @_rotationX
  getRotationY: -> @_rotationY
  getRotationZ: -> @_rotationZ
  getRotation: (rotation) ->
    rotation.x = @_rotationX
    rotation.y = @_rotationY
    rotation.z = @_rotationZ

  setRotation: (x, y, z) ->
    if arguments.length == 1
      rotation = x
      @_rotationX = rotation.x
      @_rotationY = rotation.y
      @_rotationZ = rotation.z
    else
      @_rotationX = x
      @_rotationY = y
      @_rotationZ = z

    @_rs = "rotateX(#{@_rotationX}deg) rotateY(#{@_rotationY}deg) rotateZ(#{@_rotationZ}deg) "
    @style[DivSugar._transform] = @_ps + @_rs + @_ss

    return @

  getScaleX: -> @_scaleX
  getScaleY: -> @_scaleX
  getScaleZ: -> @_scaleX
  getScale: (scale) ->
    scale.x = @_scaleX
    scale.y = @_scaleY
    scale.z = @_scaleZ

  setScale: (x, y, z) ->
    if arguments == 1
      scale = x
      @_scaleX = scale.x
      @_scaleY = scale.y
      @_scaleZ = scale.z
    else
      @_scaleX = x
      @_scaleY = y
      @_scaleZ = z

    @_ss = "scale3d(#{@_scaleX}, #{@_scaleY}, #{@_scaleZ})"
    @style[DivSugar._transform] = @_ps + @_rs + @_ss

    return @

  getVisible: DivSugar._Scene.getVisible
  setVisible: DivSugar._Scene.setVisible

  getClip: DivSugar._Scene.getClip
  setClip: DivSugar._Scene.setClip

  getOpacity: DivSugar._Scene.getOpacity
  setOpacity: DivSugar._Scene.setOpacity

  getImage: DivSugar._Scene.getImage
  setImage: DivSugar._Scene.setImage

  getImageClip: DivSugar._Scene.getImageClip

  setImageClip: (u1, v1, u2, v2) ->
    @_imageClipU1 = u1
    @_imageClipV1 = v1
    @_imageClipU2 = u2
    @_imageClipV2 = v2

    w = @_width / (u2 - u1)
    h = @_height / (v2 - v1)
    x = -u1 * w
    y = -v1 * h

    @style.backgroundPosition = "#{x}px #{y}px"
    @style.backgroundSize = "#{w}px #{h}px"

    return @
