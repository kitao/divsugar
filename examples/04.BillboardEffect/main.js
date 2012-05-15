window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene().setSize(800, 600).setImage('#000030').appendTo(document.body);

  // maximize the scene size
  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // TODO
};
