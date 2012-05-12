window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene()
    .setSize(800, 600)
    .setImage('../assets/sunset.jpg')
    .appendChild(scn);

  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  //
  function createBar(width, height, u1, v1) {
    var bar = DivSugar.createNode();
    var face1 = DivSugar.createNode().setSize(width, height).setPosition(-width / 2, -height / 2, height / 2);
    var face2 = DivSugar.createNode().setSize(width, height).setPosition(-width / 2, -height / 2, -height / 2).rotate(90, 0, 0);
    var face3 = DivSugar.createNode().setSize(width, height).setPosition(-width / 2, height / 2, -height / 2).rotate(180, 0, 0);
    var face4 = DivSugar.createNode().setSize(width, height).setPosition(-width / 2, -height / 2, -height / 2).rotate(270, 0, 0);

    face1.setImage('http://placekitten.com/400/400').setImageClip(u1, 0, v1, 1);
    face2.setImage('http://placekitten.com/400/399').setImageClip(u1, 0, v1, 1);
    face3.setImage('http://placekitten.com/400/400').setImageClip(u1, 0, v1, 1);
    face4.setImage('http://placekitten.com/400/399').setImageClip(u1, 0, v1, 1);

    bar.appendChild(face1);
    bar.appendChild(face2);
    bar.appendChild(face3);
    bar.appendChild(face4);

    return bar;
  }

  var bars = [];
  for (var i = 0; i < 10; i++) {
    var bar = createBar(40, 400, i * 0.1, i * 0.1 + 0.1).setPosition(100 + i * 40, 300, -200);
    scn.appendChild(bar);

    bar.playAnimation([
        ['to', { rotate: [-90, 0, 0] }, 2000],
        ['wait', 1000, DivSugar.Ease.quintIn],
        ['repeat']
    ]);
    bars.push(bar);
  }


  //
  /*
  node.playAnimation([
    ['to', { size: [100, 100], opacity: 0.2, rotate: [0, 0, 30] }, 1000, DivSugar.Ease.quadIn ],
    ['wait', 500],
    ['to', { size: [300, 300], opacity: 1, rotate: [0, 0, 30] }, 1000, DivSugar.Ease.quadIn ],
    ['call', function() { console.log('repeat!!'); }],
    ['repeat']
  ]);*/
};
