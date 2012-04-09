DivSugar =
  _initialize: ->
    #

  createScreen: ->
    div = document.createElement 'div'

    for name, func of @_Screen
      div[name] = func

    div._initialize()

    # parent = document.getElementById(parentId)
    # parent.appendChild(div)

    return div

    createSprite: ->
      div = document.createElement 'div'

      for name, func of @_Sprite
        div[name] = func

      div._initialize()

      return div

DivSugar._initialize()
