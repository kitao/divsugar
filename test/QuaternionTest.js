module('Quaternion');

    quat1 = new b9.Quaternion();

    quat2 = new b9.Quaternion(1.0, 2.0, 3.0, 4.0);
    assertTrue(quat2.x === 1.0 && quat2.y === 2.0 && quat2.z === 3.0 && quat2.w === 4.0);

    quat3 = new b9.Quaternion(quat2);
    assertTrue(quat3.x === 1.0 && quat3.y === 2.0 && quat3.z === 3.0 && quat3.w === 4.0);

    /* set */
    assertEquals_object(new b9.Quaternion(3.0, 4.0, 5.0, 6.0), quat1.set(3.0, 4.0, 5.0, 6.0));
    assertEquals_object(quat1, quat2.set(quat1));

    /* fromMatrix3D */
    assertEquals_object(new b9.Quaternion(0.0, 0.0, 0.0, 1.0), quat1.fromMatrix3D(DivSugar.Matrix.UNIT));

    /* slerp */
    for (ratio = 0.0; ratio <= 1.0; ratio += 0.5) {
        quat1.fromMatrix3D(new DivSugar.Matrix(DivSugar.Matrix.UNIT));
        quat2.fromMatrix3D((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateX_int(90));
        quat3.fromMatrix3D((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateX_float(90.0 * ratio));
        assertEquals_object(quat3, quat1.slerp(quat2, ratio));

        quat1.fromMatrix3D(new DivSugar.Matrix(DivSugar.Matrix.UNIT));
        quat2.fromMatrix3D((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateY_int(90));
        quat3.fromMatrix3D((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateY_float(90.0 * ratio));
        assertEquals_object(quat3, quat1.slerp(quat2, ratio));

        quat1.fromMatrix3D(new DivSugar.Matrix(DivSugar.Matrix.UNIT));
        quat2.fromMatrix3D((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateZ_int(90));
        quat3.fromMatrix3D((new DivSugar.Matrix(DivSugar.Matrix.UNIT)).rotateZ_float(90.0 * ratio));
        assertEquals_object(quat3, quat1.slerp(quat2, ratio));
    }

    /* equals */
    quat1.set(1.0, 2.0, 3.0, 4.0);
    quat2.set(quat1);
    assertTrue(quat1.equals(quat2));

    quat2.set(1.1, 2.0, 3.0, 4.0);
    assertFalse(quat1.equals(quat2));

    quat2.set(1.0, 2.1, 3.0, 4.0);
    assertFalse(quat1.equals(quat2));

    quat2.set(1.0, 2.0, 3.1, 4.0);
    assertFalse(quat1.equals(quat2));

    quat2.set(1.0, 2.0, 3.0, 4.1);
    assertFalse(quat1.equals(quat2));

    /* toString */
    assertEquals("(1, 2, 3, 4)", (new b9.Quaternion(1.0, 2.0, 3.0, 4.0)).toString());

