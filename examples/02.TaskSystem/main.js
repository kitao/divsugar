window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('../assets/sunset.jpg');
  document.body.appendChild(scn);

  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // define an animation class with the task system
  function Coin() {
    // call parent class's constructor
    this.constructor.uber.constructor();

    this.pos = new DivSugar.Vector(Math.random() * 800, 900, Math.random() * 800 - 1000);
    this.vel = new DivSugar.Vector(Math.random() * 6 - 3, Math.random() * 8 - 20, Math.random() * 6 - 3);
    this.rot = new DivSugar.Vector(Math.random() * 0.1, Math.random() * 0.1, Math.random() * 0.1);

    this.center = DivSugar.createNode();
    this.center.setPosition(this.pos).rotate(Math.random() * 360, Math.random() * 360, Math.random() * 360);
    scn.appendChild(this.center);

    this.front = DivSugar.createNode();
    this.front.setSize(200, 200).setImage('../assets/coin.png').setImageClip(0, 0, 0.5, 1).setBackface(false).setPosition(-100, -100, 0);
    this.center.appendChild(this.front);

    this.back = DivSugar.createNode();
    this.back.setSize(200, 200).setImage('../assets/coin.png').setImageClip(0.5, 0, 1, 1).setBackface(false).setPosition(100, -100, 0).rotate(0, 180, 0);
    this.center.appendChild(this.back);

    // register this task to the rootTask to be updated in every frame
    DivSugar.rootTask.appendChild(this);
  }

  // inherit the task class
  DivSugar.inherit(Coin, DivSugar.Task);

  Coin.prototype.onUpdate = function(elapsedTime) {
    this.vel.y += elapsedTime * 0.01;
    this.pos.add(this.vel);
    this.center.setPosition(this.pos).rotate(elapsedTime * this.rot.x, elapsedTime * this.rot.y, elapsedTime * this.rot.z);

    // when fall enough, destroy this task and create an another task
    if (this.pos.y > 1000) {
      this.destroy();
      var dummy = new Coin();
    }
  };

  Coin.prototype.onDestroy = function() { scn.removeChild(this.center); };

  // create instances of the animation class
  var dummy; // for avoiding JSLint warnings
  for (var i = 0; i < 30; i++) { dummy = new Coin(); }
};
