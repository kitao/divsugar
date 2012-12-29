(function() {
  'use strict';

  module('DivSugar');

  test('constants', function() {
    strictEqual(DivSugar.VERSION, '1.2.0');
    strictEqual(DivSugar.EPSILON, 0.0001);
    strictEqual(DivSugar.NUM_OF_DIGITS, 4);
    strictEqual(DivSugar.DEG_TO_RAD * 180, Math.PI);
    strictEqual(DivSugar.RAD_TO_DEG * Math.PI, 180);
  });

  test('properties', function() {
    strictEqual(DivSugar.rootTask instanceof DivSugar.Task, true);
  });

  test('getFrameCount', function() {
    var frameCount1 = DivSugar.getFrameCount();
    ok(frameCount1 >= 0);

    setTimeout(function() {
      var frameCount2 = DivSugar.getFrameCount();
      start();
      ok(frameCount2 > frameCount1);
    }, 100);
    stop();
  });

  test('getKeyState', function() {
    strictEqual(typeof DivSugar.getKeyState(64, 'on'), 'boolean');
    strictEqual(typeof DivSugar.getKeyState(64, 'off'), 'boolean');
    strictEqual(typeof DivSugar.getKeyState(64, 'pressed'), 'boolean');
    strictEqual(typeof DivSugar.getKeyState(64, 'released'), 'boolean');

    raises(function() {
      DivSugar.getKeyState(64, 'dummy');
    }, function(e) {
      strictEqual(e, "DivSugar: Unknown key state 'dummy'");
      return true;
    });
  });

  test('getMouseX and getMouseY', function() {
    strictEqual(typeof DivSugar.getMouseX(), 'number');
    strictEqual(typeof DivSugar.getMouseY(), 'number');
  });

  test('getMouseState', function() {
    strictEqual(typeof DivSugar.getMouseState(0, 'on'), 'boolean');
    strictEqual(typeof DivSugar.getMouseState(0, 'off'), 'boolean');
    strictEqual(typeof DivSugar.getMouseState(0, 'pressed'), 'boolean');
    strictEqual(typeof DivSugar.getMouseState(0, 'released'), 'boolean');

    raises(function() {
      DivSugar.getMouseState(0, 'dummy');
    }, function(e) {
      strictEqual(e, "DivSugar: Unknown mouse state 'dummy'");
      return true;
    });
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

  test('getCSSColor', function() {
    strictEqual(DivSugar.getCSSColor(16, 17, 18), '#101112');
    strictEqual(DivSugar.getCSSColor(10.1, 10.2, 10.3), '#0a0a0a');
    strictEqual(DivSugar.getCSSColor(10.7, 10.8, 10.9), '#0b0b0b');
    strictEqual(DivSugar.getCSSColor(-1, -2, -3), '#000000');
    strictEqual(DivSugar.getCSSColor(301, 302, 303), '#ffffff');
  });
})();
