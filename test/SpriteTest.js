(function() {
  'use strict';

  module('Sprite');

  test('constructor and getters', function() {
    var spr1 = DivSugar.createSprite('sprite1');
    strictEqual(spr1.id, 'sprite1');
    strictEqual(spr1.getWidth(), 100);
    strictEqual(spr1.getHeight(), 100);
    strictEqual(spr1.getPositionX(), 0);
    strictEqual(spr1.getPositionY(), 0);
    strictEqual(spr1.getPositionZ(), 0);
    strictEqual(spr1.getVisible(), true);
    strictEqual(spr1.getClip(), false);
    strictEqual(spr1.getOpacity(), 1);
    strictEqual(spr1.getImage(), null);
    strictEqual(spr1.getImageClipU1(), 0);
    strictEqual(spr1.getImageClipV1(), 0);
    strictEqual(spr1.getImageClipU2(), 1);
    strictEqual(spr1.getImageClipV2(), 1);
  });

  test('getPosition', function() {
    var spr1 = DivSugar.createSprite();
    var vec1 = new DivSugar.Vector(1, 2, 3);
    spr1.getPosition(vec1);
    deepEqual(vec1, DivSugar.Vector.ZERO);

    ok(spr1.getPosition(vec1).getPosition(vec1));
  });

  test('getTransform', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    spr1.getTransform(mat1);
    deepEqual(mat1, DivSugar.Matrix.UNIT);

    ok(spr1.getTransform(mat1).getTransform(mat1));
  });

  test('setSize', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setSize(10, 20);
    strictEqual(spr1.getWidth(), 10);
    strictEqual(spr1.getHeight(), 20);

    ok(spr1.setSize(1, 1).setSize(1, 1));
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

    ok(spr1.setSize(0, 0).setSize(vec1).setSize(1, 1));
  });

  test('setTransform', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.getTransform(mat2);
    deepEqual(mat2, mat1);

    ok(spr1.setTransform(mat1).setTransform(mat1));
  });

  test('setVisible', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setVisible(false);
    strictEqual(spr1.getVisible(), false);

    ok(spr1.setVisible(true).setVisible(true));
  });

  test('setClip', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setClip(true);
    strictEqual(spr1.getClip(), true);

    ok(spr1.setClip(true).setClip(true));
  });

  test('setOpacity', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setOpacity(0.5);
    strictEqual(spr1.getOpacity(), 0.5);

    ok(spr1.setOpacity(0).setOpacity(0));
  });

  test('setImage', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setImage('http://test.test');
    strictEqual(spr1.getImage(), 'http://test.test');

    ok(spr1.setImage(null).setImage(null));
  });

  test('setImageClip', function() {
    var spr1 = DivSugar.createSprite();
    spr1.setImageClip(0.1, 0.2, 0.3, 0.4);
    strictEqual(spr1.getImageClipU1(), 0.1);
    strictEqual(spr1.getImageClipV1(), 0.2);
    strictEqual(spr1.getImageClipU2(), 0.3);
    strictEqual(spr1.getImageClipV2(), 0.4);

    ok(spr1.setImageClip(0, 0, 0, 0).setImageClip(0, 0, 0, 0));
  });

  test('translate', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.translate(10, 20, 30);
    mat1.translate(10, 20, 30);
    spr1.getTransform(mat2);
    deepEqual(mat2, mat1);

    ok(spr1.translate(0, 0, 0).translate(0, 0, 0));
  });

  test('rotate', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.rotate(90, 0, 0);
    mat1.rotate(90, 0, 0);
    spr1.getTransform(mat2);
    nearlyEqual(mat2, mat1);

    var spr2 = DivSugar.createSprite();
    var mat3 = new DivSugar.Matrix();
    var mat4 = new DivSugar.Matrix();
    spr2.setTransform(mat3);
    spr2.rotate(0, 90, 0);
    mat3.rotate(0, 90, 0);
    spr2.getTransform(mat4);
    nearlyEqual(mat4, mat3);

    var spr3 = DivSugar.createSprite();
    var mat5 = new DivSugar.Matrix();
    var mat6 = new DivSugar.Matrix();
    spr3.setTransform(mat5);
    spr3.rotate(0, 0, 90);
    mat5.rotate(0, 0, 90);
    spr3.getTransform(mat6);
    nearlyEqual(mat6, mat5);

    ok(spr1.rotate(0, 0, 0).rotate(0, 0, 0));
  });

  test('scale', function() {
    var spr1 = DivSugar.createSprite();
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    spr1.setTransform(mat1);
    spr1.scale(10, 20, 30);
    mat1.scale(10, 20, 30);
    spr1.getTransform(mat2);
    deepEqual(mat2, mat1);

    ok(spr1.scale(1, 1, 1).scale(1, 1, 1));
  });
})();
