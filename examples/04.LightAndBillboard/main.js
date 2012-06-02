window.onload = function() {
  'use strict';

  // create a scene
  var scn = new DivSugar.Scene().setSize(800, 600).setImage('#d0d0d0').appendTo(document.body);

  // maximize the scene size
  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // create the root node and an animation task to rotate the whole scene
  var root = new DivSugar.Node().setPosition(400, 300, 0).rotate(-50, 0, 0).appendTo(scn);
  var task = new DivSugar.Task().appendTo(DivSugar.rootTask);
  task.onUpdate = function() { root.rotate(0, this.deltaTime * 0.02, this.deltaTime * 0.015); };

  // Define a 3D object class which refrects light and has a text billboard
  var mat = new DivSugar.Matrix();
  var lightDir = new DivSugar.Vector(1, 1, -2).normalize();

  function Monolith(name, x, z) {
    this.constructor.uber.constructor();

    this.faces = [];
    this.colors = [];

    this.center = new DivSugar.Node().setPosition(x, 0, z).setOpacity(0.6).rotate(0, Math.random() * 360, 0).appendTo(root);
    for (var i = 0; i < 6; i++) { this.faces[i] = new DivSugar.Node().setImage('#00ff00').appendTo(this.center); }

    var sx = Math.random() * 30 + 30;
    var sy = Math.random() * 100 + 50;
    var sz = Math.random() * 30 + 30;

    this.faces[0].setSize(sx, sy).setPosition(-sx / 2, -sy / 2, sz / 2);
    this.faces[1].setSize(sz, sy).setPosition(sx / 2, -sy / 2, sz / 2).rotate(0, 90, 0);
    this.faces[2].setSize(sx, sy).setPosition(sx / 2, -sy / 2, -sz / 2).rotate(0, 180, 0);
    this.faces[3].setSize(sz, sy).setPosition(-sx / 2, -sy / 2, -sz / 2).rotate(0, 270, 0);
    this.faces[4].setSize(sx, sz).setPosition(-sx / 2, -sy / 2, -sz / 2).rotate(90, 0, 0);
    this.faces[5].setSize(sx, sz).setPosition(-sx / 2, sy / 2, sz / 2).rotate(-90, 0, 0);

    this.label = new DivSugar.Node().setSize(100, 0).appendTo(scn);
    this.label.div.innerHTML = '<h3 style="text-align:center; color:white">' + name + '</h3>';
  }

  DivSugar.inherit(Monolith, DivSugar.Task);

  Monolith.prototype.onUpdate = function() {
    this.center.getWorldTransform(mat);

    // calculate the color of the faces
    this.colors[0] = Math.max(-mat.zAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[1] = Math.max(-mat.xAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[2] = Math.max(mat.zAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[3] = Math.max(mat.xAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[4] = Math.max(mat.yAxis.dot(lightDir), 0) * 191 + 64;
    this.colors[5] = Math.max(-mat.yAxis.dot(lightDir), 0) * 191 + 64;

    for (var i = 0; i < 6; i++) { this.faces[i].setImage(DivSugar.getCSSColor(0, this.colors[i], 0)); }

    // update the position of the text billboard
    this.label.setPosition(mat.trans.x - 50, mat.trans.y - 30, mat.trans.z + 80);
  };

  Monolith.prototype.onDestroy = function() { scn.remove(this.center); };

  // create and register the instances
  var rad;
  for (var i = 0; i < 10; i++) {
    rad = DivSugar.DEG_TO_RAD * 36 * i;
    new Monolith('000' + i, Math.cos(rad) * 200, Math.sin(rad) * 200).appendTo(DivSugar.rootTask);
  }
};
