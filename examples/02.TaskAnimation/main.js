window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('#000080');
  document.body.appendChild(scn);

  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // define an animation class with a task
  function Hoge(parentNode, x, y, z) {
    this.constructor.uber.constructor(); // call parent class's constructor

    this.node1 = DivSugar.createNode();
    this.node1.setPosition(x, y, z);
    parentNode.appendChild(this.node1);

    this.node1.setSize(200, 200).setImage('http://placekitten.com/200/200');

    DivSugar.rootTask.appendChild(this);
  }

  DivSugar.inherit(Hoge, DivSugar.Task);

  Hoge.prototype.onUpdate = function(elapsedTime) {
    this.node1.rotate(0, elapsedTime * 0.1, 0);
  };

  Hoge.prototype.onDestroy = function() {
    this.node1.parentNode.removeChild(this.node1);
  };

  // create instances
  var dummy;
  dummy = new Hoge(scn, 100, 100, 0);
  dummy = new Hoge(scn, 400, 300, -100);
};
