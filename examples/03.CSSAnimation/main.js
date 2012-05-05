window.onload = function() {
  'use strict';

  // create a scene
  var scn = DivSugar.createScene();
  scn.setSize(800, 600).setImage('#000080');
  document.body.appendChild(scn);

  window.onresize = function() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); };
  window.onresize();

  // register CSS animations dynamically
  DivSugar.addCSSAnimation('scroll', {
    from: {
      opacity: 0,
      rotate: [90, 0, 0],
      scale: [3, 2, 1]
    },
    to: {
      opacity: 1,
      rotate: [0, 0, 0],
      scale: [1, 1, 1]
    }
  });

  //
  var water1 = DivSugar.createNode();
  water1.setSize(300, 300).setImage('../assets/water.jpg').setPosition(400, 300, 0);
  scn.appendChild(water1);

  var water2 = DivSugar.createNode();
//  water2.setSize(300, 300).setImage('../assets/water.jpg').setPosition(400, 300, 0);
  scn.appendChild(water2);

  water1.playCSSAnimation('scroll', 1, 'linear', 0, 'infinite');
  //water2.playCSSAnimation('scroll', 13, 'linear', 0, 'infinite');
};
