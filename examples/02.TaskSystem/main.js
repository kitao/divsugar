window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene()
    .setSize(800, 600)
    .setImage('../assets/sunset.jpg')
    .appendTo(document.body);

  // maximize the scene size as possible
  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // define an animation class with the task system
  function Coin() {
    // call parent class's constructor
    this.constructor.uber.constructor();

    this.vec = new DivSugar.Vector();
    this.pos = new DivSugar.Vector(Math.random() * 800, 900, Math.random() * 800 - 1000);
    this.vel = new DivSugar.Vector(Math.random() * 6 - 3, Math.random() * 8 - 20, Math.random() * 6 - 3);
    this.rot = new DivSugar.Vector(Math.random() * 0.1, Math.random() * 0.1, Math.random() * 0.1);

    this.center = DivSugar.createNode()
      .setPosition(this.pos)
      .rotate(Math.random() * 360, Math.random() * 360, Math.random() * 360)
      .appendTo(scn);

    this.front = DivSugar.createNode()
      .setSize(200, 200)
      .setPosition(-100, -100, 0)
      .setImage('../assets/coin.png')
      .setImageClip(0, 0, 0.5, 1)
      .setBackface(false)
      .appendTo(this.center);

    this.back = DivSugar.createNode()
      .setSize(200, 200)
      .setPosition(100, -100, 0)
      .setImage('../assets/coin.png')
      .setImageClip(0.5, 0, 1, 1)
      .setBackface(false)
      .rotate(0, 180, 0)
      .appendTo(this.center);
  }

  // inherit the task class
  DivSugar.inherit(Coin, DivSugar.Task);

  Coin.prototype.onUpdate = function(elapsedTime) {
    this.vel.y += elapsedTime * 0.01;
    this.pos.add(this.vec.set(this.vel).mul(elapsedTime * 0.06));

    this.center
      .setPosition(this.pos)
      .rotate(elapsedTime * this.rot.x, elapsedTime * this.rot.y, elapsedTime * this.rot.z);

    // when fall enough, destroy this task and create an another task
    if (this.pos.y > 1000) {
      this.destroy();
      new Coin().appendTo(DivSugar.rootTask);
    }
  };

  Coin.prototype.onDestroy = function() { scn.removeChild(this.center); };

  // create and register instances of the animation class
  for (var i = 0; i < 30; i++) { new Coin().appendTo(DivSugar.rootTask); }
};
