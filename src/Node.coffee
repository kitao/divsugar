DivSugar._Node =
  _initialize: (@id = null) ->
    @style.margin = '0px'
    @style.padding = '0px'
    @style.position = 'absolute'
    @style[DivSugar._transformStyle] = 'preserve-3d'
    @style[DivSugar._transformOrigin] = '0% 0%'
    @_transform = new DivSugar.Matrix()
    @_animations = []

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

  playAnimation: (commands) ->
    task = new DivSugar.Task()
    animation = { commands: commands, task: task, _elapsedTime: 0, _cmdIndex: 0, _firstFrame: true }
    task.onUpdate = (elapsedTime) => @_updateAnimation elapsedTime, animation
    DivSugar.rootTask.appendChild task
    @_animations.push animation
    return animation

  stopAnimation: (animation = null) ->
    if animation?
      index = @_animations.indexOf animation
      if index > -1
        animation.task.destroy()
        @_animations.splice index, 1
    else
      for animation in @_animations
        animation.task.destroy()
      @_animations = []

    return @

  _updateAnimation: (elapsedTime, animation) ->
    animation._elapsedTime += elapsedTime

    while animation._elapsedTime > 0
      if animation._cmdIndex >= animation.commands.length
        @stopAnimation animation
        return

      command = animation.commands[animation._cmdIndex]

      switch command[0]
        when 'to'
          if animation._firstFrame
            animation._firstFrame = false
            animation._currentTime = 0
            animation._totalTime = command[2] ? 0
            animation._easeFunc = command[3] ? DivSugar.Ease.linear

            for param, value of command[1]
              switch param
                when 'size'       then animation._fromSize = [@_width, @_height]
                when 'position'   then animation._fromPosition = [@_transform.trans.x, @_transform.trans.y, @_transform.trans.z]
                when 'transform'  then animation._fromTransform ?= new DivSugar.Matrix @_transform
                when 'visible'    then @setVisible value
                when 'backface'   then @setBackface value
                when 'clip'       then @setClip value
                when 'opacity'    then animation._fromOpacity = @_opacity
                when 'image'      then @setImage value
                when 'imageClip'  then animation._fromImageClip = [@_imageClipU1, @_imageClipV1, @_imageClipU2, @_imageClipV2]
                when 'translate'  then animation._fromTransform ?= new DivSugar.Matrix @_transform
                when 'rotate'     then animation._fromTransform ?= new DivSugar.Matrix @_transform
                when 'scale'      then animation._fromTransform ?= new DivSugar.Matrix @_transform

          @_transform.set animation._fromTransform if animation._fromImageClip?

          if animation._totalTime > animation._elapsedTime
            animation._currentTime += animation._elapsedTime
            animation._elapsedTime = 0
          else
            animation._currentTime = animation._totalTime
            animation._elapsedTime -= animation._totalTime
            animation._cmdIndex++
            animation._firstFrame = true

          if animation._totalTime > 0
            a1 = animation._easeFunc animation._currentTime / animation._totalTime
            a0 = 1 - a1
          else
            a1 = 1
            a0 = 0

          for param, value of command[1]
            switch param
              when 'size'
                size = animation._fromSize
                @setSize size[0] * a0 + value[0] * a1, size[1] * a0 + value[1] * a1
              when 'position'
                pos = animation._fromPosition
                @setPosition pos[0] * a0 + value[0] * a1, pos[1] * a0 + value[1] * a1, pos[2] * a0 + value[2] * a1
              when 'transform'
                @setTransform DivSugar._Node._tmpMat1.set(@_transform).slerp(value, a1)
              when 'opacity'
                @setOpacity animation._fromOpacity * a0 + value * a1
              when 'imageClip'
                clip = animation._fromImageClip
                @setImageClip clip[0] * a0 + value[0] * a1, clip[1]* a0 + value[1] * a1, clip[2] * a0 + value[2] * a1, clip[3] * a0 + value[3]
              when 'translate'
                @translate value[0] * a1, value[1] * a1, value[2] * a1
              when 'rotate'
                @rotate value[0] * a1, value[1] * a1, value[2] * a1
              when 'scale'
                @scale value[0] * a1, value[1] * a1, value[2] * a1

        when 'wait'
          if animation._firstFrame
            animation._firstFrame = false
            animation._waitTime = command[1]

          if animation._waitTime > animation._elapsedTime
            animation._waitTime -= animation._elapsedTime
            animation._elapsedTime = 0
          else
            animation._elapsedTime -= animation._waitTime
            animation._waitTime = 0
            animation._cmdIndex++
            animation._firstFrame = true

        when 'call'
          command[1]()
          animation._cmdIndex++
          animation._firstFrame = true

DivSugar._Node._tmpMat1 = new DivSugar.Matrix()
