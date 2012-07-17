class DivSugar.Scene
  constructor: (id) ->
    @div = document.createElement 'div'
    @div.id = id if id?
    @div.style.margin = '0px'
    @div.style.padding = '0px'
    @div.style.position = 'relative'
    @div.style.overflow = 'hidden'
    @div.sugar = @

    @_isScene = true
    @_viewWidth = 1

    @_centerNode = new DivSugar.Node()
    @_centerNode.div.style[DivSugar._cssTransformOrigin] = '0 0'
    @_centerNode.div.style[DivSugar._cssPerspectiveOrigin] = '0 0'
    @_centerNode.div.sugar = @
    @div.appendChild @_centerNode.div

    @_rootNode = new DivSugar.Node()
    @_rootNode.div.sugar = @
    @_centerNode.div.appendChild @_rootNode.div

    @setViewAngle 45
    @setSize 400, 300
    @setPosition 0, 0
    @setVisible true
    @setClip true
    @setOpacity 1
    @setImage '#0000ff'
    @setImageClip 0, 0, 1, 1

  getParent: -> @div.parentNode

  append: (child) ->
    @_rootNode.div.appendChild child.div
    return @

  appendTo: (parent) ->
    parent.appendChild @.div
    return @

  remove: (child) ->
    @_rootNode.div.removeChild child.div if child.div in @_rootNode.div.childNodes
    return @

  getViewAngle: -> @_viewAngle
  getPerspective: -> @_perspective

  setViewAngle: (viewAngle) ->
    @_viewAngle = viewAngle
    @_perspective = Math.tan((90 - viewAngle / 2) * DivSugar.DEG_TO_RAD) * @_viewWidth / 2
    @_centerNode.div.style[DivSugar._cssPerspective] = "#{@_perspective.toFixed(DivSugar.NUM_OF_DIGITS)}px"
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
    @div.style.width = "#{width.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @div.style.height = "#{height.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @_centerNode.setPosition(width / 2, height / 2, 0)
    @_rootNode.setTransform(DivSugar.Matrix.UNIT).setPosition(-width / 2, -height / 2, 0).scale(width / viewWidth, height / viewHeight, 1)
    @setViewAngle @_viewAngle
    return @

  getPositionX: -> @_positionX
  getPositionY: -> @_positionY

  setPosition: (x, y) ->
    if arguments.length isnt 2
      throw 'DivSugar: Invalid number of arguments'

    @_positionX = x
    @_positionY = y
    @div.style.left = "#{x.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @div.style.top = "#{y.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    return @

  getVisible: -> @_visible

  setVisible: (visible) ->
    @_visible = visible
    @div.style.visibility = if visible then 'visible' else 'hidden'
    return @

  getClip: -> @_clip

  setClip: (clip) ->
    @_clip = clip
    @div.style.overflow = if clip then 'hidden' else 'visible'
    return @

  getOpacity: -> @_opacity

  setOpacity: (opacity) ->
    @_opacity = opacity
    @div.style.opacity = opacity.toFixed DivSugar.NUM_OF_DIGITS
    return @

  getImage: -> @_image

  setImage: (src, callback) ->
    @_image = src

    unless src?
      @div.style.backgroundColor = 'transparent'
      @div.style.backgroundImage = 'none'
    else if src.charAt(0) is '#'
      @div.style.backgroundColor = src
      @div.style.backgroundImage = 'none'
    else
      @div.style.backgroundColor = 'transparent'
      @div.style.backgroundImage = "url(#{src})"
      DivSugar.getImageSize src, callback if callback?

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
    x = if w > 100 then u1 * w / (w - 100) * 100 else 0
    y = if h > 100 then v1 * h / (h - 100) * 100 else 0
    nod = DivSugar.NUM_OF_DIGITS

    @div.style.backgroundPosition = "#{x.toFixed(nod)}% #{y.toFixed(nod)}%"
    @div.style.backgroundSize = "#{w.toFixed(nod)}% #{h.toFixed(nod)}%"

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
      else throw "DivSugar: Unknown layout style '#{style}'"

    @setPosition (parentWidth - @_width) / 2, (parentHeight - @_height) / 2
    return @

  getLocalPosition: (clientX, clientY, vec) ->
    rect = @div.getBoundingClientRect()
    x = (clientX - rect.left) * @_viewWidth / @_width
    y = (clientY - rect.top) * @_viewHeight / @_height
    vec.set x, y, 0
    return @
