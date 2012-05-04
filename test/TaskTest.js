(function() {
  'use strict';

  module('Task');

  test('constructor, properties, and getters', function() {
    var task1 = new DivSugar.Task();
    strictEqual(task1.id, null);
    strictEqual(task1.active, true);
    strictEqual(task1.onUpdate, null);
    strictEqual(task1.onDestroy, null);
    strictEqual(task1.getParent(), null);

    var task2 = new DivSugar.Task('task2');
    strictEqual(task2.id, 'task2');
    strictEqual(task2.active, true);
    strictEqual(task2.onUpdate, null);
    strictEqual(task2.onDestroy, null);
    strictEqual(task2.getParent(), null);
  });

  test('update', function() {
    var updatedCount = 0;
    var task1 = new DivSugar.Task();
    var task2 = new DivSugar.Task();
    task1.onUpdate = task2.onUpdate = function(elapsedTime) {
      strictEqual(elapsedTime, 123);
      updatedCount++;
    };
    task1.appendChild(task2);
    task1.update(123);
    strictEqual(updatedCount, 2);
  });

  test('destroy', function() {
    var destroyedCount = 0;
    var task1 = new DivSugar.Task();
    var task2 = new DivSugar.Task();
    task1.onDestroy = task2.onDestroy = function() { destroyedCount++; };
    task1.appendChild(task2);
    task1.destroy();
    strictEqual(destroyedCount, 2);
  });

  test('appendChild', function() {
    var task1 = new DivSugar.Task();
    var task2 = new DivSugar.Task();
    var task3 = new DivSugar.Task();
    var task4 = new DivSugar.Task();
    task1.appendChild(task2);
    task1.appendChild(task3);
    task3.appendChild(task4);
    strictEqual(task1.getParent(), null);
    strictEqual(task2.getParent(), task1);
    strictEqual(task3.getParent(), task1);
    strictEqual(task4.getParent(), task3);

    ok(task1.appendChild(task2).appendChild(task2));
  });

  test('removeChild', function() {
    var task1 = new DivSugar.Task();
    var task2 = new DivSugar.Task();
    var task3 = new DivSugar.Task();
    var task4 = new DivSugar.Task();
    task1.appendChild(task2);
    task1.appendChild(task3);
    task3.appendChild(task4);
    task1.removeChild(task3);
    strictEqual(task1.getParent(), null);
    strictEqual(task2.getParent(), task1);
    strictEqual(task3.getParent(), null);
    strictEqual(task4.getParent(), task3);

    ok(task1.removeChild(task2).removeChild(task2));
  });

  test('getTaskById', function() {
    var task1 = new DivSugar.Task('task1');
    var task2 = new DivSugar.Task('task2');
    var task3 = new DivSugar.Task('task3');
    var task4 = new DivSugar.Task('task4');
    task1.appendChild(task2);
    task1.appendChild(task3);
    task3.appendChild(task4);
    strictEqual(task1.getTaskById('task4'), task4);
    strictEqual(task1.getTaskById('dummy'), null);
  });
})();
