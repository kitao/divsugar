DivSugar._Screen =
  _initialize: ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'relative'
    @style.overflow = 'hidden'
    @style.webkitTransformStyle = 'preserve-3d'
    @style.webkitTransformOrigin = '0% 0% 0%'
    @style.webkitPerspectiveOrigin = '0% 0% 0%'

    @_size = {}

    @perspective 500

    return @

  size: (outerW, outerH, innerW, innerH) ->
    if arguments.length == 0
      return @_size
    else
      @_size.outerW = outerW
      @_size.outerH = outerH
      @_size.innerW = innerW
      @_size.innerH = innerH

      @style.width = "#{innerW}px"
      @style.height = "#{innerH}px"
      @style.webkitTransform = "scale(#{outerW / innerW}, #{outerH / innerH})"

      return @

  perspective: (perspective) ->
    if arguments.length == 0
      return @_perspective
    else
      @_perspective = perspective
      @style.webkitPerspective = "#{perspective}px"
      return @

  # getBackgroundColor/setBackgroundColor?
