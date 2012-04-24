(function() {
  "use strict";

  module('Quaternion');

  test('constructor', function() {
    var quat1 = new DivSugar.Quaternion();
    strictEqual(quat1.x, 0);
    strictEqual(quat1.y, 0);
    strictEqual(quat1.z, 0);
    strictEqual(quat1.w, 0);

    var quat2 = new DivSugar.Quaternion(1, 2, 3, 4);
    strictEqual(quat2.x, 1);
    strictEqual(quat2.y, 2);
    strictEqual(quat2.z, 3);
    strictEqual(quat2.w, 4);

    var quat3 = new DivSugar.Quaternion(quat2);
    strictEqual(quat3.x, 1);
    strictEqual(quat3.y, 2);
    strictEqual(quat3.z, 3);
    strictEqual(quat3.w, 4);
  });

  test('set', function() {
    var quat1 = new DivSugar.Quaternion();
    quat1.set(1, 2, 3, 4);
    deepEqual(quat1, new DivSugar.Quaternion(1, 2, 3, 4));

    var quat2 = new DivSugar.Quaternion();
    quat2.set(quat1);
    deepEqual(quat2, new DivSugar.Quaternion(1, 2, 3, 4));

    ok(quat1.set(0, 0, 0, 0).set(quat2).set(1, 1, 1, 1));
  });

  test('fromMatrix', function() {
    var quat1 = new DivSugar.Quaternion();
    quat1.fromMatrix(DivSugar.Matrix.UNIT);
    deepEqual(quat1, new DivSugar.Quaternion(0, 0, 0, 1));

    ok(quat1.fromMatrix(DivSugar.Matrix.UNIT).fromMatrix(DivSugar.Matrix.UNIT));
  });

  test('slerp', function() {
    var quat1 = new DivSugar.Quaternion();
    var quat2 = new DivSugar.Quaternion();
    var quat3 = new DivSugar.Quaternion();

    for (var ratio = 0; ratio <= 1; ratio += 0.1) {
      quat1.fromMatrix(new DivSugar.Matrix(DivSugar.Matrix.UNIT));
      quat2.fromMatrix((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateX(90));
      quat3.fromMatrix((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateX(90 * ratio));
      quat1.slerp(quat2, ratio);
      nearlyEqual(quat1, quat3);

      quat1.fromMatrix(new DivSugar.Matrix(DivSugar.Matrix.UNIT));
      quat2.fromMatrix((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateY(90));
      quat3.fromMatrix((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateY(90 * ratio));
      quat1.slerp(quat2, ratio);
      nearlyEqual(quat1, quat3);

      quat1.fromMatrix(new DivSugar.Matrix(DivSugar.Matrix.UNIT));
      quat2.fromMatrix((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateZ(90));
      quat3.fromMatrix((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateZ(90 * ratio));
      quat1.slerp(quat2, ratio);
      nearlyEqual(quat1, quat3);
    }

    ok(quat1.slerp(quat2, 0).slerp(quat2, 0.5).slerp(quat2, 1).slerp(quat2, 0));
  });

  test('equal', function() {
    var quat1 = new DivSugar.Quaternion(1, 2, 3, 4);
    var quat2 = new DivSugar.Quaternion(quat1);
    ok(quat1.equal(quat2));

    quat2.set(1.1, 2, 3, 4);
    ok(!quat1.equal(quat2));

    quat2.set(1, 2.1, 3, 4);
    ok(!quat1.equal(quat2));

    quat2.set(1, 2, 3.1, 4);
    ok(!quat1.equal(quat2));

    quat2.set(1, 2, 3, 4.1);
    ok(!quat1.equal(quat2));
  });

  test('toString', function() {
    var quat1 = new DivSugar.Quaternion(1, 2, 3, 4);
    strictEqual(quat1.toString(), '(1, 2, 3, 4)');
  });
})();
