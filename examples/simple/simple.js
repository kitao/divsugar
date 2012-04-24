window.onload = function() {
  "use strict";

  var scene = DivSugar.createScene();
  scene.setSize(600, 400).setPosition(200, 30).setImage('#0000ff');
  document.body.appendChild(scene);

  var sprite = DivSugar.createSprite();
  sprite.setSize(100, 100).setImage('http://placekitten.com/200/200').setPosition(130, 30, 0).setOpacity(0.5).rotateZ(30);
  scene.appendChild(sprite);

  var task = DivSugar.createTask('hoge');
  var vec = new DivSugar.Vector();

  task.onUpdate = function(frameCount) {
    var width = sprite.getWidth();
    var height = sprite.getHeight();

    sprite.setSize(width + 1, height + 1).rotateY(1);

    if (width > 400) {
      this.destroy();
    }
  };

  task.onDestroy = function() {
    sprite.parentNode.removeChild(sprite);
  };

  DivSugar.rootTask.appendChild(task);
};
