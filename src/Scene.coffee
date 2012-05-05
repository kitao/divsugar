DivSugar._Scene =
  _initialize: (@id = null) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'relative'
    @style.overflow = 'hidden'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0%'
    @style[DivSugar._perspectiveOrigin] = '50% 50%'

    @_rootNode = DivSugar.createNode 'rootNode'
    @appendChild @_rootNode
    @appendChild = (args...) -> @_rootNode.appendChild args...
    @insertBefore = (args...) -> @_rootNode.insertBefore args...
    @removeChild = (args...) -> @_rootNode.removeChild args...
    @replaceChild = (args...) -> @_rootNode.replaceChild args...

    @setViewAngle 45
    @setSize 400, 300
    @setPosition 0, 0
    @setVisible true
    @setClip true
    @setOpacity 1
    @setImage '#0000ff'
    @setImageClip 0, 0, 1, 1

  getViewAngle: -> @_viewAngle
  getPerspective: -> @_perspective

  setViewAngle: (viewAngle) ->
    @_viewAngle = viewAngle
    @_perspective = Math.tan((90 - viewAngle / 2) * DivSugar.DEG_TO_RAD) * @_viewWidth / 2
    @style[DivSugar._perspective] = "#{@_perspective.toFixed(DivSugar.NUM_OF_DIGITS)}px"
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
    @_rootNode.setTransform(DivSugar.Matrix.UNIT).scale(width / viewWidth, height / viewHeight, 1)
    @setViewAngle @_viewAngle
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

  setImage: (image, callback = null) ->
    @_image = image

    unless image?
      @style.backgroundColor = null
      @style.backgroundImage = null
    else if image.charAt(0) is '#'
      @style.backgroundColor = image
      @style.backgroundImage = null
    else
      @style.backgroundColor = null
      @style.backgroundImage = "url(#{image})"
      DivSugar.getImageSize image, callback if callback?

    return @

  getImageClipU1: -> @_imageClipU1
  getImageClipV1: -> @_imageClipV1
  getImageClipU2: -> @_imageClipU2
  getImageClipV2: -> @_imageClipV2

  setImageClip: (u1, v1, u2, v2) ->
    u1 = if u1 < 0 then 0 else if u1 > 1 then 1 else u1
    v1 = if v1 < 0 then 0 else if v1 > 1 then 1 else v1
    u2 = if u2 < 0 then 0 else if u2 > 1 then 1 else u2
    v2 = if v2 < 0 then 0 else if v2 > 1 then 1 else v2

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

  adjustLayout: (parentWidth, parentHeight, style) ->
    switch style
      when 'center'
        break

      when 'contain'
        if parentWidth < parentHeight * @_viewWidth / @_viewHeight
          @setSize parentWidth, parentWidth * @_viewHeight / @_viewWidth, @_viewWidth, @_viewHeight
        else
          @setSize parentHeight * @_viewWidth / @_viewHeight, parentHeight, @_viewWidth, @_viewHeight

      when 'cover'
        if parentWidth > parentHeight * @_viewWidth / @_viewHeight
          @setSize parentWidth, parentWidth * @_viewHeight / @_viewWidth, @_viewWidth, @_viewHeight
        else
          @setSize parentHeight * @_viewWidth / @_viewHeight, parentHeight, @_viewWidth, @_viewHeight

    @setPosition (parentWidth - @_width) / 2, (parentHeight - @_height) / 2
    return @
