window.onload = function() {
  'use strict';

  // create a scene
  var scn = new DivSugar.Scene().setSize(800, 600).setImage('../assets/corkboard.jpg').appendTo(document.body);

  // maximize the scene size
  function resize() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); }
  window.addEventListener('resize', resize, true);
  resize();

  // put pictures
  function addPicture(x, y, src) {
    var node1 = new DivSugar.Node().setPosition(x, y, 0).appendTo(scn);
    var node2 = new DivSugar.Node().setSize(250, 250).setPosition(-130, -130, 0).setImage(src).appendTo(node1);

    node2.div.className = 'picture';
    node2.div.addEventListener('mousedown', function(e) {
      if (e.button === 0) {
        hitNode = node1;
        node1.appendTo(scn); // move this node to the front of the screen
      }
    }, true);

    // for touch events
    node2.div.addEventListener('touchstart', function(e) {
      if (!hitNode) {
        hitNode = node1;
        node1.appendTo(scn); // move this node to the front of the screen
        e.preventDefault();
      }
    }, true);
  }

  addPicture(250, 155, '../assets/picture1.jpg');
  addPicture(550, 155, '../assets/picture2.jpg');
  addPicture(250, 445, '../assets/picture3.jpg');
  addPicture(550, 445, '../assets/picture4.jpg');

  // manipulate pictures
  var hitNode = null;
  var mousePos = new DivSugar.Vector();
  var dragOffset = new DivSugar.Vector();
  var task = new DivSugar.Task().appendTo(DivSugar.rootTask);

  task.onUpdate = function() {
    if (hitNode) {
      scn.getLocalPosition(DivSugar.getMouseX(), DivSugar.getMouseY(), mousePos);

      if (DivSugar.getMouseState(0, 'pressed')) {
        hitNode.getPosition(dragOffset);
        dragOffset.sub(mousePos);
      }

      if (DivSugar.getMouseState(0, 'on')) { hitNode.setPosition(mousePos.x + dragOffset.x, mousePos.y + dragOffset.y, 0); }
      if (DivSugar.getMouseState(0, 'released')) { hitNode = null; }

      if (DivSugar.getKeyState(38, 'on')) { hitNode.scale(1 + this.deltaTime * 0.002, 1 + this.deltaTime * 0.002, 1); }
      if (DivSugar.getKeyState(40, 'on')) { hitNode.scale(1 - this.deltaTime * 0.002, 1 - this.deltaTime * 0.002, 1); }

      if (DivSugar.getKeyState(37, 'on')) { hitNode.rotate(0, 0, this.deltaTime * -0.1); }
      if (DivSugar.getKeyState(39, 'on')) { hitNode.rotate(0, 0, this.deltaTime * 0.1); }
    }
  };
};
