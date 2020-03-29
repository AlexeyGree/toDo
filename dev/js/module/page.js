export class Page {
  counter1 = 0;
  counter2 = 1;
  actualBox = document.querySelector('#js-actual-box');
  completedBox = document.querySelector('#js-completed-box');
  completeAll = document.querySelector('#js-btn_complete-all');
  deleteAll = document.querySelector('#js-btn_delete-all');
  form = {
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
  allTasks() {
    return document.querySelectorAll('.js-task');
  };
  getActualOrCompletedTask(allTasks, typeOfTask) {
    let actualTasks = [];
    let completedTasks = [];
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].getAttribute('id').slice(0, 7) === typeOfTask) {
        actualTasks.push(allTasks[i]);
      } else if (allTasks[i].getAttribute('id').slice(0, 10) === typeOfTask) {
        completedTasks.push(allTasks[i]);
      }
    }
    if (typeOfTask === 'actual_') {
      return actualTasks;
    } else if (typeOfTask === 'completed_') {
      return completedTasks;
    }
  }
}