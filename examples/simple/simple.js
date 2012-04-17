window.onload = function() {
  "use strict";

  var sceneHolder = document.getElementById('sceneHolder');

  var scene = DivSugar.createScene();
  scene.size(600, 400, 300, 200).image('#0000ff').position(100, 100);
  sceneHolder.appendChild(scene);

  var sprite = DivSugar.createSprite();
  sprite.size(100, 100).image("http://placekitten.com/200/200").position(130, 30, 0).opacity(0.5).rotation(0, 0, 30);
  scene.appendChild(sprite);

  var task = DivSugar.createTask('hoge');

  task.onUpdate = function() {
    var size = sprite.size();
    var rot = sprite.rotation();

    sprite.size(size.w + 1, size.h + 1).rotation(rot.x, rot.y + 1, rot.z);

    if (size.w > 400) {
      this.destroy();
    }
  };

  task.onDestroy = function() {
    sprite.parentNode.removeChild(sprite);
  };

  DivSugar.rootTask.appendChild(task);
};
