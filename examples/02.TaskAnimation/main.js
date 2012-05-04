window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('../assets/sunset.jpg');
  document.body.appendChild(scn);

  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // define an animation class with a task
  function Hoge(parentNode, x, y, z) {
    this.constructor.uber.constructor(); // call parent class's constructor

    this.node = DivSugar.createNode();
    this.node.setPosition(x, y, z);
    parentNode.appendChild(this.node);

    this.node1 = DivSugar.createNode();
    this.node1.setSize(200, 200).setImage('../assets/coin.png').setImageClip(0, 0, 0.5, 1).setBackface(false);
    this.node1.setPosition(-100, -100, 0);
    this.node.appendChild(this.node1);

    this.node2 = DivSugar.createNode();
    this.node2.setSize(200, 200).setImage('../assets/coin.png').setImageClip(0.5, 0, 1, 1);
    this.node2.setPosition(100, -100, 0).rotate(0, 180, 0).setBackface(false);
    this.node.appendChild(this.node2);

    DivSugar.rootTask.appendChild(this);
  }

  DivSugar.inherit(Hoge, DivSugar.Task);

  Hoge.prototype.onUpdate = function(elapsedTime) {
    this.node.rotate(0, elapsedTime * 0.15, elapsedTime * 0.1);
  };

  Hoge.prototype.onDestroy = function() {
    this.node.parentNode.removeChild(this.node1);
  };

  // create instances
  var dummy;
  dummy = new Hoge(scn, 100, 300, 400);
  dummy = new Hoge(scn, 400, 300, -100);
};
