(function() {
  'use strict';

  module('Matrix');

  test('constants', function() {
    deepEqual(DivSugar.Matrix.UNIT, new DivSugar.Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0));
  });

  test('constructor', function() {
    var mat1 = new DivSugar.Matrix();
    deepEqual(mat1.xAxis, DivSugar.Vector.X_UNIT);
    deepEqual(mat1.yAxis, DivSugar.Vector.Y_UNIT);
    deepEqual(mat1.zAxis, DivSugar.Vector.Z_UNIT);
    deepEqual(mat1.trans, DivSugar.Vector.ZERO);

    var mat2 = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    deepEqual(mat2.xAxis, new DivSugar.Vector(1, 2, 3));
    deepEqual(mat2.yAxis, new DivSugar.Vector(4, 5, 6));
    deepEqual(mat2.zAxis, new DivSugar.Vector(7, 8, 9));
    deepEqual(mat2.trans, new DivSugar.Vector(10, 11, 12));

    var mat3 = new DivSugar.Matrix(mat2);
    deepEqual(mat3.xAxis, new DivSugar.Vector(1, 2, 3));
    deepEqual(mat3.yAxis, new DivSugar.Vector(4, 5, 6));
    deepEqual(mat3.zAxis, new DivSugar.Vector(7, 8, 9));
    deepEqual(mat3.trans, new DivSugar.Vector(10, 11, 12));

    raises(function() {
      var mat4 = new DivSugar.Matrix(1, 2);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });
  });

  test('set', function() {
    var mat1 = new DivSugar.Matrix();
    mat1.set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    deepEqual(mat1, new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));

    var mat2 = new DivSugar.Matrix();
    mat2.set(mat1);
    deepEqual(mat2, mat1);

    raises(function() {
      var mat3 = new DivSugar.Matrix();
      mat3.set(1,2);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(mat1.set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).set(mat2).set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12));
  });

  test('fromQuaternion', function() {
    var quat = new DivSugar.Quaternion(0, 0, 0, 1);
    var mat = new DivSugar.Matrix();
    mat.fromQuaternion(quat);
    deepEqual(mat, DivSugar.Matrix.UNIT);

    ok(mat.fromQuaternion(quat).fromQuaternion(quat));
  });

  test('orthonormalize', function() {
    var mat = new DivSugar.Matrix(0.1, 0.2, 0.3, 0, 3, 3, 0, 0, 0.1, 1, 0, 0);
    mat.orthonormalize();
    deepEqual(mat, new DivSugar.Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0));

    ok(mat.orthonormalize().orthonormalize());
  });

  test('translate', function() {
    var mat = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.translate(10, -20, 30);
    deepEqual(mat, new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 120, 230, 290));

    raises(function() {
      mat.translate(1, 2);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(mat.translate(0, 0, 0).translate(0, 0, 0));
  });

  test('rotate', function() {
    var mat = new DivSugar.Matrix();

    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotate(90, 0, 0);
    nearlyEqual(mat, new DivSugar.Matrix(0, 0, -1, 0, 1, 0, 1, 0, 0, 100, 200, 300));

    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotate(0, 90, 0);
    nearlyEqual(mat, new DivSugar.Matrix(0, -1, 0, -1, 0, 0, 0, 0, -1, 100, 200, 300));

    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotate(0, 0, 90);
    nearlyEqual(mat, new DivSugar.Matrix(-1, 0, 0, 0, 0, 1, 0, 1, 0, 100, 200, 300));

    raises(function() {
      mat.rotate(90, 90);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(mat.rotate(0, 0, 0).rotate(0, 0, 0));
  });

  test('rotateAround', function() {
    var vec1 = new DivSugar.Vector();
    var vec2 = new DivSugar.Vector();
    var mat = new DivSugar.Matrix();

    vec1.set(1, 0, 0);
    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotateAround(vec1, 90);
    nearlyEqual(mat, new DivSugar.Matrix(0, 0, -1, 0, 1, 0, 1, 0, 0, 100, 200, 300));

    vec1.set(0, 1, 0);
    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotateAround(vec1, 90);
    nearlyEqual(mat, new DivSugar.Matrix(0, -1, 0, -1, 0, 0, 0, 0, -1, 100, 200, 300));

    vec1.set(0, 0, 1);
    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotateAround(vec1, 90);
    nearlyEqual(mat, new DivSugar.Matrix(-1, 0, 0, 0, 0, 1, 0, 1, 0, 100, 200, 300));

    vec1.set(10, 20, 30);
    vec2.set(1, 0, 0);
    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotateAround(vec1, vec2, 90);
    nearlyEqual(mat, new DivSugar.Matrix(0, 0, -1, 0, 1, 0, 1, 0, 0, 190, -70, 300));

    vec1.set(10, 20, 30);
    vec2.set(0, 1, 0);
    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotateAround(vec1, vec2, 90);
    nearlyEqual(mat, new DivSugar.Matrix(0, -1, 0, -1, 0, 0, 0, 0, -1, 100, 290, -150));

    vec1.set(10, 20, 30);
    vec2.set(0, 0, 1);
    mat.set(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.rotateAround(vec1, vec2, 90);
    nearlyEqual(mat, new DivSugar.Matrix(-1, 0, 0, 0, 0, 1, 0, 1, 0, 280, 200, -60));

    raises(function() {
      mat.rotateAround(vec1);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    raises(function() {
      mat.rotateAround(vec1, vec2, 0, 0);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(mat.rotateAround(vec2, 0).rotateAround(vec1, vec2, 0).rotateAround(vec2, 0));
  });

  test('scale', function() {
    var mat = new DivSugar.Matrix(0, 0, -1, -1, 0, 0, 0, 1, 0, 100, 200, 300);
    mat.scale(2, 3, -1);
    deepEqual(mat, new DivSugar.Matrix(0, 0, -2, -3, 0, 0, 0, -1, 0, 100, 200, 300));

    raises(function() {
      mat.scale(2, 3);
    }, function(e) {
      strictEqual(e, 'DivSugar: Invalid number of arguments');
      return true;
    });

    ok(mat.scale(1, 1, 1).scale(1, 1, 1));
  });

  test('slerp', function() {
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    var mat3 = new DivSugar.Matrix();

    for (var ratio = 0; ratio <= 1; ratio += 0.1) {
      mat1.set(DivSugar.Matrix.UNIT);
      mat2.set(DivSugar.Matrix.UNIT).translate(2, 4, 6).rotate(90, 0, 0);
      mat3.set(DivSugar.Matrix.UNIT).translate(2 * ratio, 4 * ratio, 6 * ratio).rotate(90 * ratio, 0, 0);
      mat1.slerp(mat2, ratio);
      nearlyEqual(mat1, mat3);

      mat1.set(DivSugar.Matrix.UNIT);
      mat2.set(DivSugar.Matrix.UNIT).translate(2, 4, 6).rotate(0, 90, 0);
      mat3.set(DivSugar.Matrix.UNIT).translate(2 * ratio, 4 * ratio, 6 * ratio).rotate(0, 90 * ratio, 0);
      mat1.slerp(mat2, ratio);
      nearlyEqual(mat1, mat3);

      mat1.set(DivSugar.Matrix.UNIT);
      mat2.set(DivSugar.Matrix.UNIT).translate(2, 4, 6).rotate(0, 0, 90);
      mat3.set(DivSugar.Matrix.UNIT).translate(2 * ratio, 4 * ratio, 6 * ratio).rotate(0, 0, 90 * ratio);
      mat1.slerp(mat2, ratio);
      nearlyEqual(mat1, mat3);
    }

    ok(mat1.slerp(mat2, 0).slerp(mat2, 0.5).slerp(mat2, 1).slerp(mat2, 0));
  });

  test('slerp_noTrans', function() {
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();
    var mat3 = new DivSugar.Matrix();

    for (var ratio = 0; ratio <= 1; ratio += 0.1) {
      mat1.set(DivSugar.Matrix.UNIT).translate(1, 2, 3);
      mat2.set(DivSugar.Matrix.UNIT).translate(2, 4, 6).rotate(90, 0, 0);
      mat3.set(DivSugar.Matrix.UNIT).rotate(90 * ratio, 0, 0);
      mat1.slerp_noTrans(mat2, ratio);
      nearlyEqual(mat1, mat3);

      mat1.set(DivSugar.Matrix.UNIT).translate(1, 2, 3);
      mat2.set(DivSugar.Matrix.UNIT).translate(2, 4, 6).rotate(0, 90, 0);
      mat3.set(DivSugar.Matrix.UNIT).rotate(0, 90 * ratio, 0);
      mat1.slerp_noTrans(mat2, ratio);
      nearlyEqual(mat1, mat3);

      mat1.set(DivSugar.Matrix.UNIT).translate(1, 2, 3);
      mat2.set(DivSugar.Matrix.UNIT).translate(2, 4, 6).rotate(0, 0, 90);
      mat3.set(DivSugar.Matrix.UNIT).rotate(0, 0, 90 * ratio);
      mat1.slerp_noTrans(mat2, ratio);
      nearlyEqual(mat1, mat3);
    }

    ok(mat1.slerp_noTrans(mat2, 0).slerp_noTrans(mat2, 0.5).slerp_noTrans(mat2, 1).slerp_noTrans(mat2, 0));
  });

  test('toLocal', function() {
    var mat1 = new DivSugar.Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1, 3, 4, 5);
    var mat2 = new DivSugar.Matrix(0, 0, 0.5, 2, 0, 0, 0, -0.5, 0, 1, 2, 3);
    mat1.toLocal(mat2);
    deepEqual(mat1, new DivSugar.Matrix(0, 0.5, 0, 0, 0, -2, 2, 0, 0, 4, 1, -4));

    ok(mat1.toLocal(mat2).toLocal(mat2));
  });

  test('toGlobal', function() {
    var mat1 = new DivSugar.Matrix(0, 0.5, 0, 0, 0, -2, 2, 0, 0, 4, 1, -4);
    var mat2 = new DivSugar.Matrix(0, 0, 0.5, 2, 0, 0, 0, -0.5, 0, 1, 2, 3);
    mat1.toGlobal(mat2);
    deepEqual(mat1, new DivSugar.Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1, 3, 4, 5));

    ok(mat1.toGlobal(mat2).toGlobal(mat2));
  });

  test('toLocal_noTrans', function() {
    var mat1 = new DivSugar.Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1, 3, 4, 5);
    var mat2 = new DivSugar.Matrix(0, 0, 0.5, 2, 0, 0, 0, -0.5, 0, 1, 2, 3);
    mat1.toLocal_noTrans(mat2);
    deepEqual(mat1, new DivSugar.Matrix(0, 0.5, 0, 0, 0, -2, 2, 0, 0, 0, 0, 0));

    ok(mat1.toLocal_noTrans(mat2).toLocal_noTrans(mat2));
  });

  test('toGlobal_noTrans', function() {
    var mat1 = new DivSugar.Matrix(0, 0.5, 0, 0, 0, -2, 2, 0, 0, 0, 0, 0);
    var mat2 = new DivSugar.Matrix(0, 0, 0.5, 2, 0, 0, 0, -0.5, 0, 1, 2, 3);
    mat1.toGlobal_noTrans(mat2);
    deepEqual(mat1, new DivSugar.Matrix(1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0));

    ok(mat1.toGlobal_noTrans(mat2).toGlobal_noTrans(mat2));
  });

  test('lookAt', function() {
    var mat = new DivSugar.Matrix();
    mat.lookAt(new DivSugar.Vector(5, 2, -3), new DivSugar.Vector(-5, 2, -3), new DivSugar.Vector(1, 0, 10));
    deepEqual(mat, new DivSugar.Matrix(0, 1, 0, 0, 0, 1, 1, 0, 0, 5, 2, -3));

    ok(mat.lookAt(DivSugar.Vector.ZERO, DivSugar.Vector.Z_UNIT, DivSugar.Vector.Y_UNIT)
      .lookAt(DivSugar.Vector.ZERO, DivSugar.Vector.Z_UNIT, DivSugar.Vector.Y_UNIT));
  });

  test('equal', function() {
    var mat1 = new DivSugar.Matrix();
    var mat2 = new DivSugar.Matrix();

    mat1.set(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    mat2.set(mat1);
    ok(mat1.equal(mat2));

    mat2.set(mat1);
    mat2.xAxis.x += 0.1;
    ok(!mat1.equal(mat2));

    mat2.set(mat1);
    mat2.yAxis.y += 0.1;
    ok(!mat1.equal(mat2));

    mat2.set(mat1);
    mat2.zAxis.z += 0.1;
    ok(!mat1.equal(mat2));

    mat2.set(mat1);
    mat2.trans.x += 0.1;
    ok(!mat1.equal(mat2));
  });

  test('toString', function() {
    var mat = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    strictEqual(mat.toString(), '((1, 2, 3), (4, 5, 6), (7, 8, 9), (10, 11, 12))');
  });

  test('toCSSTransform2D', function() {
    var mat = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    strictEqual(mat.toCSSTransform2D(),
      'matrix(1.0000, 2.0000, 4.0000, 5.0000, 10.0000, 11.0000)');
  });

  test('toCSSTransform3D', function() {
    var mat = new DivSugar.Matrix(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
    strictEqual(mat.toCSSTransform3D(),
      'matrix3d(1.0000, 2.0000, 3.0000, 0, 4.0000, 5.0000, 6.0000, 0, 7.0000, 8.0000, 9.0000, 0, 10.0000, 11.0000, 12.0000, 1)');
  });
})();
