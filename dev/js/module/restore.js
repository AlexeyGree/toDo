'use strict'

import {counter1, counter2} from '../app.js';//Импорт переменных!!!
import Task from './task.js';


/* restore task from localStorage */
export default function restoreTaskAfterRefresh() {//Экспорт функции!!!
  let localStorageLength = localStorage.length;
  let maskActual = 'actual_';
  let maskCompleted = 'completed_'
  if (localStorageLength > 0) {
    for (let i = 0; i < localStorageLength; i++) {
      if (localStorage.key(i).slice(0, 7) === maskActual) {
        let name = localStorage.key(i).slice(7);
        let desc = localStorage.getItem(localStorage.key(i)).slice(7);
        let task = new Task(name, desc, maskActual, counter1, counter2);
        task.add(document.querySelector('#js-actual-box'));
        counter1 += 2;//Ошибка
        counter2 += 2;//Ошибка
      } else if (localStorage.key(i).slice(0, 10) === maskCompleted) {
        let name = localStorage.key(i).slice(10);
        let desc = localStorage.getItem(localStorage.key(i)).slice(10);
        let task = new Task(name, desc, maskCompleted, counter1, counter2);
        task.add(document.querySelector('#js-completed-box'));
        counter1 += 2;
        counter2 += 2;
      }
    }
  }
};
restoreTaskAfterRefresh();//Если вызов импортируемой функции указан здесь ошибка: "Cannot access 'counter1' before initialization"
/* restore task from localStorage */