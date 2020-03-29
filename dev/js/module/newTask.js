import Task from './task.js';

export function addNewTask(name, desc, mask, counter1, counter2) {
  let task = new Task(name, desc, mask, counter1, counter2);
  if (mask === 'actual_') {
    task.add(document.querySelector('#js-actual-box'));
  } else {
    task.add(document.querySelector('#js-completed-box'));
  }
  return task;
}