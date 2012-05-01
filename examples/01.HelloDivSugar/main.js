window.onload = function() {
  'use strict';

  var scn = DivSugar.createScene();
  scn.setSize(800, 600);
  document.body.appendChild(scn);

  function resize() { scn.resize(window.innerWidth, window.innerHeight, 'contain'); }
  window.addEventListener('resize', resize, false);
  resize();
};
