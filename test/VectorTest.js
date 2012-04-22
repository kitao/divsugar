module('Vector');

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
  strictEqual(vec1.x, 1);
  strictEqual(vec1.y, 2);
  strictEqual(vec1.z, 3);

  var vec2 = new DivSugar.Vector();
  vec2.set(vec1);
  strictEqual(vec2.x, 1);
  strictEqual(vec2.y, 2);
  strictEqual(vec2.z, 3);

  var vec3 = new DivSugar.Vector();
  vec3.set(vec1).set(4, 5, 6);
  strictEqual(vec3.x, 4);
  strictEqual(vec3.y, 5);
  strictEqual(vec3.z, 6);
});

test('neg', function() {
  var vec1 = new DivSugar.Vector(1, 2, 3);
  vec1.neg();
  strictEqual(vec1.x, -1);
  strictEqual(vec1.y, -2);
  strictEqual(vec1.z, -3);

  var vec2 = new DivSugar.Vector(vec1);
  vec2.neg().neg();
  strictEqual(vec2.x, -1);
  strictEqual(vec2.y, -2);
  strictEqual(vec2.z, -3);
});

test('add', function() {
  var vec1 = new DivSugar.Vector(1, 2, 3);
  var vec2 = new DivSugar.Vector(2, 3, 4);
  vec1.add(vec2);
  strictEqual(vec1.x, 3);
  strictEqual(vec1.y, 5);
  strictEqual(vec1.z, 7);

  var vec3 = new DivSugar.Vector(-1, -1, -1);
  vec3.add(vec1).add(vec2);
  strictEqual(vec3.x, 4);
  strictEqual(vec3.y, 7);
  strictEqual(vec3.z, 10);
});

test('sub', function() {
  var vec1 = new DivSugar.Vector(4, 5, 6);
  var vec2 = new DivSugar.Vector(3, 2, 1);
  vec1.sub(vec2);
  strictEqual(vec1.x, 1);
  strictEqual(vec1.y, 3);
  strictEqual(vec1.z, 5);

  var vec3 = new DivSugar.Vector(5, 6, 7);
  vec3.sub(vec1).sub(vec2);
  strictEqual(vec3.x, 1);
  strictEqual(vec3.y, 1);
  strictEqual(vec3.z, 1);
});

test('mul', function() {
  var vec1 = new DivSugar.Vector(1, 2, 3);
  vec1.mul(2);
  strictEqual(vec1.x, 2);
  strictEqual(vec1.y, 4);
  strictEqual(vec1.z, 6);

  var vec2 = new DivSugar.Vector(2, 4, 6);
  vec2.mul(-1).mul(0.5);
  strictEqual(vec2.x, -1);
  strictEqual(vec2.y, -2);
  strictEqual(vec2.z, -3);
});

test('div', function() {
  var vec1 = new DivSugar.Vector(2, 4, 6);
  vec1.div(2);
  strictEqual(vec1.x, 1);
  strictEqual(vec1.y, 2);
  strictEqual(vec1.z, 3);

  var vec2 = new DivSugar.Vector(1, 2, 3);
  vec2.div(0.1).div(2);
  strictEqual(vec2.x, 5);
  strictEqual(vec2.y, 10);
  strictEqual(vec2.z, 15);
});

test('norm', function() {
});
