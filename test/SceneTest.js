(function() {
  'use strict';

  module('Scene');

  test('constructor and getters', function() {
    var scn1 = DivSugar.createScene('scene1');

    strictEqual(scn1.id, 'scene1');
    strictEqual(scn1.getPerspective(), 1000);
    strictEqual(scn1.getWidth(), 100);
    strictEqual(scn1.getHeight(), 100);
    strictEqual(scn1.getViewWidth(), 100);
    strictEqual(scn1.getViewHeight(), 100);
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
  });

  test('setPerspective', function() {
    var scn1 = DivSugar.createScene();
    scn1.setPerspective(123);
    strictEqual(scn1.getPerspective(), 123);
  });

  test('setSize', function() {
    var scn1 = DivSugar.createScene();
    scn1.setSize(10, 20);
    strictEqual(scn1.getWidth(), 10);
    strictEqual(scn1.getHeight(), 20);
    strictEqual(scn1.getViewWidth(), 10);
    strictEqual(scn1.getViewHeight(), 20);

    var scn2 = DivSugar.createScene();
    scn2.setSize(100, 200, 300, 400);
    strictEqual(scn2.getWidth(), 100);
    strictEqual(scn2.getHeight(), 200);
    strictEqual(scn2.getViewWidth(), 300);
    strictEqual(scn2.getViewHeight(), 400);
  });

  test('setPosition', function() {
    var scn1 = DivSugar.createScene();
    scn1.setPosition(10, 20);
    strictEqual(scn1.getPositionX(), 10);
    strictEqual(scn1.getPositionY(), 20);
  });

  test('setVisible', function() {
    var scn1 = DivSugar.createScene();
    scn1.setVisible(false);
    strictEqual(scn1.getVisible(), false);
  });

  test('setClip', function() {
    var scn1 = DivSugar.createScene();
    scn1.setClip(false);
    strictEqual(scn1.getClip(), false);
  });

  test('setOpacity', function() {
    var scn1 = DivSugar.createScene();
    scn1.setOpacity(0.5);
    strictEqual(scn1.getOpacity(), 0.5);
  });

  test('setImage', function() {
    var scn1 = DivSugar.createScene();
    scn1.setImage('http://test.test');
    strictEqual(scn1.getImage(), 'http://test.test');
  });

  test('setImageClip', function() {
    var scn1 = DivSugar.createScene();
    scn1.setImageClip(0.1, 0.2, 0.3, 0.4);
    strictEqual(scn1.getImageClipU1(), 0.1);
    strictEqual(scn1.getImageClipV1(), 0.2);
    strictEqual(scn1.getImageClipU2(), 0.3);
    strictEqual(scn1.getImageClipV2(), 0.4);
  });

  test('append', function() {
    var scn1 = DivSugar.createScene();
    var div1 = document.createElement('div');
    div1.id = 'div1';
    scn1.append(div1);
    strictEqual(scn1.childNodes[0].id, 'div1');

    var scn2 = DivSugar.createScene();
    var div2 = document.createElement('div');
    div2.id = 'div2';
    document.body.appendChild(div2);
    scn2.append('div2');
    strictEqual(scn2.childNodes[0].id, 'div2');
  });

  test('appendTo', function() {
    var scn1 = DivSugar.createScene('scene1');
    var div1 = document.createElement('div');
    scn1.appendTo(div1);
    strictEqual(div1.childNodes[0].id, 'scene1');

    var scn2 = DivSugar.createScene('scene2');
    var div2 = document.createElement('div');
    div2.id = 'div2';
    document.body.appendChild(div2);
    scn2.appendTo('div2');
    strictEqual(div2.childNodes[0].id, 'scene2');
    document.body.removeChild(div2);
  });
})();
