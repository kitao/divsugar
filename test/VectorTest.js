(function() {
  'use strict';

  module('Vector');

  test('constants', function() {
    deepEqual(DivSugar.Vector.ZERO, new DivSugar.Vector(0, 0, 0));
    deepEqual(DivSugar.Vector.X_UNIT, new DivSugar.Vector(1, 0, 0));
    deepEqual(DivSugar.Vector.Y_UNIT, new DivSugar.Vector(0, 1, 0));
    deepEqual(DivSugar.Vector.Z_UNIT, new DivSugar.Vector(0, 0, 1));
  });

  test('constructor', function() {
    var vec1 = new DivSugar.Vector();
    strictEqual(vec1.x, 0);
    strictEqual(vec1.y, 0);
    strictEqual(vec1.z, 0);

    var vec2 = new DivSugar.Vector(1, 2, 3);
    strictEqual(vec2.x, 1);
    strictEqual(vec2.y, 2);
    strictEqual(vec2.z, 3);

    var vec3 = new DivSugar.Vector(vec2);
    strictEqual(vec3.x, 1);
    strictEqual(vec3.y, 2);
    strictEqual(vec3.z, 3);

    throws(function() {
      var vec4 = new DivSugar.Vector(1, 2);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });
  });

  test('set', function() {
    var vec1 = new DivSugar.Vector();
    vec1.set(1, 2, 3);
    deepEqual(vec1, new DivSugar.Vector(1, 2, 3));

    var vec2 = new DivSugar.Vector();
    vec2.set(vec1);
    deepEqual(vec2, vec1);

    throws(function() {
      var vec3 = new DivSugar.Vector();
      vec3.set(1,2);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(vec1.set(0, 0, 0).set(vec2).set(1, 1, 1));
  });

  test('neg', function() {
    var vec = new DivSugar.Vector(1, 2, 3);
    vec.neg();
    deepEqual(vec, new DivSugar.Vector(-1, -2, -3));

    ok(vec.neg().neg());
  });

  test('add', function() {
    var vec1 = new DivSugar.Vector(1, 2, 3);
    var vec2 = new DivSugar.Vector(2, 3, 4);
    vec1.add(vec2);
    deepEqual(vec1, new DivSugar.Vector(3, 5, 7));

    ok(vec1.add(vec2).add(vec2));
  });

  test('sub', function() {
    var vec1 = new DivSugar.Vector(4, 5, 6);
    var vec2 = new DivSugar.Vector(3, 2, 1);
    vec1.sub(vec2);
    deepEqual(vec1, new DivSugar.Vector(1, 3, 5));

    ok(vec1.sub(vec2).sub(vec2));
  });

  test('mul', function() {
    var vec = new DivSugar.Vector(1, 2, 3);
    vec.mul(2);
    deepEqual(vec, new DivSugar.Vector(2, 4, 6));

    ok(vec.mul(1).mul(1));
  });

  test('div', function() {
    var vec = new DivSugar.Vector(2, 4, 6);
    vec.div(2);
    deepEqual(vec, new DivSugar.Vector(1, 2, 3));

    ok(vec.div(1).div(1));
  });

  test('norm', function() {
    var vec = new DivSugar.Vector(3, 4, 12);
    strictEqual(vec.norm(), 13);
  });

  test('sqNorm', function() {
    var vec = new DivSugar.Vector(1, 2, 3);
    strictEqual(vec.sqNorm(), 14);
  });

  test('dist', function() {
    var vec1 = new DivSugar.Vector(-1, -2, 3);
    var vec2 = new DivSugar.Vector(2, -6, 15);
    strictEqual(vec1.dist(vec2), 13);
  });

  test('sqDist', function() {
    var vec1 = new DivSugar.Vector(1, 2, 3);
    var vec2 = new DivSugar.Vector(3, 5, 7);
    strictEqual(vec1.sqDist(vec2), 29);
  });

  test('dot', function() {
    var vec1 = new DivSugar.Vector(1, -2, 3);
    var vec2 = new DivSugar.Vector(3, 4, 5);
    strictEqual(vec1.dot(vec2), 10);
  });

  test('cross', function() {
    var vec1 = new DivSugar.Vector(1, -2, 3);
    var vec2 = new DivSugar.Vector(3, 4, 5);
    vec1.cross(vec2);
    deepEqual(vec1, new DivSugar.Vector(-22, 4, 10));

    ok(vec1.cross(vec2).cross(vec2));
  });

  test('normalize', function() {
    var vec = new DivSugar.Vector();

    vec.set(3, 4, 12);
    vec.normalize();
    deepEqual(vec, new DivSugar.Vector(3/13, 4/13, 12/13));

    vec.set(0, 0, 0);
    vec.normalize();
    deepEqual(vec, new DivSugar.Vector(1, 0, 0));

    ok(vec.normalize().normalize());
  });

  test('rotate', function() {
    var vec = new DivSugar.Vector();

    vec.set(1, 2, 3);
    vec.rotate(90, 0, 0);
    nearlyEqual(vec, new DivSugar.Vector(1, -3, 2));

    vec.set(1, 2, 3);
    vec.rotate(0, 90, 0);
    nearlyEqual(vec, new DivSugar.Vector(3, 2, -1));

    vec.set(1, 2, 3);
    vec.rotate(0, 0, 90);
    nearlyEqual(vec, new DivSugar.Vector(-2, 1, 3));

    throws(function() {
      vec.rotate(90, 90);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(vec.rotate(0, 0, 0).rotate(0, 0, 0));
  });

  test('lerp', function() {
    var vec1 = new DivSugar.Vector();
    var vec2 = new DivSugar.Vector();

    vec1.set(1, 2, 3);
    vec2.set(-1, -2, -3);
    vec1.lerp(vec2, -1);
    deepEqual(vec1, new DivSugar.Vector(1, 2, 3));

    vec1.set(1, 2, 3);
    vec2.set(-1, -2, -3);
    vec1.lerp(vec2, 0.5);
    deepEqual(vec1, new DivSugar.Vector(0, 0, 0));

    vec1.set(1, 2, 3);
    vec2.set(-1, -2, -3);
    vec1.lerp(vec2, 2);
    deepEqual(vec1, new DivSugar.Vector(-1, -2, -3));

    ok(vec1.lerp(vec2, 1).lerp(vec2, 1));
  });

  test('toLocal', function() {
    var vec = new DivSugar.Vector(1, 2, 3);
    var mat = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    vec.toLocal(mat);
    deepEqual(vec, new DivSugar.Vector(297, 99, -198));

    ok(vec.toLocal(mat).toLocal(mat));
  });

  test('toGlobal', function() {
    var vec = new DivSugar.Vector(297, 99, -198);
    var mat = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    vec.toGlobal(mat);
    deepEqual(vec, new DivSugar.Vector(1, 2, 3));

    ok(vec.toGlobal(mat).toGlobal(mat));
  });

  test('toLocal_noTrans', function() {
    var vec = new DivSugar.Vector(1, 2, 3);
    var mat = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    vec.toLocal_noTrans(mat);
    deepEqual(vec, new DivSugar.Vector(-3, -1, 2));

    ok(vec.toLocal_noTrans(mat).toLocal_noTrans(mat));
  });

  test('toGlobal_noTrans', function() {
    var vec = new DivSugar.Vector(-3, -1, 2);
    var mat = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    vec.toGlobal_noTrans(mat);
    deepEqual(vec, new DivSugar.Vector(1, 2, 3));

    ok(vec.toGlobal_noTrans(mat).toGlobal_noTrans(mat));
  });

  test('equal', function() {
    var vec1 = new DivSugar.Vector();
    var vec2 = new DivSugar.Vector();

    vec1.set(1, 2, 3);
    vec2.set(vec1);
    ok(vec1.equal(vec2));

    vec2.set(1.1, 2, 3);
    ok(!vec1.equal(vec2));

    vec2.set(1, 2.1, 3);
    ok(!vec1.equal(vec2));

    vec2.set(1, 2, 3.1);
    ok(!vec1.equal(vec2));
  });

  test('toString', function() {
    var vec = new DivSugar.Vector(1, 2, 3);
    strictEqual(vec.toString(), '(1, 2, 3)');
  });
})();
