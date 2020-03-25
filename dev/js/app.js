'use strict';

import Task from './module/task.js';
import restoreTaskAfterRefresh from './module/restore.js';//Импорт функции!!!

export let counter1 = 0;//передаваемые переменные!!!
export let counter2 = 1;//передаваемые переменные!!!

// restoreTaskAfterRefresh();//Если вызов импортируемой функции указан здесь ошибка: "Assignment to constant variable"
/* restore task from localStorage */
/* main form */
let form = {
  self: document.querySelector('#js-add-task'),
  name: '',
  desc: '',
  addTaskBtn: document.querySelector('#js-add-task__create'),

  getName: () => {
    let currentName = document.querySelector('#task-name-field').value;
    return currentName;
  },
  getDesc: () => {
    let currentDesc = document.querySelector('#task-desc-field').value;
    return currentDesc;
  }
};
/* main form */
/* create new task */
form.addTaskBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  let sameName = false;
  for (let i = 0; i < localStorage.length; i++) {
    if (form.getName() === localStorage.key(i).slice(7) || form.getName() === localStorage.key(i).slice(10)) {
      sameName = true;
    }
  }
  if (form.getName() !== '' && form.getDesc() !== '' && sameName !== true) {
    let task = new Task(form.getName(), form.getDesc(), 'actual_', counter1, counter2);// Пока не понимаю данный момент! Создаются экземпляры класса и присваиваются одной переменной(т.е. перезаписываются?), но методы класса работают для каждого элемента.
    task.add(document.querySelector('#js-actual-box'));

    counter1 += 2;
    counter2 += 2;
    form.name = document.querySelector('.add-task__text-field-name').value = '';
    form.desc = document.querySelector('.add-task__text-field-desc').value = '';
  }
});
/* create new task */