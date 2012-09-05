class DivSugar.Node
  constructor: (id) ->
    @div = document.createElement 'div'
    @div.id = id if id?
    @div.style.margin = '0px'
    @div.style.padding = '0px'
    @div.style.position = 'absolute'
    @div.style[DivSugar._cssTransformStyle] = 'preserve-3d'
    @div.style[DivSugar._cssTransformOrigin] = '0% 0%'
    @div.sugar = @

    @_transform = new DivSugar.Matrix()
    @_animTasks = []

    @setSize 0, 0
    @setPosition 0, 0, 0
    @setVisible true
    @setBackface true
    @setClip false
    @setOpacity 1
    @setImage null
    @setImageClip 0, 0, 1, 1

  getParent: ->
    parent = @div.parentNode
    if parent? then parent.sugar else null

  append: (child) ->
    @div.appendChild child.div
    return @

  appendTo: (parent) ->
    if parent._rootNode?
      parent._rootNode.div.appendChild @.div
    else
      parent.div.appendChild @.div
    return @

  remove: (child) ->
    @div.removeChild child.div if child.div in @div.childNodes
    return @

  getWidth: -> @_width
  getHeight: -> @_height

  setSize: (width, height) ->
    @_width = width
    @_height = height
    @div.style.width = "#{width.toFixed(DivSugar.NUM_OF_DIGITS)}px"
    @div.style.height = "#{height.toFixed(DivSugar.NUM_OF_DIGITS)}px"
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
    switch arguments.length
      when 1
        vec = x
        @_transform.trans.set vec
      when 3
        @_transform.trans.x = x
        @_transform.trans.y = y
        @_transform.trans.z = z
      else
        throw 'DivSugar: Invalid number of arguments'

    @div.style[DivSugar._cssTransform] = @_transform._toCSSTransform()
    return @

  getTransform: (mat) ->
    mat.set @_transform
    return @

  setTransform: (mat) ->
    @_transform.set mat
    @div.style[DivSugar._cssTransform] = @_transform._toCSSTransform()
    return @

  getVisible: DivSugar.Scene.prototype.getVisible
  setVisible: DivSugar.Scene.prototype.setVisible

  getBackface: -> @_backface

  setBackface: (backface) ->
    @_backface = backface
    @div.style[DivSugar._cssBackfaceVisibility] = if backface then 'visible' else 'hidden'
    return @

  getClip: DivSugar.Scene.prototype.getClip
  setClip: DivSugar.Scene.prototype.setClip

  getOpacity: DivSugar.Scene.prototype.getOpacity
  setOpacity: DivSugar.Scene.prototype.setOpacity

  getImage: DivSugar.Scene.prototype.getImage
  setImage: DivSugar.Scene.prototype.setImage

  getImageClipU1: DivSugar.Scene.prototype.getImageClipU1
  getImageClipV1: DivSugar.Scene.prototype.getImageClipV1
  getImageClipU2: DivSugar.Scene.prototype.getImageClipU2
  getImageClipV2: DivSugar.Scene.prototype.getImageClipV2
  setImageClip: DivSugar.Scene.prototype.setImageClip

  translate: (offsetX, offsetY, offsetZ) ->
    if arguments.length isnt 3
      throw 'DivSugar: Invalid number of arguments'

    @_transform.translate offsetX, offsetY, offsetZ
    @div.style[DivSugar._cssTransform] = @_transform._toCSSTransform()
    return @

  rotate: (angleX, angleY, angleZ) ->
    if arguments.length isnt 3
      throw 'DivSugar: Invalid number of arguments'

    @_transform.rotate angleX, angleY, angleZ
    @div.style[DivSugar._cssTransform] = @_transform._toCSSTransform()
    return @

  rotateAround: (axis, angle) ->
    @_transform.rotateAround axis, angle
    @div.style[DivSugar._cssTransform] = @_transform._toCSSTransform()
    return @

  scale: (scaleX, scaleY, scaleZ) ->
    if arguments.length isnt 3
      throw 'DivSugar: Invalid number of arguments'

    @_transform.scale scaleX, scaleY, scaleZ
    @div.style[DivSugar._cssTransform] = @_transform._toCSSTransform()
    return @

  playAnimation: (animation) ->
    animTask = new DivSugar.Task()
    animTask.animation = animation
    animTask._cmdIndex = 0
    animTask._firstFrame = true
    animTask.onUpdate = => @_updateAnimation animTask
    animTask.onDestroy = => @_destroyAnimation animTask
    animTask.appendTo DivSugar.rootTask
    @_animTasks.push animTask
    return animTask

  _updateAnimation: (animTask) ->
    while animTask.deltaTime > 0
      if animTask._cmdIndex >= animTask.animation.length
        animTask.destroy()
        return

      command = animTask.animation[animTask._cmdIndex]

      switch command[0]
        when 'to'
          if animTask._firstFrame
            animTask._firstFrame = false
            animTask._currentTime = 0
            animTask._totalTime = command[2] ? 0
            animTask._easeFunc = command[3] ? DivSugar.Ease.linear
            animTask._fromTransform = null

            for param, value of command[1]
              switch param
                when 'size'       then animTask._fromSize = [@_width, @_height]
                when 'position'   then animTask._fromPosition = [@_transform.trans.x, @_transform.trans.y, @_transform.trans.z]
                when 'transform'  then animTask._fromTransform ?= new DivSugar.Matrix @_transform
                when 'visible'    then @setVisible value
                when 'backface'   then @setBackface value
                when 'clip'       then @setClip value
                when 'opacity'    then animTask._fromOpacity = @_opacity
                when 'image'      then @setImage value
                when 'imageClip'  then animTask._fromImageClip = [@_imageClipU1, @_imageClipV1, @_imageClipU2, @_imageClipV2]
                when 'translate'  then animTask._fromTransform ?= new DivSugar.Matrix @_transform
                when 'rotate'     then animTask._fromTransform ?= new DivSugar.Matrix @_transform
                when 'scale'      then animTask._fromTransform ?= new DivSugar.Matrix @_transform
                else throw "DivSugar: Unknown animation parameter '#{param}'"

          @_transform.set animTask._fromTransform if animTask._fromTransform?

          if animTask._totalTime > animTask._currentTime + animTask.deltaTime
            animTask._currentTime += animTask.deltaTime
            animTask.deltaTime = 0
          else
            animTask.deltaTime -= animTask._totalTime
            animTask._currentTime = animTask._totalTime
            animTask._cmdIndex++
            animTask._firstFrame = true

          if animTask._totalTime > 0
            a1 = animTask._easeFunc animTask._currentTime / animTask._totalTime
            a0 = 1 - a1
          else
            a1 = 1
            a0 = 0

          for param, value of command[1]
            switch param
              when 'size'
                size = animTask._fromSize
                @setSize size[0] * a0 + value[0] * a1, size[1] * a0 + value[1] * a1
              when 'position'
                pos = animTask._fromPosition
                @setPosition pos[0] * a0 + value[0] * a1, pos[1] * a0 + value[1] * a1, pos[2] * a0 + value[2] * a1
              when 'transform'
                @setTransform DivSugar.Node._tmpMat1.set(@_transform).slerp(value, a1)
              when 'opacity'
                @setOpacity animTask._fromOpacity * a0 + value * a1
              when 'imageClip'
                clip = animTask._fromImageClip
                @setImageClip clip[0] * a0 + value[0] * a1, clip[1]* a0 + value[1] * a1, clip[2] * a0 + value[2] * a1, clip[3] * a0 + value[3] * a1
              when 'translate'
                @translate value[0] * a1, value[1] * a1, value[2] * a1
              when 'rotate'
                @rotate value[0] * a1, value[1] * a1, value[2] * a1
              when 'scale'
                @scale a0 + value[0] * a1, a0 + value[1] * a1, a0 + value[2] * a1

        when 'wait'
          if animTask._firstFrame
            animTask._firstFrame = false
            animTask._waitTime = command[1]

          if animTask._waitTime > animTask.deltaTime
            animTask._waitTime -= animTask.deltaTime
            animTask.deltaTime = 0
          else
            animTask.deltaTime -= animTask._waitTime
            animTask._waitTime = 0
            animTask._cmdIndex++
            animTask._firstFrame = true

        when 'play'
          for i, anim of command
            @playAnimation command[i] if i > 0
          animTask._cmdIndex++
          animTask._firstFrame = true

        when 'call'
          for i, anim of command
            command[i]() if i > 0
          animTask._cmdIndex++
          animTask._firstFrame = true

        when 'repeat'
          animTask._repeatCount = command[1] ? -1 unless animTask._repeatCount?

          if animTask._repeatCount is 0
            animTask._cmdIndex++
            animTask._firstFrame = true
          else
            animTask._repeatCount-- if animTask._repeatCount > 0
            animTask._cmdIndex = 0
            animTask._firstFrame = true

        else
          throw "DivSugar: Unknown animation command '#{command[0]}'"

  _destroyAnimation: (animTask) ->
    index = @_animTasks.indexOf animTask
    @_animTasks.splice index, 1 if index > -1

  clearAnimations: ->
    @_animTasks.shift().destroy() while @_animTasks.length > 0
    return @

  getWorldPosition: (vec) ->
    vec.set @_transform.trans
    parent = @div.parentNode
    while parent? and parent.sugar? and not parent.sugar._isScene?
      vec.toGlobal parent.sugar._transform
      parent = parent.parentNode
    return @

  getWorldTransform: (mat) ->
    mat.set @_transform
    parent = @div.parentNode
    while parent? and parent.sugar? and not parent.sugar._isScene?
      mat.toGlobal parent.sugar._transform
      parent = parent.parentNode
    return @

DivSugar.Node._tmpMat1 = new DivSugar.Matrix()
