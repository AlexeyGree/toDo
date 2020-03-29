'use strict'

// import Task from './task.js';
import {addNewTask} from './newTask.js';

/* restore task from localStorage */
export function restoreTaskAfterRefresh(counter1, counter2) {
  let maskActual = 'actual_';
  let maskCompleted = 'completed_'
  if (localStorageLength > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).slice(0, 7) === maskActual) {
        console.log(counter1 + ' __ ' + counter2);
        let name = localStorage.key(i).slice(7);
        let desc = localStorage.getItem(localStorage.key(i)).slice(7);
        // let task = new Task(name, desc, maskActual, counter1, counter2);
        // task.add(document.querySelector('#js-actual-box'));
        addNewTask(name, desc, maskActual, counter1, counter2);
        counter1 += 2;
        counter2 += 2;
      } else if (localStorage.key(i).slice(0, 10) === maskCompleted) {
        console.log(counter1 + ' __ ' + counter2);
        let name = localStorage.key(i).slice(10);
        let desc = localStorage.getItem(localStorage.key(i)).slice(10);
        // let task = new Task(name, desc, maskCompleted, counter1, counter2);
        // task.add(document.querySelector('#js-completed-box'));
        addNewTask(name, desc, maskCompleted, counter1, counter2);
        counter1 += 2;
        counter2 += 2;
      }
    }
  }
};
/* restore task from localStorage */