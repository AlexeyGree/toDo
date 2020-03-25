'use strict';

// import {restoreTaskAfterRefresh} from './restore.js';
// import {counter1} from '../app.js';
// import {counter2} from '../app.js';

class Task {
  constructor(name, desc, mask, counter1, counter2) {
    this.name = name;
    this.desc = desc;
    this.mask = mask;
    this.counter_1 = counter1;
    this.counter_2 = counter2;
    // this.taskCounter = 0;
  }
  add(place) {
    let task = this.getHtmlStructure(this.name, this.desc, this.mask);
    if (this.mask === 'actual_') {
      place.appendChild(task);
      this.createEvents(task);
    } else {
      place.appendChild(task);
      this.createEventsForCompleteTask(task);
    }
  }
  /* get html structure of task */
  getHtmlStructure(name, desc, mask) {
    let taskBox = this.addClassesForElement(this.createElement('article'), 'task');
    this.addAttrForElement(taskBox, 'id', 'js-task_' + this.counter_1, this.mask);
    if (mask === 'actual_') {
      this.addClassesForElement(taskBox, 'task--actual');
    } else if (mask === 'completed') {
      this.addClassesForElement(taskBox, 'task--completed');
    }

    taskBox.appendChild(this.createInfoBox(name, desc, mask));
    taskBox.appendChild(this.createEditBox());
    taskBox.appendChild(this.createControlBox());

    return taskBox;
  }
  /* get html structure of task */
  /* create element */
  createElement(elementName) {
    let element = document.createElement(elementName);
    return element;//????
  }
  /* crate element */
  /* add class for element */
  addClassesForElement(element, ...arrClasses) {
    for (let className of arrClasses) {
      element.classList.add(className);
    }
    return element;//????
  }
  /* add class for element */
  /* remove class for element */
  removeClassOfElement(element, ...classNames) {
    for (let className of classNames) {
      element.classList.remove(className);
    }
    return element;//????
  }
  /* remove class for element */
  /* add attr for element */
  addAttrForElement(element, attrName, attrValue, mask) {
    if (mask) {
      element.setAttribute(attrName, mask + attrValue);
      return element;//????
    } else {
      element.setAttribute(attrName, attrValue);
      return element;//????
    }
  }
  /* add attr for element */
  /* create infoBox */
  createInfoBox(name, desc, mask) {
    let taskInfoBox = this.addClassesForElement(this.createElement('div'), 'task__info-box');
    let taskName = this.addClassesForElement(this.createElement('h3'), 'task__name');
    let taskDesc = this.addClassesForElement(this.createElement('p'), 'task__desc');

    taskName.textContent = name;
    taskDesc.textContent = desc;
    this.addAttrForElement(taskName, 'data-storage-key', mask + name);
    this.addAttrForElement(taskName, 'id', 'js-task-name_' + this.counter_1);

    this.addAttrForElement(taskDesc, 'data-storage-value', mask + desc);
    this.addAttrForElement(taskDesc, 'id', 'js-task-desc_' + this.counter_1);

    taskInfoBox.appendChild(taskName);
    taskInfoBox.appendChild(taskDesc);

    return taskInfoBox;
  }
  /* create infoBox */
  /* create editBox */
  createEditBox() {
    let taskEditBox = this.addClassesForElement(this.createElement('div'), 'task__edit-box');
    let addTaskForm = this.addClassesForElement(this.createElement('form', 'add-task'), 'add-task', 'add-task--edit-box');
    let addTaskParagraph1 = this.addClassesForElement(this.createElement('p'), 'add-task__paragraph');
    let addTaskParagraph2 = this.addClassesForElement(this.createElement('p'), 'add-task__paragraph');
    let addTaskLabel1 = this.addClassesForElement(this.createElement('label'), 'add-task__label', 'add-task__label--edit-box');
    let addTaskLabel2 = this.addClassesForElement(this.createElement('label'), 'add-task__label', 'add-task__label--edit-box');
    let addTaskInput = this.addClassesForElement(this.createElement('input'), 'add-task__text-field', 'add-task__text-field--edit-box', 'add-task__text-field-name--edit-box');
    let addTaskTextarea = this.addClassesForElement(this.createElement('textarea'), 'add-task__text-field', 'add-task__text-field--edit-box', 'add-task__text-field-desc--edit-box');
    let addTaskButtons = this.addClassesForElement(this.createElement('div'), 'add-task__buttons');
    let addTaskCreateBtn = this.addClassesForElement(this.createElement('button'), 'btn', 'add-task__create', 'add-task__create--edit-box');
    let addTaskCancelBtn = this.addClassesForElement(this.createElement('button'), 'btn', 'add-task__cancel');

    this.addAttrForElement(taskEditBox, 'id', 'js-task__edit-box_' + this.counter_1);

    this.addAttrForElement(addTaskLabel1, 'for', 'js-task-name-field-inner_' + this.counter_1)
    addTaskLabel1.textContent = 'Enter task name';
    this.addAttrForElement(addTaskLabel2, 'for', 'js-task-name-field-inner_' + this.counter_2);
    addTaskLabel2.textContent = 'Enter task description';

    this.addAttrForElement(addTaskInput, 'type', 'text');
    this.addAttrForElement(addTaskInput, 'name', 'task-name');
    this.addAttrForElement(addTaskInput, 'id', 'js-task-name-field-inner_' + this.counter_1);
    this.addAttrForElement(addTaskInput, 'placeholder', 'Enter name');

    this.addAttrForElement(addTaskTextarea, 'id', 'js-task-desc-field-inner_' + this.counter_2);
    this.addAttrForElement(addTaskTextarea, 'placeholder', 'Enter description of task');

    this.addAttrForElement(addTaskCreateBtn, 'id', 'js-edit-box-ok_' + this.counter_1);
    addTaskCreateBtn.textContent = 'Edit task';
    this.addAttrForElement(addTaskCancelBtn, 'id', 'js-edit-box-cancel_' + this.counter_1);
    addTaskCancelBtn.textContent = 'Cancel';

    addTaskParagraph1.appendChild(addTaskLabel1);
    addTaskParagraph1.appendChild(addTaskInput);

    addTaskParagraph2.appendChild(addTaskLabel2);
    addTaskParagraph2.appendChild(addTaskTextarea);

    addTaskButtons.appendChild(addTaskCreateBtn);
    addTaskButtons.appendChild(addTaskCancelBtn);

    addTaskForm.appendChild(addTaskParagraph1);
    addTaskForm.appendChild(addTaskParagraph2);
    addTaskForm.appendChild(addTaskButtons);

    taskEditBox.appendChild(addTaskForm);
    
    return taskEditBox;
  }
  /* create editBox */
  /* create ControlBox */
  createControlBox() {
    var taskControlBox = this.addClassesForElement(this.createElement('div'), 'task__controls-box');
    var taskBtn1 = this.addClassesForElement(this.createElement('button'), 'task__btn', 'task__btn--edit');
    var taskBtn2 = this.addClassesForElement(this.createElement('button'), 'task__btn', 'task__btn--remove');
    var taskBtn3 = this.addClassesForElement(this.createElement('button'), 'task__btn', 'task__btn--complete');

    this.addAttrForElement(taskBtn1, 'aria-label', 'edit task');
    this.addAttrForElement(taskBtn1, 'id', 'js-task__btn-edit_' + this.counter_1);
    this.addAttrForElement(taskBtn2, 'aria-label', 'remove task');
    this.addAttrForElement(taskBtn2, 'id', 'js-task__btn-remove_' + this.counter_1);
    this.addAttrForElement(taskBtn3, 'aria-label', 'complete task');
    this.addAttrForElement(taskBtn3, 'id', 'js-task__btn-complete_' + this.counter_1);

    taskControlBox.appendChild(taskBtn1);
    taskControlBox.appendChild(taskBtn2);
    taskControlBox.appendChild(taskBtn3);

    return taskControlBox;
  }
  /* create ControlBox */
  /* create Events for task*/
  createEvents(task) {
    let counter = 0;
    let name = task.querySelector('#js-task-name_' + this.counter_1);
    let desc = task.querySelector('#js-task-desc_' + this.counter_1);
    let editName = task.querySelector('#js-task-name-field-inner_' + this.counter_1);
    let editDesc = task.querySelector('#js-task-desc-field-inner_' + this.counter_2);
    let editOkBtn = task.querySelector('#js-edit-box-ok_' + this.counter_1);
    let editCancelBtn = task.querySelector('#js-edit-box-cancel_' + this.counter_1);
    let taskEditBox = task.querySelector('#js-task__edit-box_' + this.counter_1);
    let edit = task.querySelector('#js-task__btn-edit_' + this.counter_1);
    let remove = task.querySelector('#js-task__btn-remove_' + this.counter_1);
    let complete = task.querySelector('#js-task__btn-complete_' + this.counter_1);

    localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

    if (task.classList.contains('task--completed')) {
      localStorage.removeItem(name.getAttribute('data-storage-key'));
      this.removeClassOfElement(task, 'task--completed');
      this.addClassesForElement(task, 'task--actual')

      this.removeClassOfElement(name, 'task__name--completed');
      this.addAttrForElement(name, 'data-storage-key', this.mask + name.getAttribute('data-storage-key').slice(10));

      this.removeClassOfElement(desc, 'task__desc--completed');
      this.addAttrForElement(desc, 'data-storage-value', this.mask + desc.getAttribute('data-storage-value').slice(10));

      this.removeClassOfElement(complete, 'task__btn-complete-active');
      edit.disabled = false;
      this.removeClassOfElement(edit, 'task__btn--disabled', 'task__btn--edit-disabled');
      // this.removeClassOfElement(edit, 'task__btn--edit-disabled');
      this.removeClassOfElement(remove, 'task__btn-remove-disabled');

      localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));
    }

    editOkBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      let sameName = 0;
      for (let i = 0; i < localStorage.length; i++) {
        if (editName.value !== name.textContent && (editName.value === localStorage.key(i).slice(7) || editName.value === localStorage.key(i).slice(10))) {
          sameName ++;
          console.log(sameName);
        }
      }
      if (sameName < 1) {
        localStorage.removeItem(name.getAttribute('data-storage-key'));
        name.textContent = editName.value;
        this.addAttrForElement(name, 'data-storage-key', this.mask + editName.value);
        desc.textContent = editDesc.value;
        this.addAttrForElement(desc, 'data-storage-value', this.mask + editDesc.value);
        localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

        this.removeClassOfElement(taskEditBox, 'task__edit-box--active');
        counter ++;
      }
    });

    editCancelBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.removeClassOfElement(taskEditBox, 'task__edit-box--active');
      counter ++;
    });

    edit.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (counter % 2 === 0) {
        editName.value = name.textContent;
        editDesc.value = desc.textContent;
        this.addClassesForElement(taskEditBox, 'task__edit-box--active');
      } else {
        this.removeClassOfElement(taskEditBox, 'task__edit-box--active');
      }
      counter ++;
    });

    remove.addEventListener('click', (evt) => {
      evt.preventDefault();
      task.remove();
      localStorage.removeItem(name.getAttribute('data-storage-key'));
    });

    complete.addEventListener('click', (evt) => {
      evt.preventDefault();
      localStorage.removeItem(name.getAttribute('data-storage-key'));
      this.mask = 'completed_';
      this.createEventsForCompleteTask(task);
    });
    this.moveOrDeleteTasksEvents();
  }
  /* create Events for task*/
  /* create Events for completed task*/
  createEventsForCompleteTask(task) {
    let actualTasksBox = document.querySelector('#js-actual-box');
    let completedTasksBox = document.querySelector('#js-completed-box');
    // let completedTask = task;
    let name = task.querySelector('#js-task-name_' + this.counter_1);
    let desc = task.querySelector('#js-task-desc_' + this.counter_1);
    let completed = task.querySelector('#js-task__btn-complete_' + this.counter_1);
    let edit = task.querySelector('#js-task__btn-edit_' + this.counter_1);
    let remove = task.querySelector('#js-task__btn-remove_' + this.counter_1);

    this.removeClassOfElement(task, 'task--actual');
    this.addClassesForElement(task, 'task--completed');


    this.addClassesForElement(name, 'task__name--completed');
    if (name.getAttribute('data-storage-key').slice(0, 7) === 'actual_') {
      name.setAttribute('data-storage-key', this.mask + name.getAttribute('data-storage-key').slice(7));
    }
    this.addClassesForElement(desc, 'task__desc--completed');
    if (desc.getAttribute('data-storage-value').slice(0, 7) === 'actual_') {
      desc.setAttribute('data-storage-value', this.mask + desc.getAttribute('data-storage-value').slice(7));
    }

    localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

    this.addClassesForElement(completed, 'task__btn--complete-active');

    this.addClassesForElement(edit, 'task__btn--edit-disabled', 'task__btn--disabled');
    this.addAttrForElement(edit, 'disabled', 'true');

    this.removeClassOfElement(remove, 'task__btn--remove-disabled');

    completedTasksBox.appendChild(task);

    completed.addEventListener('click', (evt) => {
      evt.preventDefault();
      actualTasksBox.appendChild(task);
      localStorage.removeItem(name.getAttribute('data-storage-key'));
      this.mask = 'actual_';
      this.createEvents(task);
    });

    remove.addEventListener('click', (evt) => {
      evt.preventDefault();
      localStorage.removeItem(name.getAttribute('data-storage-key'));
      task.remove();
    });
    this.moveOrDeleteTasksEvents();
  }
  /* create Events for completed task*/
  /* move/delete tasks */
  moveOrDeleteTasksEvents() {// Не нашел решения как разместить данную функцию вне класса(не знаю как обратиться к определенному экземпляру этого класса)
    let actualTasks = document.querySelectorAll('.task--actual');
    let completedTasks = document.querySelectorAll('.task--completed');
    let removeAll = document.querySelector('.tasks__remove-completed');
    let completeAll = document.querySelector('.tasks__remove-actual');

    completeAll.addEventListener('click', (evt) => {
      evt.preventDefault();
      for (let i = 0; i < actualTasks.length; i++) {
        let taskKey = actualTasks[i].querySelector('.task__name').getAttribute('data-storage-key');
        localStorage.removeItem(taskKey);
        this.mask = 'completed_';
        this.createEventsForCompleteTask(actualTasks[i]);
      }
      // moveOrDeleteTasks('delete');
    })
    
    removeAll.addEventListener('click', (evt) => {
      evt.preventDefault();
      for (let task of completedTasks) {
        let taskKey = task.querySelector('.task__name').getAttribute('data-storage-key');
        localStorage.removeItem(taskKey);
        task.remove();
      }
      // moveOrDeleteTasks('done');
    })
  }
  /* move/delete tasks */
};

export default Task;