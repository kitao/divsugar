function nearlyEqual(actual, expected) {
  'use strict';

  if (actual instanceof DivSugar.Vector) {
    nearlyEqual(actual.x, expected.x);
    nearlyEqual(actual.y, expected.y);
    nearlyEqual(actual.z, expected.z);
  } else if (actual instanceof DivSugar.Matrix) {
    nearlyEqual(actual.xAxis, expected.xAxis);
    nearlyEqual(actual.yAxis, expected.yAxis);
    nearlyEqual(actual.zAxis, expected.zAxis);
    nearlyEqual(actual.trans, expected.trans);
  } else if (actual instanceof DivSugar.Quaternion) {
    nearlyEqual(actual.x, expected.x);
    nearlyEqual(actual.y, expected.y);
    nearlyEqual(actual.z, expected.z);
    nearlyEqual(actual.w, expected.w);
  } else {
    strictEqual(Math.abs(actual - expected) < DivSugar.EPSILON, true, 'Expected:' + expected + ', Result: ' + actual);
  }
}
