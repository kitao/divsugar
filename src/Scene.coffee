DivSugar._Scene =
  _initialize: (@id = null) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'relative'
    @style.overflow = 'hidden'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0%'
    @style[DivSugar._perspectiveOrigin] = '50% 50%'

    @rootNode = DivSugar.createNode 'rootNode'
    @appendChild @rootNode

    @setPerspective 1000
    @setSize 400, 300
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
    @style.width = "#{width.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @style.height = "#{height.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @rootNode.setTransform(DivSugar.Matrix.UNIT).scale(width / viewWidth, height / viewHeight)
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

    w = 1 / (u2 - u1) * 100
    h = 1 / (v2 - v1) * 100
    x = u1 * w
    y = v1 * h
    nod = DivSugar.NUM_OF_DIGITS

    @style.backgroundPosition = "#{x.toFixed(nod)}% #{y.toFixed(nod)}%"
    @style.backgroundSize = "#{w.toFixed(nod)}% #{h.toFixed(nod)}%"

    return @

  resize: (width, height, mode) ->
    if @parentNode?
      switch mode
        when 'center'
          break

        when 'contain'
          if width < height * @_viewWidth / @_viewHeight
            @setSize width, width * @_viewHeight / @_viewWidth, @_viewWidth, @_viewHeight
          else
            @setSize height * @_viewWidth / @_viewHeight, height, @_viewWidth, @_viewHeight

        when 'cover'
          if width > height * @_viewWidth / @_viewHeight
            @setSize width, width * @_viewHeight / @_viewWidth, @_viewWidth, @_viewHeight
          else
            @setSize height * @_viewWidth / @_viewHeight, height, @_viewWidth, @_viewHeight

      @setPosition (width - @_width) / 2, (height - @_height) / 2

    return @
