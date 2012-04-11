DivSugar =
  createScreen: ->
    div = document.createElement 'div'

    for name, func of @_Screen
      div[name] = func

    div._initialize()

  createSprite: ->
    div = document.createElement 'div'

    for name, func of @_Sprite
      div[name] = func

    div._initialize()

window.DivSugar = DivSugar
