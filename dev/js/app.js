'use strict';

var counter1 = 0;
var counter2 = 1;
/* task object */
var task = {
  create: function(name, desc) {
    this.name = name;
    this.desc = desc;
    // this.taskStructure = createHtmlStructure(name, desc);
    this.taskStructure = taskStructure.getTask(name, desc);
  },
  delete: function() {

  },
  edit: function() {

  }
}
/* task object */
/* form object */
var form = {
  self: document.querySelector('.add-task'),
  name: '',
  desc: '',
  addTaskBtn: document.querySelector('.add-task__create'),

  getName: function() {
    var currentName = document.querySelector('.add-task__text-field-name').value;
    return currentName;
  },
  getDesc: function() {
    var currentDesc = document.querySelector('.add-task__text-field-desc').value;
    return currentDesc;
    
  }
}
/* form object */
/* add new task */
form.addTaskBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (form.getName() !== '' || form.getDesc() !== '') {
    task.create(form.getName(), form.getDesc());
    counter1 += 2;
    counter2 += 2;
    form.name = document.querySelector('.add-task__text-field-name').value = '';
    form.desc = document.querySelector('.add-task__text-field-desc').value = '';
  }
});
/* add new task */

var taskStructure = {
  getElementWithClass: function(elementName, firstClass, secondClass, thirdClass) {
    var element = document.createElement(elementName);
    element.classList.add(firstClass);
    if (secondClass !== undefined) {
      element.classList.add(secondClass);
      if (thirdClass !== undefined) {
        element.classList.add(thirdClass);
      }
    }
    return element;
  },
  getControlElement: function(attrName, attrContent, elementName, firstClass, secondClass) {
    var control = this.getElementWithClass(elementName, firstClass, secondClass);
    // var control = document.createElement(elementName);
    // control.classList.add(firstClass);
    // control.classList.add('task__btn--edit');
    control.setAttribute(attrName, attrContent);
    return control;
  },
  getControlBox: function(parentBox) {
    // var taskControlBox = document.createElement('div');
    var taskControlBox = this.getElementWithClass('div', 'task__controls-box');
    console.log(taskControlBox);
    // var taskBtn1 = document.createElement('button');
    var taskBtn1 = this.getControlElement('aria-label', 'edit task', 'button', 'task__btn', 'task__btn--edit');
    console.log(taskBtn1);
    // var taskBtn2 = document.createElement('button');
    var taskBtn2 = this.getControlElement('aria-label', 'remove task', 'button', 'task__btn', 'task__btn--remove');
    // var taskBtn3 = document.createElement('button');
    var taskBtn3 = this.getControlElement('aria-label', 'complete task', 'button', 'task__btn', 'task__btn--complete');

    // taskControlBox.classList.add('task__controls-box');

    // taskBtn1.classList.add('task__btn');
    // taskBtn1.classList.add('task__btn--edit');
    // taskBtn1.setAttribute('aria-label', 'edit task');

    // taskBtn2.classList.add('task__btn');
    // taskBtn2.classList.add('task__btn--remove');
    // taskBtn2.setAttribute('aria-label', 'remove task');

    // taskBtn3.classList.add('task__btn');
    // taskBtn3.classList.add('task__btn--complete');
    // taskBtn3.setAttribute('aria-label', 'complete task');

    taskControlBox.appendChild(taskBtn1);
    taskControlBox.appendChild(taskBtn2);
    taskControlBox.appendChild(taskBtn3);

    return parentBox.appendChild(taskControlBox);
  },
  getEditForm: function(parentBox) {
    // var addTaskForm = document.createElement('form');
    var addTaskForm = this.getElementWithClass('form', 'add-task', 'add-task--edit-box');
    // var addTaskParagraph1 = document.createElement('p');
    var addTaskParagraph1 = this.getElementWithClass('p', 'add-task__paragraph');
    // var addTaskParagraph2 = document.createElement('p');
    var addTaskParagraph2 = this.getElementWithClass('p', 'add-task__paragraph');
    // var addTaskLabel1 = document.createElement('label');
    var addTaskLabel1 = this.getElementWithClass('label', 'add-task__label', 'add-task__label--edit-box');
    // var addTaskLabel2 = document.createElement('label');
    var addTaskLabel2 = this.getElementWithClass('label', 'add-task__label', 'add-task__label--edit-box');
    // var addTaskInput = document.createElement('input');
    var addTaskInput = this.getElementWithClass('input', 'add-task__text-field', 'add-task__text-field--edit-box');
    // var addTaskTextarea = document.createElement('textarea');
    var addTaskTextarea = this.getElementWithClass('textarea', 'add-task__text-field', 'add-task__text-field--edit-box');
    // var addTaskCreateBtn = document.createElement('button');
    var addTaskCreateBtn = this.getElementWithClass('button', 'btn', 'add-task__create', 'add-task__create--edit-box');

    // addTaskForm.classList.add('add-task');
    // addTaskForm.classList.add('add-task--edit-box');

    // addTaskParagraph1.classList.add('add-task__paragraph');
    // addTaskParagraph2.classList.add('add-task__paragraph');

    // addTaskLabel1.classList.add('add-task__label');
    // addTaskLabel1.classList.add('add-task__label--edit-box');
    // addTaskLabel1.for = 'task-name-field-inner' + counter1;
    addTaskLabel1.setAttribute('for', 'task-name-field-inner' + counter1)
    addTaskLabel1.textContent = 'Enter task name';

    // addTaskLabel2.classList.add('add-task__label');
    // addTaskLabel2.classList.add('add-task__label--edit-box');
    // addTaskLabel2.for = 'task-name-field-inner' + counter2;
    addTaskLabel2.setAttribute('for', 'task-name-field-inner' + counter2)
    addTaskLabel2.textContent = 'Enter task description';

    // addTaskInput.classList.add('add-task__text-field');
    // addTaskInput.classList.add('add-task__text-field--edit-box');
    addTaskInput.type = 'text';
    addTaskInput.name = 'task-name';
    addTaskInput.id = 'task-name-field-inner' + counter1;
    addTaskInput.placeholder = 'Enter name';

    // addTaskTextarea.classList.add('add-task__text-field');
    // addTaskTextarea.classList.add('add-task__text-field--edit-box');
    addTaskTextarea.id = 'task-desc-field-inner' + counter2;
    addTaskTextarea.placeholder = 'Enter description of task';

    // addTaskCreateBtn.classList.add('btn');
    // addTaskCreateBtn.classList.add('add-task__create');
    // addTaskCreateBtn.classList.add('add-task__create--edit-box');
    addTaskCreateBtn.textContent = 'Add task'

    addTaskParagraph1.appendChild(addTaskLabel1);
    addTaskParagraph1.appendChild(addTaskInput);

    addTaskParagraph2.appendChild(addTaskLabel2);
    addTaskParagraph2.appendChild(addTaskTextarea);

    addTaskForm.appendChild(addTaskParagraph1);
    addTaskForm.appendChild(addTaskParagraph2);
    addTaskForm.appendChild(addTaskCreateBtn);

    return parentBox.appendChild(addTaskForm);
  },
  getEditBox: function(parentBox) {
    // var taskEditBox = document.createElement('div');
    // taskEditBox.classList.add('task__edit-box');
    var taskEditBox = this.getElementWithClass('div', 'task__edit-box');
    this.getEditForm(taskEditBox);

    return parentBox.appendChild(taskEditBox);
  },
  getInfoBox: function(parentBox, name, desc) {
    // var taskInfoBox = document.createElement('div');
    var taskInfoBox = this.getElementWithClass('div', 'task__info-box');
    // var taskName = document.createElement('h3');
    var taskName = this.getElementWithClass('h3', 'task__name');
    // var taskDesc = document.createElement('p');
    var taskDesc = this.getElementWithClass('p', 'task__desc');

    // taskInfoBox.classList.add('task__info-box');
    // taskName.classList.add('task__name');
    taskName.textContent = name;
    // taskDesc.classList.add('task__desc');
    taskDesc.textContent = desc;
    taskInfoBox.appendChild(taskName);
    taskInfoBox.appendChild(taskDesc);

    return parentBox.appendChild(taskInfoBox);
  },
  getTask: function(name, desc) {
    var actualTasks = document.querySelector('.actual-tasks');
    var taskBox = this.getElementWithClass('article', 'task', 'task--actual');
    // var taskBox = document.createElement('article');
    // taskBox.classList.add('task');
    // taskBox.classList.add('task--actual');
    this.getInfoBox(taskBox, name, desc);
    this.getEditBox(taskBox);
    this.getControlBox(taskBox);

    return actualTasks.appendChild(taskBox);
  }
}
// function createControlBox(parentBox) {
//   var taskControlBox = document.createElement('div');
//   var taskBtn1 = document.createElement('button');
//   var taskBtn2 = document.createElement('button');
//   var taskBtn3 = document.createElement('button');

//   taskControlBox.classList.add('task__controls-box');

//   taskBtn1.classList.add('task__btn');
//   taskBtn1.classList.add('task__btn--edit');
//   taskBtn1.setAttribute('aria-label', 'edit task');

//   taskBtn2.classList.add('task__btn');
//   taskBtn2.classList.add('task__btn--remove');
//   taskBtn2.setAttribute('aria-label', 'remove task');

//   taskBtn3.classList.add('task__btn');
//   taskBtn3.classList.add('task__btn--complete');
//   taskBtn3.setAttribute('aria-label', 'complete task');

//   taskControlBox.appendChild(taskBtn1);
//   taskControlBox.appendChild(taskBtn2);
//   taskControlBox.appendChild(taskBtn3);

//   return parentBox.appendChild(taskControlBox);
// }

// function createEditForm(parentBox) {
//   var addTaskForm = document.createElement('form');
//   var addTaskParagraph1 = document.createElement('p');
//   var addTaskParagraph2 = document.createElement('p');
//   var addTaskLabel1 = document.createElement('label');
//   var addTaskLabel2 = document.createElement('label');
//   var addTaskInput = document.createElement('input');
//   var addTaskTextarea = document.createElement('textarea');
//   var addTaskCreateBtn = document.createElement('button');

//   addTaskForm.classList.add('add-task');
//   addTaskForm.classList.add('add-task--edit-box');

//   addTaskParagraph1.classList.add('add-task__paragraph');
//   addTaskParagraph2.classList.add('add-task__paragraph');

//   addTaskLabel1.classList.add('add-task__label');
//   addTaskLabel1.classList.add('add-task__label--edit-box');
//   // addTaskLabel1.for = 'task-name-field-inner' + counter1;
//   addTaskLabel1.setAttribute('for', 'task-name-field-inner' + counter1)
//   addTaskLabel1.textContent = 'Enter task name';

//   addTaskLabel2.classList.add('add-task__label');
//   addTaskLabel2.classList.add('add-task__label--edit-box');
//   // addTaskLabel2.for = 'task-name-field-inner' + counter2;
//   addTaskLabel2.setAttribute('for', 'task-name-field-inner' + counter2)
//   addTaskLabel2.textContent = 'Enter task description';

//   addTaskInput.classList.add('add-task__text-field');
//   addTaskInput.classList.add('add-task__text-field--edit-box');
//   addTaskInput.type = 'text';
//   addTaskInput.name = 'task-name';
//   addTaskInput.id = 'task-name-field-inner' + counter1;
//   addTaskInput.placeholder = 'Enter name';

//   addTaskTextarea.classList.add('add-task__text-field');
//   addTaskTextarea.classList.add('add-task__text-field--edit-box');
//   addTaskTextarea.id = 'task-desc-field-inner' + counter2;
//   addTaskTextarea.placeholder = 'Enter description of task';

//   addTaskCreateBtn.classList.add('btn');
//   addTaskCreateBtn.classList.add('add-task__create');
//   addTaskCreateBtn.classList.add('add-task__create--edit-box');
//   addTaskCreateBtn.textContent = 'Add task'

//   addTaskParagraph1.appendChild(addTaskLabel1);
//   addTaskParagraph1.appendChild(addTaskInput);

//   addTaskParagraph2.appendChild(addTaskLabel2);
//   addTaskParagraph2.appendChild(addTaskTextarea);

//   addTaskForm.appendChild(addTaskParagraph1);
//   addTaskForm.appendChild(addTaskParagraph2);
//   addTaskForm.appendChild(addTaskCreateBtn);

//   return parentBox.appendChild(addTaskForm);
// }

// function createEditBox(parentBox) {
//   var taskEditBox = document.createElement('div');
//   taskEditBox.classList.add('task__edit-box');
//   createEditForm(taskEditBox);

//   return parentBox.appendChild(taskEditBox);
// }

// function createInfoBox(parentBox, name, desc) {
//   var taskInfoBox = document.createElement('div');
//   var taskName = document.createElement('h3');
//   var taskDesc = document.createElement('p');

//   taskInfoBox.classList.add('task__info-box');
//   taskName.classList.add('task__name');
//   taskName.textContent = name;
//   taskDesc.classList.add('task__desc');
//   taskDesc.textContent = desc;
//   taskInfoBox.appendChild(taskName);
//   taskInfoBox.appendChild(taskDesc);
//   return parentBox.appendChild(taskInfoBox);
// }

// function createHtmlStructure(name, desc) {
//   var actualTasks = document.querySelector('.actual-tasks');
//   // var fragment = document.createDocumentFragment();
//   var taskBox = document.createElement('article');
//   taskBox.classList.add('task');
//   taskBox.classList.add('task--actual');
//   createInfoBox(taskBox, name, desc);
//   createEditBox(taskBox);
//   createControlBox(taskBox);

//   return actualTasks.appendChild(taskBox);
// }