'use strict';

import {Page} from './module/page.js';
import {addNewTask} from './module/newTask.js';
import {createEventsForCompleteTask} from './module/addEvents.js';

class Init {
  constructor() {
    this.page = new Page();
    this.tasksInstances = [];
    this.storageTasks = this.restoringTaskAfterRefresh();
    this.pageEvents = this.initPageEvents();
  }
  restoringTaskAfterRefresh() {
    let maskActual = 'actual_';
    let maskCompleted = 'completed_'
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).slice(0, 7) === maskActual) {
          let name = localStorage.key(i).slice(7);
          let desc = localStorage.getItem(localStorage.key(i)).slice(7);
          let task = addNewTask(name, desc, maskActual, this.page.counter1, this.page.counter2);
          this.page.counter1 += 2;
          this.page.counter2 += 2;
          this.tasksInstances.push(task);
        } else if (localStorage.key(i).slice(0, 10) === maskCompleted) {
          let name = localStorage.key(i).slice(10);
          let desc = localStorage.getItem(localStorage.key(i)).slice(10);
          let task = addNewTask(name, desc, maskCompleted, this.page.counter1, this.page.counter2);
          this.page.counter1 += 2;
          this.page.counter2 += 2;
          this.tasksInstances.push(task);
        }
      }
    }
  }
  initPageEvents() {
    /* complete all actual tasks */
    this.page.completeAll.addEventListener('click', (evt) => {
      evt.preventDefault();
      let actualTasks = this.page.getActualOrCompletedTask(this.page.allTasks(), 'actual_');
      for (let task of actualTasks) {
        let taskKey = task.querySelector('.task__name').getAttribute('data-storage-key');
        for (let instance of this.tasksInstances) {
          if (instance.counter_1 === Number(task.getAttribute('id').slice(15))) {
            localStorage.removeItem(taskKey);
            instance.mask = 'completed_';
            createEventsForCompleteTask(task, instance, instance.counter_1, instance.counter_1);
          }
        }
      }
    });
    /* complete all actual tasks */

    /* delete all complete tasks */
    this.page.deleteAll.addEventListener('click', (evt) => {
      evt.preventDefault();
      let completedTasks = this.page.getActualOrCompletedTask(this.page.allTasks(), 'completed_');
      for (let task of completedTasks) {
        let taskKey = task.querySelector('.task__name').getAttribute('data-storage-key');
        localStorage.removeItem(taskKey);
        task.remove();
      }
    });
    /* delete all complete tasks */

    /* add new task */
    this.page.form.addTaskBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      let sameName = false;
      for (let i = 0; i < localStorage.length; i++) {
        if (this.page.form.getName() === localStorage.key(i).slice(7) || this.page.form.getName() === localStorage.key(i).slice(10)) {
          sameName = true;
        }
      }
      if (this.page.form.getName() !== '' && this.page.form.getDesc() !== '' && sameName !== true) {
        let task = addNewTask(this.page.form.getName(), this.page.form.getDesc(), 'actual_', this.page.counter1, this.page.counter2);
        this.page.counter1 += 2;
        this.page.counter2 += 2;
        this.page.form.name = document.querySelector('#task-name-field').value = '';
        this.page.form.desc = document.querySelector('#task-desc-field').value = '';
        this.tasksInstances.push(task);
      }
    });
    /* add new task */
  }
}
/* app init */
new Init();
/* app init */