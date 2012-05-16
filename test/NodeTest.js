(function() {
  'use strict';

  module('Node');

  test('constructor, properties, and getters', function() {
    var node1 = new DivSugar.Node('node1');
    ok(node1.div instanceof HTMLDivElement);
    strictEqual(node1.div.id, 'node1');
    strictEqual(node1.div.sugar, node1);
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
    strictEqual(node1.div.firstChild, node2.div);

    ok(node1.append(node2).append(node2));
  });

  test('appendTo', function() {
    var node1 = new DivSugar.Node();
    var node2 = new DivSugar.Node();
    node1.appendTo(node2);
    strictEqual(node2.div.firstChild, node1.div);

    ok(node1.appendTo(node2).appendTo(node2));
  });

  test('remove', function() {
    var node1 = new DivSugar.Node();
    var node2 = new DivSugar.Node();
    node1.append(node2);
    node1.remove(node2);
    strictEqual(node1.div.firstChild, null);

    ok(node1.remove(node2).remove(node2));
  });

  test('getPosition', function() {
    var node1 = new DivSugar.Node();
    var vec1 = new DivSugar.Vector(1, 2, 3);
    node1.getPosition(vec1);
    deepEqual(vec1, DivSugar.Vector.ZERO);

    ok(node1.getPosition(vec1).getPosition(vec1));
  });

  test('getTransform', function() {
    var node1 = new DivSugar.Node();
    var mat1 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    node1.getTransform(mat1);
    deepEqual(mat1, DivSugar.Matrix.UNIT);

    ok(node1.getTransform(mat1).getTransform(mat1));
  });

  test('setSize', function() {
    var node1 = new DivSugar.Node();
    node1.setSize(10, 20);
    strictEqual(node1.getWidth(), 10);
    strictEqual(node1.getHeight(), 20);

    ok(node1.setSize(1, 1).setSize(1, 1));
  });

  test('setPosition', function() {
    var node1 = new DivSugar.Node();
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
    var node1 = new DivSugar.Node();
    var mat1 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    var mat2 = new DivSugar.Matrix();
    node1.setTransform(mat1);
    node1.getTransform(mat2);
    deepEqual(mat2, mat1);

    ok(node1.setTransform(mat1).setTransform(mat1));
  });

  test('setVisible', function() {
    var node1 = new DivSugar.Node();
    node1.setVisible(false);
    strictEqual(node1.getVisible(), false);

    ok(node1.setVisible(true).setVisible(true));
  });

  test('setBackface', function() {
    var node1 = new DivSugar.Node();
    node1.setBackface(false);
    strictEqual(node1.getBackface(), false);

    ok(node1.setBackface(true).setBackface(true));
  });

  test('setClip', function() {
    var node1 = new DivSugar.Node();
    node1.setClip(true);
    strictEqual(node1.getClip(), true);

    ok(node1.setClip(true).setClip(true));
  });

  test('setOpacity', function() {
    var node1 = new DivSugar.Node();
    node1.setOpacity(0.5);
    strictEqual(node1.getOpacity(), 0.5);

    ok(node1.setOpacity(0).setOpacity(0));
  });

  test('setImage', function() {
    var node1 = new DivSugar.Node();

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
    var node1 = new DivSugar.Node();

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
    var node1 = new DivSugar.Node();
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
    var node1 = new DivSugar.Node();
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
    var node1 = new DivSugar.Node();
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
    var node1 = new DivSugar.Node();
    var func1 = function() { callCount++; };
    var anim1 = [['call', func1, func1]];
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
    var task1 = node1.playAnimation(anim2);

    strictEqual(callCount, 0);
    strictEqual(task1.animation, anim2);
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
    strictEqual(callCount, 0);
    strictEqual(task1.getParent(), DivSugar.rootTask);

    DivSugar.rootTask.update(1);
    strictEqual(callCount, 4);
    strictEqual(task1.getParent(), DivSugar.rootTask);

    DivSugar.rootTask.update(38);
    strictEqual(callCount, 4);
    strictEqual(task1.getParent(), DivSugar.rootTask);

    DivSugar.rootTask.update(1);
    strictEqual(callCount, 12);
    strictEqual(task1.getParent(), null);
  });

  test('clearAnimation', function() {
    var node1 = new DivSugar.Node();
    var anim1 = [['wait', 1], ['repeat']];
    var task1 = node1.playAnimation(anim1);
    var task2 = node1.playAnimation(anim1);
    var task3 = node1.playAnimation(anim1);

    DivSugar.rootTask.update(10);
    strictEqual(task1.getParent(), DivSugar.rootTask);
    strictEqual(task2.getParent(), DivSugar.rootTask);
    strictEqual(task3.getParent(), DivSugar.rootTask);

    node1.clearAnimation();
    strictEqual(task1.getParent(), null);
    strictEqual(task2.getParent(), null);
    strictEqual(task3.getParent(), null);

    ok(node1.clearAnimation().clearAnimation());
  });

  test('getWorldPosition', function() {
    var vec1 = new DivSugar.Vector();
    var scn1 = new DivSugar.Scene();
    var node1 = new DivSugar.Node().setPosition(10, 10, 10).rotate(0, 180, 0);
    var node2 = new DivSugar.Node().setPosition(100, 100, 100).rotate(0, 180, 0);
    var node3 = new DivSugar.Node().setPosition(1000, 1000, 1000);

    node1.getWorldPosition(vec1);
    nearlyEqual(vec1, new DivSugar.Vector(10, 10, 10));

    scn1.append(node1);
    node1.getWorldPosition(vec1);
    nearlyEqual(vec1, new DivSugar.Vector(10, 10, 10));

    node1.append(node2);
    node2.getWorldPosition(vec1);
    nearlyEqual(vec1, new DivSugar.Vector(-90, 110, -90));

    node2.append(node3);
    node3.getWorldPosition(vec1);
    nearlyEqual(vec1, new DivSugar.Vector(910, 1110, 910));

    ok(node1.getWorldPosition(vec1).getWorldPosition(vec1));
  });

  test('getWorldTransform', function() {
    var mat1 = new DivSugar.Matrix();
    var scn1 = new DivSugar.Scene();
    var node1 = new DivSugar.Node().setPosition(10, 10, 10).rotate(0, 180, 0);
    var node2 = new DivSugar.Node().setPosition(100, 100, 100).rotate(0, 180, 0);
    var node3 = new DivSugar.Node().setPosition(1000, 1000, 1000);

    node1.getWorldTransform(mat1);
    nearlyEqual(mat1, new DivSugar.Matrix().translate(10, 10, 10).rotate(0, 180, 0));

    scn1.append(node1);
    node1.getWorldTransform(mat1);
    nearlyEqual(mat1, new DivSugar.Matrix().translate(10, 10, 10).rotate(0, 180, 0));

    node1.append(node2);
    node2.getWorldTransform(mat1);
    nearlyEqual(mat1, new DivSugar.Matrix().translate(-90, 110, -90));

    node2.append(node3);
    node3.getWorldTransform(mat1);
    nearlyEqual(mat1, new DivSugar.Matrix().translate(910, 1110, 910));

    ok(node1.getWorldTransform(mat1).getWorldTransform(mat1));
  });
})();
