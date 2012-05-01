window.onload = function() {
  'use strict';

  var scn = DivSugar.createScene();
  scn.setSize(640, 480);
  document.body.appendChild(scn);

  var resize = function() {
    scn.resize('contain');
  };
  window.addEventListener('resize', resize, false);
  resize();
};
