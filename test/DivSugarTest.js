(function() {
  'use strict';

  module('DivSugar');

  test('constants', function() {
    strictEqual(DivSugar.VERSION, '0.9.0');
    strictEqual(DivSugar.EPSILON, 0.0001);
    strictEqual(DivSugar.NUM_OF_DIGITS, 4);
    strictEqual(DivSugar.DEG_TO_RAD * 180, Math.PI);
    strictEqual(DivSugar.RAD_TO_DEG * Math.PI, 180);
  });

  test('properties', function() {
    strictEqual(DivSugar.rootTask instanceof DivSugar.Task, true);
    strictEqual(typeof DivSugar.browserPrefix, 'string');
  });

  test('inherit', function() {
    function Class1(a, b) {
      this.a = a;
      this.b = b;
      this.c = 123;
    }
    Class1.prototype.getValue = function() { return this.c; };

    function Class2(a, b) {
      this.constructor.uber.constructor(a * 10, b * 10);
      this.d = 456;
    }
    DivSugar.inherit(Class2, Class1);
    Class2.prototype.getValue = function() { return this.d; };
    Class2.prototype.getParentValue = function() { return this.constructor.uber.getValue(); };

    var ins1 = new Class1(1, 2);
    strictEqual(ins1.a, 1);
    strictEqual(ins1.b, 2);
    strictEqual(ins1.c, 123);
    strictEqual(ins1.getValue(), 123);

    var ins2 = new Class2(1, 2);
    strictEqual(ins2.a, 10);
    strictEqual(ins2.b, 20);
    strictEqual(ins2.c, 123);
    strictEqual(ins2.getValue(), 456);
    strictEqual(ins2.getParentValue(), 123);

    ok(DivSugar.inherit(Class2, Class1).inherit(Class2, Class1));
  });

  test('generateId', function() {
    strictEqual(DivSugar.generateId(), '_divsugar_id_1');
    strictEqual(DivSugar.generateId(), '_divsugar_id_2');
    strictEqual(DivSugar.generateId(), '_divsugar_id_3');
  });

  test('getImageSize', function() {
    DivSugar.getImageSize('../examples/assets/coin.png', function(width, height) {
      start();
      strictEqual(width, 400);
      strictEqual(height, 200);
    });
    stop();

    ok(DivSugar.getImageSize('', function() {}).getImageSize('', function() {}));
  });
})();
