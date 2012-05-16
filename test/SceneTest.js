(function() {
  'use strict';

  module('Scene');

  test('constructor, properties, and getters', function() {
    var scn1 = new DivSugar.Scene('scene1');
    ok(scn1.div instanceof HTMLDivElement);
    strictEqual(scn1.div.id, 'scene1');
    strictEqual(scn1.div.sugar, scn1);
    ok(scn1.rootNode instanceof DivSugar.Node);
    strictEqual(scn1.rootNode.isRootNode, true);
    strictEqual(scn1.getViewAngle(), 45);
    nearlyEqual(scn1.getPerspective(), 482.8427);
    strictEqual(scn1.getWidth(), 400);
    strictEqual(scn1.getHeight(), 300);
    strictEqual(scn1.getViewWidth(), 400);
    strictEqual(scn1.getViewHeight(), 300);
    strictEqual(scn1.getPositionX(), 0);
    strictEqual(scn1.getPositionY(), 0);
    strictEqual(scn1.getVisible(), true);
    strictEqual(scn1.getClip(), true);
    strictEqual(scn1.getOpacity(), 1);
    strictEqual(scn1.getImage(), '#0000ff');
    strictEqual(scn1.getImageClipU1(), 0);
    strictEqual(scn1.getImageClipV1(), 0);
    strictEqual(scn1.getImageClipU2(), 1);
    strictEqual(scn1.getImageClipV2(), 1);

    var scn2 = new DivSugar.Scene();
    strictEqual(scn2.div.id, '');
  });

  test('append', function() {
    var scn1 = new DivSugar.Scene();
    var node1 = new DivSugar.Node();
    scn1.append(node1);
    strictEqual(scn1.rootNode.div.firstChild, node1.div);

    ok(scn1.append(node1).append(node1));
  });

  test('appendTo', function() {
    var div1 = document.createElement('div');
    var scn1 = new DivSugar.Scene();
    scn1.appendTo(div1);
    strictEqual(div1.firstChild, scn1.div);

    ok(scn1.appendTo(div1).appendTo(div1));
  });

  test('remove', function() {
    var scn1 = new DivSugar.Scene();
    var node1 = new DivSugar.Node();
    scn1.append(node1);
    scn1.remove(node1);
    strictEqual(scn1.rootNode.div.firstChild, null);

    ok(scn1.remove(node1).remove(node1));
  });

  test('setViewAngle', function() {
    var scn1 = new DivSugar.Scene();
    scn1.setSize(800, 600);
    scn1.setViewAngle(90);
    strictEqual(scn1.getViewAngle(), 90);
    nearlyEqual(scn1.getPerspective(), 400);

    ok(scn1.setViewAngle(90).setViewAngle(90));
  });

  test('setSize', function() {
    var scn1 = new DivSugar.Scene();

    scn1.setSize(10, 20);
    nearlyEqual(scn1.getPerspective(), 12.0711);
    strictEqual(scn1.getWidth(), 10);
    strictEqual(scn1.getHeight(), 20);
    strictEqual(scn1.getViewWidth(), 10);
    strictEqual(scn1.getViewHeight(), 20);

    scn1.setSize(100, 200, 300, 400);
    nearlyEqual(scn1.getPerspective(), 362.1320);
    strictEqual(scn1.getWidth(), 100);
    strictEqual(scn1.getHeight(), 200);
    strictEqual(scn1.getViewWidth(), 300);
    strictEqual(scn1.getViewHeight(), 400);

    ok(scn1.setSize(1, 1).setSize(1, 1));
  });

  test('setPosition', function() {
    var scn1 = new DivSugar.Scene();
    scn1.setPosition(10, 20);
    strictEqual(scn1.getPositionX(), 10);
    strictEqual(scn1.getPositionY(), 20);

    ok(scn1.setPosition(0, 0).setPosition(0, 0));
  });

  test('setVisible', function() {
    var scn1 = new DivSugar.Scene();
    scn1.setVisible(false);
    strictEqual(scn1.getVisible(), false);

    ok(scn1.setVisible(true).setVisible(true));
  });

  test('setClip', function() {
    var scn1 = new DivSugar.Scene();
    scn1.setClip(false);
    strictEqual(scn1.getClip(), false);

    ok(scn1.setClip(true).setClip(true));
  });

  test('setOpacity', function() {
    var scn1 = new DivSugar.Scene();
    scn1.setOpacity(0.5);
    strictEqual(scn1.getOpacity(), 0.5);

    ok(scn1.setOpacity(0).setOpacity(0));
  });

  test('setImage', function() {
    var scn1 = new DivSugar.Scene();

    scn1.setImage('../examples/assets/coin.png');
    strictEqual(scn1.getImage(), '../examples/assets/coin.png');

    scn1.setImage('../examples/assets/coin.png', function(width, height) {
      start();
      strictEqual(width, 400);
      strictEqual(height, 200);
    });
    stop();

    ok(scn1.setImage(null).setImage(null));
  });

  test('setImageClip', function() {
    var scn1 = new DivSugar.Scene();

    scn1.setImageClip(0.1, 0.2, 0.3, 0.4);
    strictEqual(scn1.getImageClipU1(), 0.1);
    strictEqual(scn1.getImageClipV1(), 0.2);
    strictEqual(scn1.getImageClipU2(), 0.3);
    strictEqual(scn1.getImageClipV2(), 0.4);

    scn1.setImageClip(-1, -2, -3, -4);
    strictEqual(scn1.getImageClipU1(), 0);
    strictEqual(scn1.getImageClipV1(), 0);
    strictEqual(scn1.getImageClipU2(), 0);
    strictEqual(scn1.getImageClipV2(), 0);

    scn1.setImageClip(2, 3, 4, 5);
    strictEqual(scn1.getImageClipU1(), 1);
    strictEqual(scn1.getImageClipV1(), 1);
    strictEqual(scn1.getImageClipU2(), 1);
    strictEqual(scn1.getImageClipV2(), 1);

    ok(scn1.setImageClip(0, 0, 0, 0).setImageClip(0, 0, 0, 0));
  });

  test('adjustLayout', function() {
    var scn1 = new DivSugar.Scene();
    scn1.setSize(100, 200, 300, 400);

    scn1.adjustLayout(1000, 2000, 'center');
    nearlyEqual(scn1.getWidth(), 100);
    nearlyEqual(scn1.getHeight(), 200);
    nearlyEqual(scn1.getPositionX(), 450);
    nearlyEqual(scn1.getPositionY(), 900);

    scn1.adjustLayout(1000, 2000, 'contain');
    nearlyEqual(scn1.getWidth(), 1000);
    nearlyEqual(scn1.getHeight(), 1333.3333);
    nearlyEqual(scn1.getPositionX(), 0);
    nearlyEqual(scn1.getPositionY(), 333.3333);

    scn1.adjustLayout(2000, 1000, 'contain');
    nearlyEqual(scn1.getWidth(), 750);
    nearlyEqual(scn1.getHeight(), 1000);
    nearlyEqual(scn1.getPositionX(), 625);
    nearlyEqual(scn1.getPositionY(), 0);

    scn1.adjustLayout(1000, 2000, 'cover');
    nearlyEqual(scn1.getWidth(), 1500);
    nearlyEqual(scn1.getHeight(), 2000);
    nearlyEqual(scn1.getPositionX(), -250);
    nearlyEqual(scn1.getPositionY(), 0);

    scn1.adjustLayout(2000, 1000, 'cover');
    nearlyEqual(scn1.getWidth(), 2000);
    nearlyEqual(scn1.getHeight(), 2666.6667);
    nearlyEqual(scn1.getPositionX(), 0);
    nearlyEqual(scn1.getPositionY(), -833.3333);

    ok(scn1.adjustLayout(1, 1, 'center').adjustLayout(1, 1, 'center'));
  });

  test('getLocalPosition', function() {
    var vec1 = new DivSugar.Vector();
    var scn1 = new DivSugar.Scene();
    scn1.setSize(100, 200, 300, 400).appendTo(document.body);
    scn1.getLocalPosition(100, 100, vec1);
    ok(vec1.x !== 0 && vec1.y !== 0 && vec1.z === 0);

    ok(scn1.getLocalPosition(0, 0, vec1).getLocalPosition(0, 0, vec1));

    document.body.removeChild(scn1.div);
  });
})();
