window.onload = function() {
  'use strict';

  // create a scene which is a rendering target of nodes
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('#000080');
  document.body.appendChild(scn);

  // maximize the scene size as possible
  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // create a parent node used as the center of rotation
  var node1 = DivSugar.createNode();
  node1.setPosition(400, 300, 0);
  scn.appendChild(node1);

  // create a child node render an image and text
  var node2 = DivSugar.createNode();
  node2.setSize(300, 300).setImage('../assets/kitten.jpg').setPosition(-150, -150, 200);
  node2.innerHTML = '<h1 style="text-align:center; color:white; text-shadow:1px 1px black">Hello, DivSugar!</h1>';
  node1.appendChild(node2);

  // create a task which rotates the nodes
  var task = new DivSugar.Task();
  task.onUpdate = function(elapsedTime) { node1.rotate(elapsedTime * 0.01, elapsedTime * 0.05, elapsedTime * -0.015); };
  DivSugar.rootTask.appendChild(task);
};
