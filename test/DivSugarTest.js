module('DivSugar');

test('constants', function() {
  strictEqual(DivSugar.VERSION, '0.10');
  strictEqual(DivSugar.EPSILON, 0.0001);
  strictEqual(DivSugar.DEG_TO_RAD * 180, Math.PI);
  strictEqual(DivSugar.RAD_TO_DEG * Math.PI, 180);
});

test('rootTask', function() {
  strictEqual(DivSugar.rootTask instanceof DivSugar._Task, true);
  strictEqual(DivSugar.rootTask.id, 'root');
});

test('createScene', function() {
  var scene = DivSugar.createScene('testScene');
  strictEqual(scene instanceof HTMLDivElement, true);
  strictEqual(scene.id, 'testScene');
});

test('createSprite', function() {
  var sprite = DivSugar.createSprite('testSprite');
  strictEqual(sprite instanceof HTMLDivElement, true);
  strictEqual(sprite.id, 'testSprite');
});

test('createTask', function() {
  var task = DivSugar.createTask('testTask');
  strictEqual(task instanceof DivSugar._Task, true);
  strictEqual(task.id, 'testTask');
});
