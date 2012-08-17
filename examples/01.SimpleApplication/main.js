window.onload = function() {
  'use strict';

  // create a Scene which is a rendering target of each Node
  var scn = new DivSugar.Scene().setSize(800, 600).setImage('#000080').appendTo(document.body);

  // maximize the Scene size
  function resize() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); }
  window.addEventListener('resize', resize, true);
  resize();

  // create a parent Node used as the center of rotation
  var node1 = new DivSugar.Node().setPosition(400, 300, 0).appendTo(scn);

  // create a child Node which renders an image and a text
  var node2 = new DivSugar.Node().setSize(300, 300).setPosition(-150, -150, 200).setImage('../assets/kitten.jpg').appendTo(node1);
  node2.div.innerHTML = '<h1 style="text-align:center; color:white; text-shadow:1px 1px black">Hello, DivSugar!</h1>';

  // create a Task which rotates the Nodes
  var task = new DivSugar.Task().appendTo(DivSugar.rootTask);
  task.onUpdate = function() { node1.rotate(this.deltaTime * 0.01, this.deltaTime * 0.05, this.deltaTime * -0.015); };
};
