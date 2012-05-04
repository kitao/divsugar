DivSugar._Node =
  _initialize: (@id = null) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'absolute'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0%'
    @_transform = new DivSugar.Matrix()

    @setSize 0, 0
    @setPosition 0, 0, 0
    @setVisible true
    @setBackface true
    @setClip false
    @setOpacity 1
    @setImage null
    @setImageClip 0, 0, 1, 1
    @stopCSSAnimation()

  getWidth: -> @_width
  getHeight: -> @_height

  setSize: (width, height) ->
    @_width = width
    @_height = height
    @style.width = "#{width.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @style.height = "#{height.toFixed(DivSugar.NUM_OF_DIGITS)}px"
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

  getBackface: -> @_backface

  setBackface: (backface) ->
    @_backface = backface
    @style[DivSugar._backfaceVisibility] = if backface then 'visible' else 'hidden'
    return @

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
  setImageClip: DivSugar._Scene.setImageClip

  getCSSAnimation: -> @_cssAnimation

  playCSSAnimation: (name, duration, timing = 'ease', delay = 0, count = 1, direction = 'normal', fill = 'both') ->
    @_cssAnimation = name
    @style[DivSugar._animationName] = name
    @style[DivSugar._animationDuration] = "#{duration.toFixed(DivSugar.NUM_OF_DIGITS)}s"
    @style[DivSugar._animationTimingFunction] = timing
    @style[DivSugar._animationDirection] = "#{delay.toFixed(DivSugar.NUM_OF_DIGITS)}s"
    @style[DivSugar._animationIterationCount] = count
    @style[DivSugar._animationDirection] = direction
    @style[DivSugar._animationFillMode] = fill
    return @

  stopCSSAnimation: (name) ->
    @_cssAnimation = null
    @style[DivSugar._animationName] = 'none'
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
