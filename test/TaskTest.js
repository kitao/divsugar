(function() {
  'use strict';

  module('Task');

  test('constructor, properties, and getters', function() {
    var task1 = new DivSugar.Task();
    strictEqual(task1.id, null);
    strictEqual(task1.active, true);
    strictEqual(task1.deltaTime, 0);
    strictEqual(task1.onUpdate, null);
    strictEqual(task1.onDestroy, null);
    strictEqual(task1.getParent(), null);

    var task2 = new DivSugar.Task('task2');
    strictEqual(task2.id, 'task2');
  });

  test('update', function() {
    var updatedCount = 0;
    var task1 = new DivSugar.Task();
    var task2 = new DivSugar.Task();
    task1.deltaTime = task2.deltaTime = 100;
    task1.onUpdate = task2.onUpdate = function() {
      strictEqual(this.deltaTime, 223);
      updatedCount++;
    };
    task1.append(task2);
    task1.update(123);
    strictEqual(updatedCount, 2);
    strictEqual(task1.deltaTime, 0);
    strictEqual(task2.deltaTime, 0);

    task1.onUpdate = task2.onUpdate = null;
    ok(task1.update(1).update(1));
  });

  test('destroy', function() {
    var destroyedCount = 0;
    var task1 = new DivSugar.Task();
    var task2 = new DivSugar.Task();
    task1.onDestroy = task2.onDestroy = function() { destroyedCount++; };
    task1.append(task2);
    task1.destroy();
    strictEqual(destroyedCount, 2);

    ok(task1.destroy().destroy());
  });

  test('append', function() {
    var task1 = new DivSugar.Task();
    var task2 = new DivSugar.Task();
    var task3 = new DivSugar.Task();
    var task4 = new DivSugar.Task();
    task1.append(task2);
    task1.append(task3);
    task3.append(task4);
    strictEqual(task1.getParent(), null);
    strictEqual(task2.getParent(), task1);
    strictEqual(task3.getParent(), task1);
    strictEqual(task4.getParent(), task3);

    ok(task1.append(task2).append(task2));
  });

  test('remove', function() {
    var task1 = new DivSugar.Task();
    var task2 = new DivSugar.Task();
    var task3 = new DivSugar.Task();
    var task4 = new DivSugar.Task();
    task1.append(task2);
    task1.append(task3);
    task3.append(task4);
    task1.remove(task3);
    strictEqual(task1.getParent(), null);
    strictEqual(task2.getParent(), task1);
    strictEqual(task3.getParent(), null);
    strictEqual(task4.getParent(), task3);

    ok(task1.remove(task2).remove(task2));
  });

  test('getTaskById', function() {
    var task1 = new DivSugar.Task('task1');
    var task2 = new DivSugar.Task('task2');
    var task3 = new DivSugar.Task('task3');
    var task4 = new DivSugar.Task('task4');
    task1.append(task2);
    task1.append(task3);
    task3.append(task4);
    strictEqual(task1.getTaskById('task4'), task4);
    strictEqual(task1.getTaskById('dummy'), null);
  });
})();
