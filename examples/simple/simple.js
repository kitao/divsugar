window.onload = function() {
  "use strict";

  var sceneHolder = document.getElementById('sceneHolder');

  var scene = DivSugar.createScene();
  scene.size(600, 400, 600, 400);
  sceneHolder.appendChild(scene);

  scene.style.backgroundColor = "#0000ff";

  var sprite = DivSugar.createSprite();
  sprite.size(100, 100).image("http://placekitten.com/200/200").position(130, 30, 0).opacity(0.5).rotation(30, 30, 0);

  scene.appendChild(sprite);


  /*function newTask() {
    var pos = new DivSugar.Vector(0, 0, 0);
    var spr = DivSugar.createSprite();

    spr.size(100, 100).image("hoge").position(0, 0, 0);

    var task = DivSugar.createTask(function() {
      pos.x += 10;
      spr.position(pos);

      if (pos.x > 400) {
        DivSugar.unregisterTask(this);
      }
    });

    DivSugar.tasks.push(task);
  }*/
};
