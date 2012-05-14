window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene().setSize(800, 600).setImage('#000030').appendTo(document.body);

  // maximize the scene size
  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // create the center node
  var center = DivSugar.createNode().setPosition(400, 300, 0).appendTo(scn);
  center.playAnimation([['to', { rotate: [120, 0, -10] }, 5000, DivSugar.Ease.cubicInOut], ['wait', 2000], ['repeat']]);

  // create the banner nodes
  var x, y, z, color, waitTime, moveTime, anim, banner;
  var colors = ['#ffff80', '#ff80ff', '#80ffff', '#ff8080', '#80ff80', '#8080ff'];

  for (var i = 0; i < 40; i++) {
    x = Math.random() * 800 - 800;
    y = Math.random() * 1000 - 500;
    z = Math.random() * 1000 - 500;

    color = colors[Math.floor(Math.random() * 6)];

    waitTime = Math.random() * 5000;
    moveTime = Math.random() * 3000 + 3000;

    anim = [
      ['to', { position: [x + 400, y, z], opacity:   0 }],
      ['to', { position: [x + 200, y, z], opacity: 0.6 }, moveTime / 4],
      ['to', { position: [x - 200, y, z], opacity: 0.6 }, moveTime / 2],
      ['to', { position: [x - 400, y, z], opacity:   0 }, moveTime / 4],
      ['repeat']
    ];

    banner = DivSugar.createNode().setSize(1200, 100).setOpacity(0).rotate(0, 0, Math.random() * 180 - 90).appendTo(center);
    banner.innerHTML = '<h1 style="color:' + color + '; font-size:50px">DivSuar, a CSS-based 3D graphics library</h1>';
    banner.playAnimation([['wait', waitTime], ['play', anim]]);
  }
};
