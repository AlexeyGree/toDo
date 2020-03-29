'use strict';

import {createEvents, createEventsForCompleteTask} from './addEvents.js';

class Task {
  constructor(name, desc, mask, counter1, counter2) {
    this.name = name;
    this.desc = desc;
    this.mask = mask;
    this.counter_1 = counter1;
    this.counter_2 = counter2;
  }
  add(place) {
    let task = this.getHtmlStructure(this.name, this.desc, this.mask);
    if (this.mask === 'actual_') {
      place.appendChild(task);
      createEvents(task, this, this.counter_1, this.counter_2);
    } else {
      place.appendChild(task);
      createEventsForCompleteTask(task, this, this.counter_1, this.counter_2);
    }
  }
  /* get html structure of task */
  getHtmlStructure(name, desc, mask) {
    let taskBox = this.addClassesForElement(this.createElement('article'), 'task', 'js-task');
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
};

export default Task;