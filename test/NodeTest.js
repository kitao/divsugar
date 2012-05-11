(function() {
  'use strict';

  module('Node');

  test('constructor and getters', function() {
    var node1 = DivSugar.createNode('node1');
    strictEqual(node1.id, 'node1');
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
  });

  test('getPosition', function() {
    var node1 = DivSugar.createNode();
    var vec1 = new DivSugar.Vector(1, 2, 3);
    node1.getPosition(vec1);
    deepEqual(vec1, DivSugar.Vector.ZERO);

    ok(node1.getPosition(vec1).getPosition(vec1));
  });

  test('getTransform', function() {
    var node1 = DivSugar.createNode();
    var mat1 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    node1.getTransform(mat1);
    deepEqual(mat1, DivSugar.Matrix.UNIT);

    ok(node1.getTransform(mat1).getTransform(mat1));
  });

  test('setSize', function() {
    var node1 = DivSugar.createNode();
    node1.setSize(10, 20);
    strictEqual(node1.getWidth(), 10);
    strictEqual(node1.getHeight(), 20);

    ok(node1.setSize(1, 1).setSize(1, 1));
  });

  test('setPosition', function() {
    var node1 = DivSugar.createNode();
    var vec1 = new DivSugar.Vector(40, 50, 60);

    node1.setPosition(10, 20, 30);
    strictEqual(node1.getPositionX(), 10);
    strictEqual(node1.getPositionY(), 20);
    strictEqual(node1.getPositionZ(), 30);

    node1.setPosition(vec1);
    strictEqual(node1.getPositionX(), 40);
    strictEqual(node1.getPositionY(), 50);
    strictEqual(node1.getPositionZ(), 60);

    ok(node1.setPosition(0, 0, 0).setPosition(vec1).setPosition(1, 1, 1));
  });

  test('setTransform', function() {
    var node1 = DivSugar.createNode();
    var mat1 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    var mat2 = new DivSugar.Matrix();
    node1.setTransform(mat1);
    node1.getTransform(mat2);
    deepEqual(mat2, mat1);

    ok(node1.setTransform(mat1).setTransform(mat1));
  });

  test('setVisible', function() {
    var node1 = DivSugar.createNode();
    node1.setVisible(false);
    strictEqual(node1.getVisible(), false);

    ok(node1.setVisible(true).setVisible(true));
  });

  test('setBackface', function() {
    var node1 = DivSugar.createNode();
    node1.setBackface(false);
    strictEqual(node1.getBackface(), false);

    ok(node1.setBackface(true).setBackface(true));
  });

  test('setClip', function() {
    var node1 = DivSugar.createNode();
    node1.setClip(true);
    strictEqual(node1.getClip(), true);

    ok(node1.setClip(true).setClip(true));
  });

  test('setOpacity', function() {
    var node1 = DivSugar.createNode();
    node1.setOpacity(0.5);
    strictEqual(node1.getOpacity(), 0.5);

    ok(node1.setOpacity(0).setOpacity(0));
  });

  test('setImage', function() {
    var node1 = DivSugar.createNode();

    node1.setImage('../examples/assets/coin.png');
    strictEqual(node1.getImage(), '../examples/assets/coin.png');

    node1.setImage('../examples/assets/coin.png', function(width, height) {
      start();
      strictEqual(width, 400);
      strictEqual(height, 200);
    });
    stop();

    ok(node1.setImage(null).setImage(null));
  });

  test('setImageClip', function() {
    var node1 = DivSugar.createNode();

    node1.setImageClip(0.1, 0.2, 0.3, 0.4);
    strictEqual(node1.getImageClipU1(), 0.1);
    strictEqual(node1.getImageClipV1(), 0.2);
    strictEqual(node1.getImageClipU2(), 0.3);
    strictEqual(node1.getImageClipV2(), 0.4);

    node1.setImageClip(-1, -2, -3, -4);
    strictEqual(node1.getImageClipU1(), 0);
    strictEqual(node1.getImageClipV1(), 0);
    strictEqual(node1.getImageClipU2(), 0);
    strictEqual(node1.getImageClipV2(), 0);

    node1.setImageClip(2, 3, 4, 5);
    strictEqual(node1.getImageClipU1(), 1);
    strictEqual(node1.getImageClipV1(), 1);
    strictEqual(node1.getImageClipU2(), 1);
    strictEqual(node1.getImageClipV2(), 1);

    ok(node1.setImageClip(0, 0, 0, 0).setImageClip(0, 0, 0, 0));
  });

  test('translate', function() {
    var node1 = DivSugar.createNode();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    node1.setTransform(mat1);
    node1.translate(10, 20, 30);
    mat1.translate(10, 20, 30);
    node1.getTransform(mat2);
    deepEqual(mat2, mat1);

    ok(node1.translate(0, 0, 0).translate(0, 0, 0));
  });

  test('rotate', function() {
    var node1 = DivSugar.createNode();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();

    node1.setTransform(mat1);
    node1.rotate(90, 0, 0);
    mat1.rotate(90, 0, 0);
    node1.getTransform(mat2);
    nearlyEqual(mat2, mat1);

    node1.setTransform(mat1);
    node1.rotate(0, 90, 0);
    mat1.rotate(0, 90, 0);
    node1.getTransform(mat2);
    nearlyEqual(mat2, mat1);

    node1.setTransform(mat1);
    node1.rotate(0, 0, 90);
    mat1.rotate(0, 0, 90);
    node1.getTransform(mat2);
    nearlyEqual(mat2, mat1);

    ok(node1.rotate(0, 0, 0).rotate(0, 0, 0));
  });

  test('scale', function() {
    var node1 = DivSugar.createNode();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    node1.setTransform(mat1);
    node1.scale(10, 20, 30);
    mat1.scale(10, 20, 30);
    node1.getTransform(mat2);
    deepEqual(mat2, mat1);

    ok(node1.scale(1, 1, 1).scale(1, 1, 1));
  });

  test('playAnimation', function() {
    var callCount = 0;
    var mat1 = new DivSugar.Matrix();
    var node1 = DivSugar.createNode();
    var anim1 = [
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
      ['call', function() { callCount++; }],
      ['wait', 5],
      ['repeat', 2],
      ['wait', 5]
    ];
    var task1 = node1.playAnimation(anim1);

    strictEqual(callCount, 0);
    strictEqual(task1.animation, anim1);
    strictEqual(task1.getParent(), DivSugar.rootTask);
    strictEqual(node1.getWidth(), 0);
    strictEqual(node1.getHeight(), 0);
    strictEqual(node1.getVisible(), true);
    strictEqual(node1.getBackface(), true);
    strictEqual(node1.getClip(), false);
    strictEqual(node1.getOpacity(), 1);
    strictEqual(node1.getImage(), null);
    strictEqual(node1.getImageClipU1(), 0);
    strictEqual(node1.getImageClipV1(), 0);
    strictEqual(node1.getImageClipU2(), 1);
    strictEqual(node1.getImageClipV2(), 1);
    node1.getTransform(mat1);
    deepEqual(mat1, DivSugar.Matrix.UNIT);

    DivSugar.rootTask.update(10);
    strictEqual(callCount, 0);
    strictEqual(task1.getParent(), DivSugar.rootTask);
    strictEqual(node1.getWidth(), 100);
    strictEqual(node1.getHeight(), 200);
    strictEqual(node1.getVisible(), false);
    strictEqual(node1.getBackface(), false);
    strictEqual(node1.getClip(), true);
    strictEqual(node1.getOpacity(), 0.5);
    strictEqual(node1.getImage(), '../examples/assets/coin.png');
    strictEqual(node1.getImageClipU1(), 0.1);
    strictEqual(node1.getImageClipV1(), 0.2);
    strictEqual(node1.getImageClipU2(), 0.3);
    strictEqual(node1.getImageClipV2(), 0.4);
    node1.getTransform(mat1);
    deepEqual(mat1, new DivSugar.Matrix().rotate(0, 90, 0).translate(10, 20, 30).rotate(10, 20, 30).scale(1, 2, 3));

    DivSugar.rootTask.update(1);
    strictEqual(callCount, 1);
    strictEqual(task1.getParent(), DivSugar.rootTask);

    DivSugar.rootTask.update(39);
    strictEqual(callCount, 3);
    strictEqual(task1.getParent(), DivSugar.rootTask);

    DivSugar.rootTask.update(1);
    strictEqual(callCount, 3);
    strictEqual(task1.getParent(), null);
  });

  test('clearAnimation', function() {
    var node1 = DivSugar.createNode();
    var task1 = node1.playAnimation([['wait', 10]]);
    var task2 = node1.playAnimation([['wait', 10]]);
    var task3 = node1.playAnimation([['wait', 10]]);

    DivSugar.rootTask.update(5);
    strictEqual(task1.getParent(), DivSugar.rootTask);
    strictEqual(task2.getParent(), DivSugar.rootTask);
    strictEqual(task3.getParent(), DivSugar.rootTask);

    node1.clearAnimation();
    strictEqual(task1.getParent(), null);
    strictEqual(task2.getParent(), null);
    strictEqual(task3.getParent(), null);

    ok(node1.clearAnimation().clearAnimation());
  });
})();
