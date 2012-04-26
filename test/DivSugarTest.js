(function() {
  'use strict';

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
    var scene1 = DivSugar.createScene();
    ok(scene1 instanceof HTMLDivElement);
    ok(!scene1.id);

    var scene2 = DivSugar.createScene('scene2');
    ok(scene2 instanceof HTMLDivElement);
    strictEqual(scene2.id, 'scene2');
  });

  test('createSprite', function() {
    var sprite1 = DivSugar.createSprite();
    ok(sprite1 instanceof HTMLDivElement);
    ok(!sprite1.id);

    var sprite2 = DivSugar.createSprite('sprite2');
    ok(sprite2 instanceof HTMLDivElement);
    strictEqual(sprite2.id, 'sprite2');
  });

  test('createTask', function() {
    var task1 = DivSugar.createTask();
    ok(task1 instanceof DivSugar._Task);
    ok(!task1.id);

    var task2 = DivSugar.createTask('task2');
    ok(task2 instanceof DivSugar._Task);
    strictEqual(task2.id, 'task2');
  });
})();
