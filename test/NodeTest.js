(function() {
  'use strict';

  module('Node');

  test('constructor, properties, and getters', function() {
    var node1 = new DivSugar.Node('node1');
    ok(node1.div instanceof HTMLDivElement);
    strictEqual(node1.div.id, 'node1');
    strictEqual(node1.div.sugar, node1);
    strictEqual(node1.getParent(), null);
    strictEqual(node1.getWidth(), 0);
    strictEqual(node1.getHeight(), 0);
    strictEqual(node1.getPositionX(), 0);
    strictEqual(node1.getPositionY(), 0);
    strictEqual(node1.getPositionZ(), 0);
    strictEqual(node1.getVisible(), true);
    strictEqual(node1.getBackface(), true);
    strictEqual(node1.getClip(), false);
    strictEqual(node1.getOpacity(), 1);
    strictEqual(node1.getImage(), null);
    strictEqual(node1.getImageClipU1(), 0);
    strictEqual(node1.getImageClipV1(), 0);
    strictEqual(node1.getImageClipU2(), 1);
    strictEqual(node1.getImageClipV2(), 1);

    var node2 = new DivSugar.Scene();
    strictEqual(node2.div.id, '');
  });

  test('append', function() {
    var node1 = new DivSugar.Node();
    var node2 = new DivSugar.Node();
    node1.append(node2);
    strictEqual(node2.getParent(), node1);

    ok(node1.append(node2).append(node2));
  });

  test('appendTo', function() {
    var node1 = new DivSugar.Node();
    var node2 = new DivSugar.Node();
    node1.appendTo(node2);
    strictEqual(node1.getParent(), node2);

    ok(node1.appendTo(node2).appendTo(node2));
  });

  test('remove', function() {
    var node1 = new DivSugar.Node();
    var node2 = new DivSugar.Node();
    node1.append(node2);
    node1.remove(node2);
    strictEqual(node2.getParent(), null);

    ok(node1.remove(node2).remove(node2));
  });

  test('getPosition', function() {
    var vec = new DivSugar.Vector(1, 2, 3);
    var node = new DivSugar.Node();
    node.getPosition(vec);
    deepEqual(vec, DivSugar.Vector.ZERO);

    ok(node.getPosition(vec).getPosition(vec));
  });

  test('getTransform', function() {
    var mat = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    var node = new DivSugar.Node();
    node.getTransform(mat);
    deepEqual(mat, DivSugar.Matrix.UNIT);

    ok(node.getTransform(mat).getTransform(mat));
  });

  test('setSize', function() {
    var node = new DivSugar.Node();
    node.setSize(10, 20);
    strictEqual(node.getWidth(), 10);
    strictEqual(node.getHeight(), 20);

    ok(node.setSize(1, 1).setSize(1, 1));
  });

  test('setPosition', function() {
    var vec = new DivSugar.Vector(40, 50, 60);
    var node = new DivSugar.Node();

    node.setPosition(10, 20, 30);
    strictEqual(node.getPositionX(), 10);
    strictEqual(node.getPositionY(), 20);
    strictEqual(node.getPositionZ(), 30);

    node.setPosition(vec);
    strictEqual(node.getPositionX(), 40);
    strictEqual(node.getPositionY(), 50);
    strictEqual(node.getPositionZ(), 60);

    raises(function() {
      node.setPosition(1, 2);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(node.setPosition(0, 0, 0).setPosition(vec).setPosition(1, 1, 1));
  });

  test('setTransform', function() {
    var mat1 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    var mat2 = new DivSugar.Matrix();
    var node = new DivSugar.Node();
    node.setTransform(mat1);
    node.getTransform(mat2);
    deepEqual(mat2, mat1);

    ok(node.setTransform(mat1).setTransform(mat1));
  });

  test('setVisible', function() {
    var node = new DivSugar.Node();
    node.setVisible(false);
    strictEqual(node.getVisible(), false);

    ok(node.setVisible(true).setVisible(true));
  });

  test('setBackface', function() {
    var node = new DivSugar.Node();
    node.setBackface(false);
    strictEqual(node.getBackface(), false);

    ok(node.setBackface(true).setBackface(true));
  });

  test('setClip', function() {
    var node = new DivSugar.Node();
    node.setClip(true);
    strictEqual(node.getClip(), true);

    ok(node.setClip(true).setClip(true));
  });

  test('setOpacity', function() {
    var node = new DivSugar.Node();
    node.setOpacity(0.5);
    strictEqual(node.getOpacity(), 0.5);

    ok(node.setOpacity(0).setOpacity(0));
  });

  test('setImage', function() {
    var node = new DivSugar.Node();

    node.setImage('../examples/assets/coin.png');
    strictEqual(node.getImage(), '../examples/assets/coin.png');

    node.setImage('../examples/assets/coin.png', function(width, height) {
      start();
      strictEqual(width, 400);
      strictEqual(height, 200);
    });
    stop();

    ok(node.setImage(null).setImage(null));
  });

  test('setImageClip', function() {
    var node = new DivSugar.Node();

    node.setImageClip(0.1, 0.2, 0.3, 0.4);
    strictEqual(node.getImageClipU1(), 0.1);
    strictEqual(node.getImageClipV1(), 0.2);
    strictEqual(node.getImageClipU2(), 0.3);
    strictEqual(node.getImageClipV2(), 0.4);

    node.setImageClip(-1, -2, -3, -4);
    strictEqual(node.getImageClipU1(), 0);
    strictEqual(node.getImageClipV1(), 0);
    strictEqual(node.getImageClipU2(), 0);
    strictEqual(node.getImageClipV2(), 0);

    node.setImageClip(2, 3, 4, 5);
    strictEqual(node.getImageClipU1(), 1);
    strictEqual(node.getImageClipV1(), 1);
    strictEqual(node.getImageClipU2(), 1);
    strictEqual(node.getImageClipV2(), 1);

    ok(node.setImageClip(0, 0, 0, 0).setImageClip(0, 0, 0, 0));
  });

  test('translate', function() {
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    var node = new DivSugar.Node();
    node.setTransform(mat1);
    node.translate(10, 20, 30);
    mat1.translate(10, 20, 30);
    node.getTransform(mat2);
    deepEqual(mat2, mat1);

    raises(function() {
      node.translate(1, 2);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(node.translate(0, 0, 0).translate(0, 0, 0));
  });

  test('rotate', function() {
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    var node = new DivSugar.Node();

    node.setTransform(mat1);
    node.rotate(90, 0, 0);
    mat1.rotate(90, 0, 0);
    node.getTransform(mat2);
    nearlyEqual(mat2, mat1);

    node.setTransform(mat1);
    node.rotate(0, 90, 0);
    mat1.rotate(0, 90, 0);
    node.getTransform(mat2);
    nearlyEqual(mat2, mat1);

    node.setTransform(mat1);
    node.rotate(0, 0, 90);
    mat1.rotate(0, 0, 90);
    node.getTransform(mat2);
    nearlyEqual(mat2, mat1);

    raises(function() {
      node.rotate(90, 90);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(node.rotate(0, 0, 0).rotate(0, 0, 0));
  });

  test('scale', function() {
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    var node = new DivSugar.Node();
    node.setTransform(mat1);
    node.scale(10, 20, 30);
    mat1.scale(10, 20, 30);
    node.getTransform(mat2);
    deepEqual(mat2, mat1);

    raises(function() {
      node.scale(2, 3);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(node.scale(1, 1, 1).scale(1, 1, 1));
  });

  test('playAnimation', function() {
    var callCount = 0;
    var mat = new DivSugar.Matrix();
    var func = function() { callCount++; };
    var anim1 = [['call', func, func]];
    var anim2 = [
      ['to', {
          size: [100, 200],
          position: [1, 2, 3],
          transform: new DivSugar.Matrix().rotate(0, 90, 0),
          visible: false,
          backface: false,
          clip: true,
          opacity: 0.5,
          image: '../examples/assets/coin.png',
          imageClip: [0.1, 0.2, 0.3, 0.4],
          translate: [10, 20, 30],
          rotate: [10, 20, 30],
          scale: [1, 2, 3]
        }, 10, DivSugar.Ease.quadInOut ],
      ['play', anim1, anim1],
      ['wait', 5],
      ['repeat', 2],
      ['wait', 5]
    ];
    var anim3 = [['to', { dummy: 0 }, 10]];
    var anim4 = [['dummy']];
    var node = new DivSugar.Node();
    var task = node.playAnimation(anim2);

    strictEqual(callCount, 0);
    strictEqual(task.animation, anim2);
    strictEqual(task.getParent(), DivSugar.rootTask);
    strictEqual(node.getWidth(), 0);
    strictEqual(node.getHeight(), 0);
    strictEqual(node.getVisible(), true);
    strictEqual(node.getBackface(), true);
    strictEqual(node.getClip(), false);
    strictEqual(node.getOpacity(), 1);
    strictEqual(node.getImage(), null);
    strictEqual(node.getImageClipU1(), 0);
    strictEqual(node.getImageClipV1(), 0);
    strictEqual(node.getImageClipU2(), 1);
    strictEqual(node.getImageClipV2(), 1);
    node.getTransform(mat);
    deepEqual(mat, DivSugar.Matrix.UNIT);

    DivSugar.rootTask.update(10);
    strictEqual(callCount, 0);
    strictEqual(task.getParent(), DivSugar.rootTask);
    strictEqual(node.getWidth(), 100);
    strictEqual(node.getHeight(), 200);
    strictEqual(node.getVisible(), false);
    strictEqual(node.getBackface(), false);
    strictEqual(node.getClip(), true);
    strictEqual(node.getOpacity(), 0.5);
    strictEqual(node.getImage(), '../examples/assets/coin.png');
    strictEqual(node.getImageClipU1(), 0.1);
    strictEqual(node.getImageClipV1(), 0.2);
    strictEqual(node.getImageClipU2(), 0.3);
    strictEqual(node.getImageClipV2(), 0.4);
    node.getTransform(mat);
    deepEqual(mat, new DivSugar.Matrix().rotate(0, 90, 0).translate(10, 20, 30).rotate(10, 20, 30).scale(1, 2, 3));

    DivSugar.rootTask.update(1);
    strictEqual(callCount, 0);
    strictEqual(task.getParent(), DivSugar.rootTask);

    DivSugar.rootTask.update(1);
    strictEqual(callCount, 4);
    strictEqual(task.getParent(), DivSugar.rootTask);

    DivSugar.rootTask.update(38);
    strictEqual(callCount, 4);
    strictEqual(task.getParent(), DivSugar.rootTask);

    DivSugar.rootTask.update(1);
    strictEqual(callCount, 12);
    strictEqual(task.getParent(), null);

    raises(function() {
      task = node.playAnimation(anim3);
      DivSugar.rootTask.update(1);
    }, function(e) {
      strictEqual(e, "DivSugar: Unknown animation parameter 'dummy'");
      return true;
    });
    task.destroy();

    raises(function() {
      task = node.playAnimation(anim4);
      DivSugar.rootTask.update(1);
    }, function(e) {
      strictEqual(e, "DivSugar: Unknown animation command 'dummy'");
      return true;
    });
    task.destroy();
  });

  test('clearAnimation', function() {
    var anim = [['wait', 1], ['repeat']];
    var node = new DivSugar.Node();
    var task1 = node.playAnimation(anim);
    var task2 = node.playAnimation(anim);
    var task3 = node.playAnimation(anim);

    DivSugar.rootTask.update(10);
    strictEqual(task1.getParent(), DivSugar.rootTask);
    strictEqual(task2.getParent(), DivSugar.rootTask);
    strictEqual(task3.getParent(), DivSugar.rootTask);

    node.clearAnimation();
    strictEqual(task1.getParent(), null);
    strictEqual(task2.getParent(), null);
    strictEqual(task3.getParent(), null);

    ok(node.clearAnimation().clearAnimation());
  });

  test('getWorldPosition', function() {
    var vec = new DivSugar.Vector();
    var scn = new DivSugar.Scene();
    var node1 = new DivSugar.Node().setPosition(10, 10, 10).rotate(0, 180, 0);
    var node2 = new DivSugar.Node().setPosition(100, 100, 100).rotate(0, 180, 0);
    var node3 = new DivSugar.Node().setPosition(1000, 1000, 1000);

    node1.getWorldPosition(vec);
    nearlyEqual(vec, new DivSugar.Vector(10, 10, 10));

    scn.append(node1);
    node1.getWorldPosition(vec);
    nearlyEqual(vec, new DivSugar.Vector(10, 10, 10));

    node1.append(node2);
    node2.getWorldPosition(vec);
    nearlyEqual(vec, new DivSugar.Vector(-90, 110, -90));

    node2.append(node3);
    node3.getWorldPosition(vec);
    nearlyEqual(vec, new DivSugar.Vector(910, 1110, 910));

    ok(node1.getWorldPosition(vec).getWorldPosition(vec));
  });

  test('getWorldTransform', function() {
    var mat = new DivSugar.Matrix();
    var scn = new DivSugar.Scene();
    var node1 = new DivSugar.Node().setPosition(10, 10, 10).rotate(0, 180, 0);
    var node2 = new DivSugar.Node().setPosition(100, 100, 100).rotate(0, 180, 0);
    var node3 = new DivSugar.Node().setPosition(1000, 1000, 1000);

    node1.getWorldTransform(mat);
    nearlyEqual(mat, new DivSugar.Matrix().translate(10, 10, 10).rotate(0, 180, 0));

    scn.append(node1);
    node1.getWorldTransform(mat);
    nearlyEqual(mat, new DivSugar.Matrix().translate(10, 10, 10).rotate(0, 180, 0));

    node1.append(node2);
    node2.getWorldTransform(mat);
    nearlyEqual(mat, new DivSugar.Matrix().translate(-90, 110, -90));

    node2.append(node3);
    node3.getWorldTransform(mat);
    nearlyEqual(mat, new DivSugar.Matrix().translate(910, 1110, 910));

    ok(node1.getWorldTransform(mat).getWorldTransform(mat));
  });
})();
