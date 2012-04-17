window.onload = function() {
  "use strict";

  var sceneHolder = document.getElementById('sceneHolder');

  var scene = DivSugar.createScene();
  scene.size(600, 400, 600, 400);
  sceneHolder.appendChild(scene);

  scene.style.backgroundColor = "#0000ff";

  var sprite = DivSugar.createSprite();
  sprite.size(300, 100).image("http://placekitten.com/200/200").position(130, 30, 0).opacity(0.5).rotation(30, 30, 0);

  scene.appendChild(sprite);

  var task = new DivSugar.Task('hoge');
  DivSugar.rootTask.appendChild(task);

  var w = 100;

  task.onUpdate = function() {
    sprite.size(w, w);
    w += 1;

    if (w > 300) {
      this.destroy();
    }
  };

  task.onDestroy = function() {
    sprite.parentNode.removeChild(sprite);
  };
};
