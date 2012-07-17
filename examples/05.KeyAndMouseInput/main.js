window.onload = function() {
  'use strict';

  // create a scene
  var scn = new DivSugar.Scene().setSize(800, 600).setImage('#004000').appendTo(document.body);

  // maximize the scene size
  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // TBD
  var task = new DivSugar.Task().appendTo(DivSugar.rootTask);
  task.onUpdate = function() {
    //console.log(DivSugar.getFrameCount());
  };
};
