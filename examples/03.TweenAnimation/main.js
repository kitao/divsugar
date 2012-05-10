window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('../assets/sunset.jpg');
  document.body.appendChild(scn);

  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  //
  var node = DivSugar.createNode();
  node.setSize(100, 100).setImage('#ff0000');
  scn.appendChild(node);

  node.playAnimation([
    ['to', { size: [100, 100], position: [400, 200, 0], rotate: [0, 0, 90], scale: [2, 2, 1] }, 1000],
    ['to', { size: [50, 200], position: [0, 0, 0], rotate: [0, 0, -90], scale: [0.5, 0.5, 1] }, 1000],
    ['repeat']
  ]);
};
