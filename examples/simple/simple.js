window.onload = function() {
  "use strict";

  var screenHolder = document.getElementById('screenHolder');

  var screen = DivSugar.createScreen();
  screen.size(600, 400, 600, 400);
  screenHolder.appendChild(screen);

  screen.style.backgroundColor = "#0000ff";

  var sprite = DivSugar.createSprite();
  sprite.size(100, 100).image("http://placekitten.com/200/200").position(130, 30, 0).opacity(0.5).rotation(30, 30, 0);

  screen.appendChild(sprite);
};
