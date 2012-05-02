window.onload = function() {
  'use strict';

  // create a scene which is a rendering target of nodes
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('#000080');
  document.body.appendChild(scn);

  // create a parent node used as the center of rotation
  var node1 = DivSugar.createNode();
  node1.setPosition(400, 300, 0);
  scn.appendChild(node1);

  // create a child node render an image and text
  var node2 = DivSugar.createNode();
  node2.setSize(300, 300).setPosition(-150, -150, 200).setImage('http://placekitten.com/300/300');
  node2.innerHTML = '<h1 style="text-align:center">Hello, DivSugar!</h1>';
  node1.appendChild(node2);

  // create a task which rotates the nodes
  var task = DivSugar.createTask();
  task.onUpdate = function(elapsedTime) { node1.rotate(elapsedTime * 0.02, elapsedTime * 0.03, elapsedTime * 0.015); };
  DivSugar.rootTask.appendChild(task);

  // maximize the scene size as possible
  function resize() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); }
  window.addEventListener('resize', resize, false);
  resize();
};
