window.onload = function() {
  'use strict';

  // create a scene
  var scn = new DivSugar.Scene().setSize(800, 600).setImage('#d0d0d0').appendTo(document.body);

  // maximize the scene size
  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  //
  var root = new DivSugar.Node().appendTo(scn);
  root.setPosition(400, 400, 0).rotate(-40, 40, 0);

  root.playAnimation([
    ['to', { position: [400, 400, 0], rotate: [0, 30, 5] }, 1000],
    ['repeat']
  ]);

  var vec = new DivSugar.Vector();
  var mat = new DivSugar.Matrix();
  var lightDir = new DivSugar.Vector(1, 1, -2).normalize();

  //
  function Box(x, y, z, width, height, depth) {
    this.constructor.uber.constructor();

    this.faces = [];
    this.colors = [];

    this.center = new DivSugar.Node().setPosition(x, y, z).setOpacity(0.6).appendTo(root);

    for (var i = 0; i < 6; i++) {
      this.faces[i] = new DivSugar.Node().setImage('#00ff00').appendTo(this.center);
    }

    this.faces[0].setSize(width, depth).setPosition(-width / 2, -height / 2, -depth / 2).rotate(90, 0, 0);
    this.faces[1].setSize(width, height).setPosition(-width / 2, -height / 2, depth / 2);
    this.faces[2].setSize(depth, height).setPosition(-width / 2, -height / 2, -depth / 2).rotate(0, -90, 0);
    this.faces[3].setSize(width, height).setPosition(width / 2, -height / 2, -depth / 2).rotate(0, 180, 0);
    this.faces[4].setSize(depth, height).setPosition(width / 2, -height / 2, depth / 2).rotate(0, 90, 0);
    this.faces[5].setSize(width, depth).setPosition(-width / 2, height / 2, -depth / 2).rotate(90, 0, 0);

    this.label = new DivSugar.Node().setSize(100, 40).appendTo(scn);
    this.label.div.innerHTML = '<h3 style="text-align:center; color:white">AAAA</h3>';

    this.center.rotate(90, 0, 90);
  }

  DivSugar.inherit(Box, DivSugar.Task);

  Box.prototype.onUpdate = function() {
    this.center.getWorldTransform(mat);

    this.colors[0] = Math.max(mat.yAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[1] = Math.max(-mat.zAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[2] = Math.max(mat.xAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[3] = Math.max(mat.zAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[4] = Math.max(-mat.xAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[5] = Math.max(-mat.yAxis.dot(lightDir), 0) * 191 + 64;

    for (var i = 0; i < 6; i++) {
      this.faces[i].setImage(DivSugar.getCSSColor(0, this.colors[i], 0));
    }

    this.label.setPosition(mat.trans);
    this.label.setPosition(mat.trans.x - this.label.getWidth() / 2, mat.trans.y - this.label.getHeight() / 2, mat.trans.z + 100);
  };

  Box.prototype.onDestroy = function() { scn.remove(this.center); };

  // create and register instances of the animation class
  new Box(0, -150, 0, 100, 80, 100).appendTo(DivSugar.rootTask);
  new Box(150, -200, 0, 40, 60, 50).appendTo(DivSugar.rootTask);
};
