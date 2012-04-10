DivSugar =
  createScreen: ->
    div = document.createElement 'div'

    for name, func of @_Screen
      div[name] = func

    div._initialize()

    return div

  createSprite: ->
    div = document.createElement 'div'

    for name, func of @_Sprite
      div[name] = func

    div._initialize()

    return div

window.DivSugar = DivSugar
