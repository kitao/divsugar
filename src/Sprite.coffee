DivSugar._Sprite =
  _initialize: (@id = null) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'absolute'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0%'
    @_transform = new DivSugar.Matrix()

    @setSize 100, 100
    @setPosition 0, 0, 0
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

    @style.width = "#{width.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @style.height = "#{height.toFixed(DivSugar.NUM_OF_DIGITS)}px"

    @setImageClip @_imageClipU1, @_imageClipV1, @_imageClipU2, @_imageClipV2
    return @

  getPositionX: -> @_transform.trans.x
  getPositionY: -> @_transform.trans.y
  getPositionZ: -> @_transform.trans.z
  getPosition: (vec) ->
    vec.x = @_transform.trans.x
    vec.y = @_transform.trans.y
    vec.z = @_transform.trans.z
    return @

  setPosition: (x, y, z) ->
    if arguments.length is 1
      vec = x
      @_transform.trans.set vec
    else
      @_transform.trans.x = x
      @_transform.trans.y = y
      @_transform.trans.z = z

    @style[DivSugar._transform] = @_transform.toCSSTransform()

    return @

  getTransform: (mat) ->
    mat.set @_transform
    return @

  setTransform: (mat) ->
    @_transform.set mat
    @style[DivSugar._transform] = @_transform.toCSSTransform()
    return @

  getVisible: DivSugar._Scene.getVisible
  setVisible: DivSugar._Scene.setVisible

  getClip: DivSugar._Scene.getClip
  setClip: DivSugar._Scene.setClip

  getOpacity: DivSugar._Scene.getOpacity
  setOpacity: DivSugar._Scene.setOpacity

  getImage: DivSugar._Scene.getImage
  setImage: DivSugar._Scene.setImage

  getImageClipU1: DivSugar._Scene.getImageClipU1
  getImageClipV1: DivSugar._Scene.getImageClipV1
  getImageClipU2: DivSugar._Scene.getImageClipU2
  getImageClipV2: DivSugar._Scene.getImageClipV2

  setImageClip: (u1, v1, u2, v2) ->
    @_imageClipU1 = u1
    @_imageClipV1 = v1
    @_imageClipU2 = u2
    @_imageClipV2 = v2

    w = @_width / (u2 - u1)
    h = @_height / (v2 - v1)
    x = -u1 * w
    y = -v1 * h
    nod = DivSugar.NUM_OF_DIGITS

    @style.backgroundPosition = "#{x.toFixed(nod)}px #{y.toFixed(nod)}px"
    @style.backgroundSize = "#{w.toFixed(nod)}px #{h.toFixed(nod)}px"

    return @

  translate: (offsetX, offsetY, offsetZ) ->
    @_transform.translate offsetX, offsetY, offsetZ
    @style[DivSugar._transform] = @_transform.toCSSTransform()
    return @

  rotate: (rotateX, rotateY, rotateZ) ->
    @_transform.rotate rotateX, rotateY, rotateZ
    @style[DivSugar._transform] = @_transform.toCSSTransform()
    return @

  scale: (scaleX, scaleY, scaleZ) ->
    @_transform.scale scaleX, scaleY, scaleZ
    @style[DivSugar._transform] = @_transform.toCSSTransform()
    return @

  playCSSAnimation: (name, duration) ->
    @style[DivSugar._animationName] = name
    @style[DivSugar._animationDuration] = "#{duration.toFixed(DivSugar.NUM_OF_DIGITS)}s"
