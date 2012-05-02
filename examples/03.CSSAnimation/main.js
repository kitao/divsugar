window.onload = function() {
  'use strict';

  // create a scene which is a rendering target of nodes
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('#000080');
  document.body.appendChild(scn);

  // maximize the scene size as possible
  function resize() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); }
  window.addEventListener('resize', resize, false);
  resize();
};
