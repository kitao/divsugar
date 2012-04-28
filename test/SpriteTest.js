(function() {
  'use strict';

  module('Sprite');

  test('constructor and getters', function() {
    var spr1 = DivSugar.createSprite('sprite1');
    var vec1 = new DivSugar.Vector();
    var mat1 = new DivSugar.Matrix();

    strictEqual(spr1.id, 'sprite1');
    strictEqual(spr1.getWidth(), 100);
    strictEqual(spr1.getHeight(), 100);
    strictEqual(spr1.getPositionX(), 0);
    strictEqual(spr1.getPositionY(), 0);
    strictEqual(spr1.getPositionZ(), 0);

    spr1.getPosition(vec1);
    strictEqual(vec1.x, 0);
    strictEqual(vec1.y, 0);
    strictEqual(vec1.z, 0);

    spr1.getTransform(mat1);
    nearlyEqual(mat1, DivSugar.Matrix.UNIT);

    strictEqual(spr1.getVisible(), true);
    strictEqual(spr1.getClip(), false);
    strictEqual(spr1.getOpacity(), 1);
    strictEqual(spr1.getImage(), null);
    strictEqual(spr1.getImageClipU1(), 0);
    strictEqual(spr1.getImageClipV1(), 0);
    strictEqual(spr1.getImageClipU2(), 1);
    strictEqual(spr1.getImageClipV2(), 1);
  });

  test('setSize', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setSize(10, 20);
    strictEqual(spr1.getWidth(), 10);
    strictEqual(spr1.getHeight(), 20);
  });

  test('setPosition', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setPosition(10, 20, 30);
    strictEqual(spr1.getPositionX(), 10);
    strictEqual(spr1.getPositionY(), 20);
    strictEqual(spr1.getPositionZ(), 30);

    var spr2 = DivSugar.createSprite();
    var vec1 = new DivSugar.Vector(40, 50, 60);
    spr2.setPosition(vec1);
    strictEqual(spr2.getPositionX(), 40);
    strictEqual(spr2.getPositionY(), 50);
    strictEqual(spr2.getPositionZ(), 60);
  });

  test('setTransform', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.getTransform(mat2);
    nearlyEqual(mat2, mat1);
  });

  test('setVisible', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setVisible(false);
    strictEqual(spr1.getVisible(), false);
  });

  test('setClip', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setClip(true);
    strictEqual(spr1.getClip(), true);
  });

  test('setOpacity', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setOpacity(0.5);
    strictEqual(spr1.getOpacity(), 0.5);
  });

  test('setImage', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setImage('http://test.test');
    strictEqual(spr1.getImage(), 'http://test.test');
  });

  test('setImageClip', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setImageClip(0.1, 0.2, 0.3, 0.4);
    strictEqual(spr1.getImageClipU1(), 0.1);
    strictEqual(spr1.getImageClipV1(), 0.2);
    strictEqual(spr1.getImageClipU2(), 0.3);
    strictEqual(spr1.getImageClipV2(), 0.4);
  });

  test('rotateX', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.rotateX(90);
    mat1.rotateX(90);
    spr1.getTransform(mat2);
    nearlyEqual(mat2, mat1);
  });

  test('rotateY', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.rotateY(90);
    mat1.rotateY(90);
    spr1.getTransform(mat2);
    nearlyEqual(mat2, mat1);
  });

  test('rotateZ', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.rotateZ(90);
    mat1.rotateZ(90);
    spr1.getTransform(mat2);
    nearlyEqual(mat2, mat1);
  });

  test('scale', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.scale(10, 20, 30);
    mat1.scale(10, 20, 30);
    spr1.getTransform(mat2);
    nearlyEqual(mat2, mat1);
  });

  test('translate', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.translate(10, 20, 30);
    mat1.translate(10, 20, 30);
    spr1.getTransform(mat2);
    nearlyEqual(mat2, mat1);
  });

  test('append', function() {
    var spr1 = DivSugar.createSprite();
    var div1 = document.createElement('div');
    div1.id = 'div1';
    spr1.append(div1);
    strictEqual(spr1.childNodes[0].id, 'div1');

    var spr2 = DivSugar.createSprite();
    var div2 = document.createElement('div');
    div2.id = 'div2';
    document.body.appendChild(div2);
    spr2.append('div2');
    strictEqual(spr2.childNodes[0].id, 'div2');
  });

  test('appendTo', function() {
    var spr1 = DivSugar.createSprite('sprite1');
    var div1 = document.createElement('div');
    spr1.appendTo(div1);
    strictEqual(div1.childNodes[0].id, 'sprite1');

    var spr2 = DivSugar.createSprite('sprite2');
    var div2 = document.createElement('div');
    div2.id = 'div2';
    document.body.appendChild(div2);
    spr2.appendTo('div2');
    strictEqual(div2.childNodes[0].id, 'sprite2');
    document.body.removeChild(div2);
  });
})();
