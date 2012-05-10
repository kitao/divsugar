DivSugar._Node =
  _initialize: (@id = null) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'absolute'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0%'
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

  playAnimation: (animation) ->
    animTask = new DivSugar.Task()
    animTask.animation = animation
    animTask._cmdIndex = 0
    animTask._firstFrame = true
    animTask.onUpdate = (elapsedTime) => @_updateAnimation animTask, elapsedTime
    animTask.onDestroy = => @_destroyAnimation animTask
    DivSugar.rootTask.appendChild animTask
    @_animTasks.push animTask
    return animTask

  _updateAnimation: (animTask, elapsedTime) ->
    while elapsedTime > 0
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

          @_transform.set animTask._fromTransform if animTask._fromImageClip?

          if animTask._totalTime > elapsedTime
            animTask._currentTime += elapsedTime
            elapsedTime = 0
          else
            elapsedTime -= animTask._totalTime
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
                @setTransform DivSugar._Node._tmpMat1.set(@_transform).slerp(value, a1)
              when 'opacity'
                @setOpacity animTask._fromOpacity * a0 + value * a1
              when 'imageClip'
                clip = animTask._fromImageClip
                @setImageClip clip[0] * a0 + value[0] * a1, clip[1]* a0 + value[1] * a1, clip[2] * a0 + value[2] * a1, clip[3] * a0 + value[3]
              when 'translate'
                @translate value[0] * a1, value[1] * a1, value[2] * a1
              when 'rotate'
                @rotate value[0] * a1, value[1] * a1, value[2] * a1
              when 'scale'
                @scale value[0] * a1, value[1] * a1, value[2] * a1

        when 'wait'
          if animTask._firstFrame
            animTask._firstFrame = false
            animTask._waitTime = command[1]

          if animTask._waitTime > elapsedTime
            animTask._waitTime -= elapsedTime
            elapsedTime = 0
          else
            elapsedTime -= animTask._waitTime
            animTask._waitTime = 0
            animTask._cmdIndex++
            animTask._firstFrame = true

        when 'call'
          command[1]()
          animTask._cmdIndex++
          animTask._firstFrame = true

  _destroyAnimation: (animTask) ->
    index = @_animTasks.indexOf animTask
    if index > -1
      @_animTasks.splice index, 1

  clearAnimation: ->
    while @_animTasks.length > 0
      @_animTasks.shift().destroy()
    return @

DivSugar._Node._tmpMat1 = new DivSugar.Matrix()
