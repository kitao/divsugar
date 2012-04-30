DivSugar._Scene =
  _initialize: (@id = null) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'relative'
    @style.overflow = 'hidden'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0%'
    @style[DivSugar._perspectiveOrigin] = '50% 50%'

    @setPerspective 1000
    @setSize 100, 100
    @setPosition 0, 0
    @setVisible true
    @setClip true
    @setOpacity 1
    @setImage '#0000ff'
    @setImageClip 0, 0, 1, 1

  getPerspective: -> @_perspective

  setPerspective: (perspective) ->
    @_perspective = perspective
    @style[DivSugar._perspective] = "#{perspective.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    return @

  getWidth: -> @_width
  getHeight: -> @_height
  getViewWidth: -> @_viewWidth
  getViewHeight: -> @_viewHeight

  setSize: (width, height, viewWidth = width, viewHeight = height) ->
    @_width = width
    @_height = height
    @_viewWidth = viewWidth
    @_viewHeight = viewHeight

    x = (width - viewWidth) / 2
    y = (height - viewHeight) / 2
    sx = width / viewWidth
    sy = height / viewHeight
    nod = DivSugar.NUM_OF_DIGITS

    @style.width = "#{viewWidth.toFixed(nod)}px"
    @style.height = "#{viewHeight.toFixed(nod)}px"
    @style[DivSugar._transform] = "translate(#{x.toFixed(nod)}px, #{y.toFixed(nod)}px) scale(#{sx.toFixed(nod)}, #{sy.toFixed(nod)})"

    @setImageClip @_imageClipU1, @_imageClipV1, @_imageClipU2, @_imageClipV2
    return @

  getPositionX: -> @_positionX
  getPositionY: -> @_positionY

  setPosition: (x, y) ->
    @_positionX = x
    @_positionY = y
    @style.left = "#{x.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @style.top = "#{y.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    return @

  getVisible: -> @_visible

  setVisible: (visible) ->
    @_visible = visible
    @style.visibility = if visible then 'visible' else 'hidden'
    return @

  getClip: -> @_clip

  setClip: (clip) ->
    @_clip = clip
    @style.overflow = if clip then 'hidden' else 'visible'
    return @

  getOpacity: -> @_opacity

  setOpacity: (opacity) ->
    @_opacity = opacity
    @style.opacity = opacity.toFixed(DivSugar.NUM_OF_DIGITS)
    return @

  getImage: -> @_image

  setImage: (image) ->
    @_image = image

    if not image?
      @style.backgroundColor = null
      @style.backgroundImage = null
    else if image.charAt(0) is '#'
      @style.backgroundColor = image
      @style.backgroundImage = null
    else
      @style.backgroundColor = null
      @style.backgroundImage = "url(#{image})"

    return @

  getImageClipU1: -> @_imageClipU1
  getImageClipV1: -> @_imageClipV1
  getImageClipU2: -> @_imageClipU2
  getImageClipV2: -> @_imageClipV2

  setImageClip: (u1, v1, u2, v2) ->
    @_imageClipU1 = u1
    @_imageClipV1 = v1
    @_imageClipU2 = u2
    @_imageClipV2 = v2

    w = @_viewWidth / (u2 - u1)
    h = @_viewHeight / (v2 - v1)
    x = -u1 * w
    y = -v1 * h
    nod = DivSugar.NUM_OF_DIGITS

    @style.backgroundPosition = "#{x.toFixed(nod)}px #{y.toFixed(nod)}px"
    @style.backgroundSize = "#{w.toFixed(nod)}px #{h.toFixed(nod)}px"

    return @
