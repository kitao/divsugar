module('Matrix');

test('constructor', function() {
  var mat1 = new DivSugar.Matrix();
  nearlyEqual(mat1.xAxis, DivSugar.Vector.ZERO);
  nearlyEqual(mat1.yAxis, DivSugar.Vector.ZERO);
  nearlyEqual(mat1.zAxis, DivSugar.Vector.ZERO);
  nearlyEqual(mat1.trans, DivSugar.Vector.ZERO);

  var mat2 = new DivSugar.Matrix(DivSugar.Vector.ZERO, DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT);
  nearlyEqual(mat2.xAxis, DivSugar.Vector.ZERO);
  nearlyEqual(mat2.yAxis, DivSugar.Vector.X_UNIT);
  nearlyEqual(mat2.zAxis, DivSugar.Vector.Y_UNIT);
  nearlyEqual(mat2.trans, DivSugar.Vector.Z_UNIT);

  var mat3 = new DivSugar.Matrix(mat2);
  nearlyEqual(mat3.xAxis, DivSugar.Vector.ZERO);
  nearlyEqual(mat3.yAxis, DivSugar.Vector.X_UNIT);
  nearlyEqual(mat3.zAxis, DivSugar.Vector.Y_UNIT);
  nearlyEqual(mat3.trans, DivSugar.Vector.Z_UNIT);
});

test('set', function() {
  var mat1 = new DivSugar.Matrix();
  mat1.set(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.X_UNIT);
  deepEqual(mat1, new DivSugar.Matrix(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.X_UNIT));

  var mat2 = new DivSugar.Matrix();
  mat2.set(mat1).set(mat1);
  deepEqual(mat2, new DivSugar.Matrix(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.X_UNIT));
});

    /* fromQuaternion */
    assertEquals_object(DivSugar.Matrix.UNIT, mat1.fromQuaternion(new b9.Quaternion(0.0, 0.0, 0.0, 1.0)));

    /* orthonormalize */
    mat1.set(
            new DivSugar.Vector(0.1, 0.2, 0.3),
            new DivSugar.Vector(0.0, 3.0, 3.0),
            new DivSugar.Vector(0.0, 0.0, 0.1),
            DivSugar.Vector.X_UNIT);
    assertEquals_object(
            new DivSugar.Matrix(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.X_UNIT),
            mat1.orthonormalize());

    /* rotateX_float */
    mat1.set(
            new DivSugar.Vector(0.0, 0.0, -1.0),
            new DivSugar.Vector(-1.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, 1.0, 0.0),
            new DivSugar.Vector(100.0, 200.0, 300.0));
    assertEquals_object(
            new DivSugar.Matrix(
                new DivSugar.Vector(0.0, 0.0, -1.0),
                new DivSugar.Vector(0.0, 1.0, 0.0),
                new DivSugar.Vector(1.0, 0.0, 0.0),
                new DivSugar.Vector(100.0, 200.0, 300.0)),
            mat1.rotateX_float(90.0));

    /* rotateY_float */
    mat1.set(
            new DivSugar.Vector(0.0, 0.0, -1.0),
            new DivSugar.Vector(-1.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, 1.0, 0.0),
            new DivSugar.Vector(100.0, 200.0, 300.0));
    assertEquals_object(
            new DivSugar.Matrix(
                new DivSugar.Vector(0.0, -1.0, 0.0),
                new DivSugar.Vector(-1.0, 0.0, 0.0),
                new DivSugar.Vector(0.0, 0.0, -1.0),
                new DivSugar.Vector(100.0, 200.0, 300.0)),
            mat1.rotateY_float(90.0));

    /* rotateZ_float */
    mat1.set(
            new DivSugar.Vector(0.0, 0.0, -1.0),
            new DivSugar.Vector(-1.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, 1.0, 0.0),
            new DivSugar.Vector(100.0, 200.0, 300.0));
    assertEquals_object(
            new DivSugar.Matrix(
                new DivSugar.Vector(-1.0, 0.0, 0.0),
                new DivSugar.Vector(0.0, 0.0, 1.0),
                new DivSugar.Vector(0.0, 1.0, 0.0),
                new DivSugar.Vector(100.0, 200.0, 300.0)),
            mat1.rotateZ_float(90.0));

    /* scale */
    mat1.set(
            new DivSugar.Vector(0.0, 0.0, -1.0),
            new DivSugar.Vector(-1.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, 1.0, 0.0),
            new DivSugar.Vector(100.0, 200.0, 300.0));
    assertEquals_object(
            new DivSugar.Matrix(
                new DivSugar.Vector(0.0, 0.0, -2.0),
                new DivSugar.Vector(-3.0, 0.0, 0.0),
                new DivSugar.Vector(0.0, -1.0, 0.0),
                new DivSugar.Vector(100.0, 200.0, 300.0)),
            mat1.scale(2.0, 3.0, -1.0));

    /* translate */
    mat1.set(
            new DivSugar.Vector(0.0, 0.0, -1.0),
            new DivSugar.Vector(-1.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, 1.0, 0.0),
            new DivSugar.Vector(100.0, 200.0, 300.0));
    assertEquals_object(
            new DivSugar.Matrix(
                new DivSugar.Vector(0.0, 0.0, -1.0),
                new DivSugar.Vector(-1.0, 0.0, 0.0),
                new DivSugar.Vector(0.0, 1.0, 0.0),
                new DivSugar.Vector(120.0, 230.0, 290.0)),
            mat1.translate(10.0, -20.0, 30.0));

    /* slerp */
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        mat1.set(DivSugar.Matrix.UNIT);
        mat2.set(DivSugar.Matrix.UNIT).translate(2.0, 4.0, 6.0).rotateX_int(90);
        mat3.set(DivSugar.Matrix.UNIT).translate(2.0 * ratio, 4.0 * ratio, 6.0 * ratio).rotateX_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp(mat2, ratio));

        mat1.set(DivSugar.Matrix.UNIT);
        mat2.set(DivSugar.Matrix.UNIT).translate(2.0, 4.0, 6.0).rotateY_int(90);
        mat3.set(DivSugar.Matrix.UNIT).translate(2.0 * ratio, 4.0 * ratio, 6.0 * ratio).rotateY_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp(mat2, ratio));

        mat1.set(DivSugar.Matrix.UNIT);
        mat2.set(DivSugar.Matrix.UNIT).translate(2.0, 4.0, 6.0).rotateZ_int(90);
        mat3.set(DivSugar.Matrix.UNIT).translate(2.0 * ratio, 4.0 * ratio, 6.0 * ratio).rotateZ_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp(mat2, ratio));
    }

    /* slerp_noTrans */
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        mat1.set(DivSugar.Matrix.UNIT).translate(1.0, 2.0, 3.0);
        mat2.set(DivSugar.Matrix.UNIT).translate(2.0, 4.0, 6.0).rotateX_int(90);
        mat3.set(DivSugar.Matrix.UNIT).rotateX_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp_noTrans(mat2, ratio));

        mat1.set(DivSugar.Matrix.UNIT).translate(1.0, 2.0, 3.0);
        mat2.set(DivSugar.Matrix.UNIT).translate(2.0, 4.0, 6.0).rotateY_int(90);
        mat3.set(DivSugar.Matrix.UNIT).rotateY_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp_noTrans(mat2, ratio));

        mat1.set(DivSugar.Matrix.UNIT).translate(1.0, 2.0, 3.0);
        mat2.set(DivSugar.Matrix.UNIT).translate(2.0, 4.0, 6.0).rotateZ_int(90);
        mat3.set(DivSugar.Matrix.UNIT).rotateZ_float(90.0 * ratio);
        assertEquals_object(mat3, mat1.slerp_noTrans(mat2, ratio));
    }

    /* toLocal */
    mat1.set(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, new DivSugar.Vector(3.0, 4.0, 5.0));
    mat2.set(
            new DivSugar.Vector(0.0, 0.0, 0.5),
            new DivSugar.Vector(2.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, -0.5, 0.0),
            new DivSugar.Vector(1.0, 2.0, 3.0));
    assertEquals_object(
            new DivSugar.Matrix(
                new DivSugar.Vector(0.0, 0.5, 0.0),
                new DivSugar.Vector(0.0, 0.0, -2.0),
                new DivSugar.Vector(2.0, 0.0, 0.0),
                new DivSugar.Vector(4.0, 1.0, -4.0)),
            mat1.toLocal(mat2));

    /* toGlobal */
    mat1.set(
            new DivSugar.Vector(0.0, 0.5, 0.0),
            new DivSugar.Vector(0.0, 0.0, -2.0),
            new DivSugar.Vector(2.0, 0.0, 0.0),
            new DivSugar.Vector(4.0, 1.0, -4.0));
    mat2.set(
            new DivSugar.Vector(0.0, 0.0, 0.5),
            new DivSugar.Vector(2.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, -0.5, 0.0),
            new DivSugar.Vector(1.0, 2.0, 3.0));
    assertEquals_object(
            new DivSugar.Matrix(
                DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, new DivSugar.Vector(3.0, 4.0, 5.0)),
            mat1.toGlobal(mat2));

    /* toLocal_noTrans */
    mat1.set(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, new DivSugar.Vector(3.0, 4.0, 5.0));
    mat2.set(
            new DivSugar.Vector(0.0, 0.0, 0.5),
            new DivSugar.Vector(2.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, -0.5, 0.0),
            new DivSugar.Vector(1.0, 2.0, 3.0));
    assertEquals_object(
            new DivSugar.Matrix(
                new DivSugar.Vector(0.0, 0.5, 0.0),
                new DivSugar.Vector(0.0, 0.0, -2.0),
                new DivSugar.Vector(2.0, 0.0, 0.0),
                new DivSugar.Vector(0.0, 0.0, 0.0)),
            mat1.toLocal_noTrans(mat2));

    /* toGlobal_noTrans */
    mat1.set(
            new DivSugar.Vector(0.0, 0.5, 0.0),
            new DivSugar.Vector(0.0, 0.0, -2.0),
            new DivSugar.Vector(2.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, 0.0, 0.0));
    mat2.set(
            new DivSugar.Vector(0.0, 0.0, 0.5),
            new DivSugar.Vector(2.0, 0.0, 0.0),
            new DivSugar.Vector(0.0, -0.5, 0.0),
            new DivSugar.Vector(1.0, 2.0, 3.0));
    assertEquals_object(
            new DivSugar.Matrix(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.ZERO),
            mat1.toGlobal_noTrans(mat2));

    /* lookAt */
    assertEquals_object(
            new DivSugar.Matrix(
                new DivSugar.Vector(0.0, 1.0, 0.0),
                new DivSugar.Vector(0.0, 0.0, 1.0),
                new DivSugar.Vector(1.0, 0.0, 0.0),
                new DivSugar.Vector(5.0, 2.0, -3.0)),
            mat1.lookAt(
                new DivSugar.Vector(5.0, 2.0, -3.0), new DivSugar.Vector(-5.0, 2.0, -3.0), new DivSugar.Vector(1.0, 0.0, 10.0)));

    /* toArray */
    array1 = [];
    array2 = [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0];

    mat1 = new DivSugar.Matrix(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.X_UNIT);
    mat1.toArray(array1);

    for (i = 0; i < 16; i++) {
        assertEquals_float(array2[i], array1[i]);
    }

    /* mulArray */
    array1 = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0];
    array2 = [2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 1.0];
    array3 = [];

    DivSugar.Matrix.mulArray(array1, array2, array3);
    DivSugar.Matrix.mulArray(array1, array1, array1);

    array4 = [118.0, 132.0, 146.0, 160.0, 230.0, 260.0, 290.0, 320.0,
           342.0, 388.0, 434.0, 480.0, 246.0, 292.0, 338.0, 384.0];

    array5 = [90.0, 100.0, 110.0, 120.0, 202.0, 228.0, 254.0, 280.0,
           314.0, 356.0, 398.0, 440.0, 426.0, 484.0, 542.0, 600.0];

    for (i = 0; i < 16; i++) {
        assertEquals_float(array4[i], array3[i]);
        assertEquals_float(array5[i], array1[i]);
    }

    /* equals */
    mat1.set(DivSugar.Matrix.UNIT);
    mat2.set(mat1);
    assertTrue(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.xAxis.set(DivSugar.Vector.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.yAxis.set(DivSugar.Vector.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.zAxis.set(DivSugar.Vector.ZERO);
    assertFalse(mat1.equals(mat2));

    mat2.set(mat1);
    mat2.trans.set(DivSugar.Vector.X_UNIT);
    assertFalse(mat1.equals(mat2));

    /* toString */
    assertEquals("((1, 0, 0), (0, 1, 0), (0, 0, 1), (0, 0, 0))", DivSugar.Matrix.UNIT.toString());

    /* UNIT */
    assertEquals_object(
            new DivSugar.Matrix(DivSugar.Vector.X_UNIT, DivSugar.Vector.Y_UNIT, DivSugar.Vector.Z_UNIT, DivSugar.Vector.ZERO),
            DivSugar.Matrix.UNIT);

