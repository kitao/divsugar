window.onload = function() {
  "use strict";

  var scn = DivSugar.createScene();
  scn.setSize(600, 400).setPosition(200, 30).setImage('#0000ff');
  document.body.appendChild(scn);

  var spr = DivSugar.createSprite();
  spr.setSize(100, 100).setImage('http://placekitten.com/200/200').setPosition(330, 130, 0).setOpacity(0.5).rotateZ(30);
  scn.appendChild(spr);

  var task = DivSugar.createTask('hoge');
  var vec = new DivSugar.Vector();

  task.onUpdate = function(frameCount) {
    var width = spr.getWidth();
    var height = spr.getHeight();

    spr.setSize(width + 1, height + 1).rotateX(1);

    if (width > 400) {
      this.destroy();
    }
  };

  task.onDestroy = function() {
    spr.parentNode.removeChild(spr);
  };

  DivSugar.rootTask.appendChild(task);
};
