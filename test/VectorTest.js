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
  });

  test('set', function() {
    var vec1 = new DivSugar.Vector();
    vec1.set(1, 2, 3);
    deepEqual(vec1, new DivSugar.Vector(1, 2, 3));

    var vec2 = new DivSugar.Vector();
    vec2.set(vec1);
    deepEqual(vec2, vec1);

    ok(vec1.set(0, 0, 0).set(vec2).set(1, 1, 1));
  });

  test('neg', function() {
    var vec1 = new DivSugar.Vector(1, 2, 3);
    vec1.neg();
    deepEqual(vec1, new DivSugar.Vector(-1, -2, -3));

    ok(vec1.neg().neg());
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
    var vec1 = new DivSugar.Vector(1, 2, 3);
    vec1.mul(2);
    deepEqual(vec1, new DivSugar.Vector(2, 4, 6));

    ok(vec1.mul(1).mul(1));
  });

  test('div', function() {
    var vec1 = new DivSugar.Vector(2, 4, 6);
    vec1.div(2);
    deepEqual(vec1, new DivSugar.Vector(1, 2, 3));

    ok(vec1.div(1).div(1));
  });

  test('norm', function() {
    var vec1 = new DivSugar.Vector(3, 4, 12);
    strictEqual(vec1.norm(), 13);
  });

  test('sqNorm', function() {
    var vec1 = new DivSugar.Vector(1, 2, 3);
    strictEqual(vec1.sqNorm(), 14);
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
    var vec1 = new DivSugar.Vector();

    vec1.set(3, 4, 12);
    vec1.normalize();
    deepEqual(vec1, new DivSugar.Vector(3/13, 4/13, 12/13));

    vec1.set(0, 0, 0);
    vec1.normalize();
    deepEqual(vec1, new DivSugar.Vector(1, 0, 0));

    ok(vec1.normalize().normalize());
  });

  test('rotateX', function() {
    var vec1 = new DivSugar.Vector(1, 2, 3);
    vec1.rotateX(90);
    nearlyEqual(vec1, new DivSugar.Vector(1, -3, 2));

    ok(vec1.rotateX(0).rotateX(0));
  });

  test('rotateY', function() {
    var vec1 = new DivSugar.Vector(1, 2, 3);
    vec1.rotateY(90);
    nearlyEqual(vec1, new DivSugar.Vector(3, 2, -1));

    ok(vec1.rotateY(0).rotateY(0));
  });

  test('rotateZ', function() {
    var vec1 = new DivSugar.Vector(1, 2, 3);
    vec1.rotateZ(90);
    nearlyEqual(vec1, new DivSugar.Vector(-2, 1, 3));

    ok(vec1.rotateZ(0).rotateZ(0));
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
    var vec1 = new DivSugar.Vector(1, 2, 3);
    var mat1 = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    vec1.toLocal(mat1);
    deepEqual(vec1, new DivSugar.Vector(297, 99, -198));

    ok(vec1.toLocal(mat1).toLocal(mat1));
  });

  test('toGlobal', function() {
    var vec1 = new DivSugar.Vector(297, 99, -198);
    var mat1 = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    vec1.toGlobal(mat1);
    deepEqual(vec1, new DivSugar.Vector(1, 2, 3));

    ok(vec1.toGlobal(mat1).toGlobal(mat1));
  });

  test('toLocal_noTrans', function() {
    var vec1 = new DivSugar.Vector(1, 2, 3);
    var mat1 = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    vec1.toLocal_noTrans(mat1);
    deepEqual(vec1, new DivSugar.Vector(-3, -1, 2));

    ok(vec1.toLocal_noTrans(mat1).toLocal_noTrans(mat1));
  });

  test('toGlobal_noTrans', function() {
    var vec1 = new DivSugar.Vector(-3, -1, 2);
    var mat1 = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    vec1.toGlobal_noTrans(mat1);
    deepEqual(vec1, new DivSugar.Vector(1, 2, 3));

    ok(vec1.toGlobal_noTrans(mat1).toGlobal_noTrans(mat1));
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
    var vec1 = new DivSugar.Vector(1, 2, 3);
    strictEqual(vec1.toString(), '(1, 2, 3)');
  });
})();
