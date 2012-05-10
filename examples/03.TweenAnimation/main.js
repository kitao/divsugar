window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('../assets/sunset.jpg');
  document.body.appendChild(scn);

  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();
};
