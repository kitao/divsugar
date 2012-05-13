window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene()
    .setSize(800, 600)
    .setImage('../assets/sunset.jpg')
    .appendTo(document.body);

  // maximize the scene size as possible
  window.onresize = function() {
    scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain');
  };
  window.onresize();

  //
  var water1 = DivSugar.createNode()
    .setSize(400, 300) .setPosition(0, 0, 0) .setImage('../assets/water.jpg') .setImageClip(0, 0, 0.5, 0.5) .appendTo(scn);

  var water2 = DivSugar.createNode()
    .setSize(400, 300) .setPosition(0, 0, 100) .setImage('../assets/water.jpg') .setImageClip(0, 0, 0.5, 0.5) .setOpacity(0.5) .appendTo(scn);

  water1.playAnimation([
    ['to', { imageClip: [0, 0, 0.5, 0.5] }, 0 ],
    ['to', { imageClip: [0.5, 0.5, 1, 1] }, 10000 ],
    ['repeat']
  ]);

  water2.playAnimation([
    ['to', { imageClip: [0, 0, 0.5, 0.5] }, 0 ],
    ['to', { imageClip: [0.5, 0.5, 1, 1] }, 15000 ],
    ['repeat']
  ]);
};
