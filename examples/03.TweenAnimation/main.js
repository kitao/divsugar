window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene().setSize(800, 600).setImage('#000030').appendTo(document.body);

  // maximize the scene size as possible
  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // create the center node
  var center = DivSugar.createNode().setPosition(400, 300, 0).appendTo(scn);
  center.playAnimation([['to', { rotate: [360, 0, -10] }, 10000], ['repeat']]);

  // create banner nodes
  var colors = ['#ffff80', '#ff80ff', '#80ffff', '#ff8080', '#80ff80', '#8080ff'];

  function createBanner(waitTime, x, y, z, color) {
    var banner = DivSugar.createNode().setSize(1200, 100).setOpacity(0).appendTo(center);
    banner.setBackface(false);
    banner.rotate(Math.random() * 360, 0, 0);

    banner.innerHTML = '<h1 style="color:' + color + '; font-size:50px">DivSuar, a CSS-based graphics library</h1>';

    var anim1 = [
      ['to', { position: [x + 400, y, z], opacity: 0 }],
      ['to', { position: [x + 200, y, z], opacity: 0.8 }, 5000 / 4],
      ['to', { position: [x - 200, y, z], opacity: 0.8 }, 5000 / 2],
      ['to', { position: [x - 400, y, z], opacity: 0 }, 5000 / 4],
      ['repeat']
    ];
    var anim2 = [['wait', waitTime], ['play', anim1]];

    banner.playAnimation(anim2);
  }

  for (var i = 0; i < 60; i++) {
    var time = Math.random() * 5000;
    var x = Math.random() * 1600 - 800;
    var y = Math.random() * 300 - 300;
    var z = Math.random() * 800 - 400;
    var color = colors[Math.floor(Math.random() * 6)];
    createBanner(time, x, y, z, color);
  }
};
