(function() {
  'use strict';

  module('Scene');

  test('constructor, properties, and getters', function() {
    var scn1 = new DivSugar.Scene('scene1');
    ok(scn1.div instanceof HTMLDivElement);
    strictEqual(scn1.isScene, true);
    strictEqual(scn1.div.id, 'scene1');
    strictEqual(scn1.div.sugar, scn1);
    strictEqual(scn1.getParent(), null);
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
    var scn = new DivSugar.Scene();
    var node = new DivSugar.Node();
    scn.append(node);
    strictEqual(node.getParent(), scn);

    ok(scn.append(node).append(node));
  });

  test('appendTo', function() {
    var div = document.createElement('div');
    var scn = new DivSugar.Scene();
    scn.appendTo(div);
    strictEqual(scn.getParent(), div);

    ok(scn.appendTo(div).appendTo(div));
  });

  test('remove', function() {
    var scn = new DivSugar.Scene();
    var node = new DivSugar.Node();
    scn.append(node);
    scn.remove(node);
    strictEqual(node.getParent(), null);

    ok(scn.remove(node).remove(node));
  });

  test('setViewAngle', function() {
    var scn = new DivSugar.Scene();
    scn.setSize(800, 600);
    scn.setViewAngle(90);
    strictEqual(scn.getViewAngle(), 90);
    nearlyEqual(scn.getPerspective(), 400);

    ok(scn.setViewAngle(90).setViewAngle(90));
  });

  test('setSize', function() {
    var scn = new DivSugar.Scene();

    scn.setSize(10, 20);
    nearlyEqual(scn.getPerspective(), 12.0711);
    strictEqual(scn.getWidth(), 10);
    strictEqual(scn.getHeight(), 20);
    strictEqual(scn.getViewWidth(), 10);
    strictEqual(scn.getViewHeight(), 20);

    scn.setSize(100, 200, 300, 400);
    nearlyEqual(scn.getPerspective(), 362.1320);
    strictEqual(scn.getWidth(), 100);
    strictEqual(scn.getHeight(), 200);
    strictEqual(scn.getViewWidth(), 300);
    strictEqual(scn.getViewHeight(), 400);

    ok(scn.setSize(1, 1).setSize(1, 1));
  });

  test('setPosition', function() {
    var scn = new DivSugar.Scene();
    scn.setPosition(10, 20);
    strictEqual(scn.getPositionX(), 10);
    strictEqual(scn.getPositionY(), 20);

    ok(scn.setPosition(0, 0).setPosition(0, 0));
  });

  test('setVisible', function() {
    var scn = new DivSugar.Scene();
    scn.setVisible(false);
    strictEqual(scn.getVisible(), false);

    ok(scn.setVisible(true).setVisible(true));
  });

  test('setClip', function() {
    var scn = new DivSugar.Scene();
    scn.setClip(false);
    strictEqual(scn.getClip(), false);

    ok(scn.setClip(true).setClip(true));
  });

  test('setOpacity', function() {
    var scn = new DivSugar.Scene();
    scn.setOpacity(0.5);
    strictEqual(scn.getOpacity(), 0.5);

    ok(scn.setOpacity(0).setOpacity(0));
  });

  test('setImage', function() {
    var scn = new DivSugar.Scene();

    scn.setImage('../examples/assets/coin.png');
    strictEqual(scn.getImage(), '../examples/assets/coin.png');

    scn.setImage('../examples/assets/coin.png', function(width, height) {
      start();
      strictEqual(width, 400);
      strictEqual(height, 200);
    });
    stop();

    ok(scn.setImage(null).setImage(null));
  });

  test('setImageClip', function() {
    var scn = new DivSugar.Scene();

    scn.setImageClip(0.1, 0.2, 0.3, 0.4);
    strictEqual(scn.getImageClipU1(), 0.1);
    strictEqual(scn.getImageClipV1(), 0.2);
    strictEqual(scn.getImageClipU2(), 0.3);
    strictEqual(scn.getImageClipV2(), 0.4);

    scn.setImageClip(-1, -2, -3, -4);
    strictEqual(scn.getImageClipU1(), 0);
    strictEqual(scn.getImageClipV1(), 0);
    strictEqual(scn.getImageClipU2(), 0);
    strictEqual(scn.getImageClipV2(), 0);

    scn.setImageClip(2, 3, 4, 5);
    strictEqual(scn.getImageClipU1(), 1);
    strictEqual(scn.getImageClipV1(), 1);
    strictEqual(scn.getImageClipU2(), 1);
    strictEqual(scn.getImageClipV2(), 1);

    ok(scn.setImageClip(0, 0, 0, 0).setImageClip(0, 0, 0, 0));
  });

  test('adjustLayout', function() {
    var scn = new DivSugar.Scene();
    scn.setSize(100, 200, 300, 400);

    scn.adjustLayout(1000, 2000, 'center');
    nearlyEqual(scn.getWidth(), 100);
    nearlyEqual(scn.getHeight(), 200);
    nearlyEqual(scn.getPositionX(), 450);
    nearlyEqual(scn.getPositionY(), 900);

    scn.adjustLayout(1000, 2000, 'contain');
    nearlyEqual(scn.getWidth(), 1000);
    nearlyEqual(scn.getHeight(), 1333.3333);
    nearlyEqual(scn.getPositionX(), 0);
    nearlyEqual(scn.getPositionY(), 333.3333);

    scn.adjustLayout(2000, 1000, 'contain');
    nearlyEqual(scn.getWidth(), 750);
    nearlyEqual(scn.getHeight(), 1000);
    nearlyEqual(scn.getPositionX(), 625);
    nearlyEqual(scn.getPositionY(), 0);

    scn.adjustLayout(1000, 2000, 'cover');
    nearlyEqual(scn.getWidth(), 1500);
    nearlyEqual(scn.getHeight(), 2000);
    nearlyEqual(scn.getPositionX(), -250);
    nearlyEqual(scn.getPositionY(), 0);

    scn.adjustLayout(2000, 1000, 'cover');
    nearlyEqual(scn.getWidth(), 2000);
    nearlyEqual(scn.getHeight(), 2666.6667);
    nearlyEqual(scn.getPositionX(), 0);
    nearlyEqual(scn.getPositionY(), -833.3333);

    ok(scn.adjustLayout(1, 1, 'center').adjustLayout(1, 1, 'center'));
  });

  test('getLocalPosition', function() {
    var vec = new DivSugar.Vector();
    var scn = new DivSugar.Scene();
    scn.setSize(100, 200, 300, 400).appendTo(document.body);
    scn.getLocalPosition(100, 100, vec);
    ok(vec.x !== 0 && vec.y !== 0 && vec.z === 0);

    ok(scn.getLocalPosition(0, 0, vec).getLocalPosition(0, 0, vec));

    document.body.removeChild(scn.div);
  });
})();
