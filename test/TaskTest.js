(function() {
  'use strict';

  module('Task');

  test('constructor, properties, and getters', function() {
    var task1 = DivSugar.createTask('task1');
    strictEqual(task1.id, 'task1');
    strictEqual(task1.active, true);
    strictEqual(task1.onUpdate, null);
    strictEqual(task1.onDestroy, null);
    strictEqual(task1.getParent(), null);
  });

  test('update', function() {
    var updatedCount = 0;
    var task1 = DivSugar.createTask();
    var task2 = DivSugar.createTask();
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
    var task1 = DivSugar.createTask();
    var task2 = DivSugar.createTask();
    task1.onDestroy = task2.onDestroy = function() { destroyedCount++; };
    task1.appendChild(task2);
    task1.destroy();
    strictEqual(destroyedCount, 2);
  });

  test('appendChild', function() {
    var task1 = DivSugar.createTask('task1');
    var task2 = DivSugar.createTask('task2');
    var task3 = DivSugar.createTask('task3');
    var task4 = DivSugar.createTask('task4');
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
    var task1 = DivSugar.createTask('task1');
    var task2 = DivSugar.createTask('task2');
    var task3 = DivSugar.createTask('task3');
    var task4 = DivSugar.createTask('task4');
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
    var task1 = DivSugar.createTask('task1');
    var task2 = DivSugar.createTask('task2');
    var task3 = DivSugar.createTask('task3');
    var task4 = DivSugar.createTask('task4');
    task1.appendChild(task2);
    task1.appendChild(task3);
    task3.appendChild(task4);
    strictEqual(task1.getTaskById('task4'), task4);
    strictEqual(task1.getTaskById('dummy'), null);
  });
})();
