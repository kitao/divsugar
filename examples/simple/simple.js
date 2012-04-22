window.onload = function() {
  "use strict";

  var scene = DivSugar.createScene();
  scene.setSize(600, 400).setPosition(200, 30).setImage('#0000ff');
  document.body.appendChild(scene);

  var sprite = DivSugar.createSprite();
  sprite.setSize(100, 100).setImage('http://placekitten.com/200/200').setPosition(130, 30, 0).setRotation(0, 0, 30).setOpacity(0.5);
  scene.appendChild(sprite);

  var task = DivSugar.createTask('hoge');
  var vec = new DivSugar.Vector();

  task.onUpdate = function(frameCount) {
    var width = sprite.getWidth();
    var height = sprite.getHeight();

    sprite.getRotation(vec);
    vec.y += 1;

    sprite.setSize(width + 1, height + 1).setRotation(vec);

    if (width > 400) {
      this.destroy();
    }
  };

  task.onDestroy = function() {
    sprite.parentNode.removeChild(sprite);
  };

  DivSugar.rootTask.appendChild(task);
};
