'use strict';

var counter1 = 0;
var counter2 = 1;
/* creating events of task */
var createEvents = function(taskStructure) {
  var counter = 0;
  var task = taskStructure;
  var name = taskStructure.querySelector('.task__name');
  var desc = taskStructure.querySelector('.task__desc');
  var storageKey = localStorage.setItem(name.textContent, desc.textContent);
  var editName = taskStructure.querySelector('.add-task__text-field-name--edit-box');
  var editDesc = taskStructure.querySelector('.add-task__text-field-desc--edit-box');
  var editBtn = taskStructure.querySelector('.add-task__create--edit-box');
  var editCancelBtn = taskStructure.querySelector('.add-task__cancel');
  var taskEditBox = taskStructure.querySelector('.task__edit-box');
  var edit = taskStructure.querySelector('.task__btn--edit');
  var remove = taskStructure.querySelector('.task__btn--remove');

  editBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    storageKey = localStorage.removeItem(name.textContent);
    name.textContent = editName.value;
    desc.textContent = editDesc.value;
    storageKey = localStorage.setItem(editName.value, editDesc.value);
    taskEditBox.classList.remove('task__edit-box--active');
    counter ++;
  });

  editCancelBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    taskEditBox.classList.remove('task__edit-box--active');
    counter ++;
  });

  edit.addEventListener('click', function(evt) {
    evt.preventDefault();
    if (counter % 2 === 0) {
      editName.value = name.textContent;
      editDesc.value = desc.textContent;
      taskEditBox.classList.add('task__edit-box--active');
    } else {
      taskEditBox.classList.remove('task__edit-box--active');
    }
    counter ++;
  });

  remove.addEventListener('click', function(evt) {
    evt.preventDefault();
    task.remove();
    storageKey = localStorage.removeItem(name.textContent);
  });
}
/* creating events of task */
/* task object */
var task = {
  create: function(name, desc) {
    this.name = name;
    this.desc = desc;
    this.taskStructure = taskStructure.getTask(name, desc);
    this.delete = function() {

    };
    this.events = createEvents(this.taskStructure);
    // this.localStore = localStorage.setItem(this.name, this.desc);
    // var counter = 0;
    // var h3 = this.taskStructure.querySelector('.task__name');
    // var p = this.taskStructure.querySelector('.task__desc');

    // var editForm = this.taskStructure.querySelector('.add-task--edit-box');
    // var editName = this.taskStructure.querySelector('.add-task__text-field-name--edit-box');

    // var editDesc = this.taskStructure.querySelector('.add-task__text-field-desc--edit-box');

    // var editBtn = this.taskStructure.querySelector('.add-task__create--edit-box');
    // editBtn.addEventListener('click', function(evt) {
    //   evt.preventDefault();
    //   h3.textContent = editName.value;
    //   p.textContent = editDesc.value;
    //   // this.localStore = localStorage.setItem(task.editName.value, task.editDesc.value);
    //   taskEditBox.classList.remove('task__edit-box--active');
    //   counter ++;
    // });
    // var editCancelBtn = this.taskStructure.querySelector('.add-task__cancel');
    // editCancelBtn.addEventListener('click', function(evt) {
    //   evt.preventDefault();
    //   taskEditBox.classList.remove('task__edit-box--active');
    //   counter ++;
    // });

    // var taskEditBox = this.taskStructure.querySelector('.task__edit-box');
    // var edit = this.taskStructure.querySelector('.task__btn--edit');
    // edit.addEventListener('click', function(evt) {
    //   evt.preventDefault();
    //   if (counter % 2 === 0) {
    //     editName.value = h3.textContent;
    //     editDesc.value = p.textContent;
    //     taskEditBox.classList.add('task__edit-box--active');
    //   } else {
    //     taskEditBox.classList.remove('task__edit-box--active');
    //   }
    //   counter ++;
    // })
  }
}
/* task object */
/* create task structure */
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
    control.setAttribute(attrName, attrContent);
    return control;
  },
  getControlBox: function(parentBox) {
    var taskControlBox = this.getElementWithClass('div', 'task__controls-box');
    var taskBtn1 = this.getControlElement('aria-label', 'edit task', 'button', 'task__btn', 'task__btn--edit');
    var taskBtn2 = this.getControlElement('aria-label', 'remove task', 'button', 'task__btn', 'task__btn--remove');
    var taskBtn3 = this.getControlElement('aria-label', 'complete task', 'button', 'task__btn', 'task__btn--complete');

    taskControlBox.appendChild(taskBtn1);
    taskControlBox.appendChild(taskBtn2);
    taskControlBox.appendChild(taskBtn3);

    return parentBox.appendChild(taskControlBox);
  },
  getEditForm: function(parentBox) {
    var addTaskForm = this.getElementWithClass('form', 'add-task', 'add-task--edit-box');
    var addTaskParagraph1 = this.getElementWithClass('p', 'add-task__paragraph');
    var addTaskParagraph2 = this.getElementWithClass('p', 'add-task__paragraph');
    var addTaskLabel1 = this.getElementWithClass('label', 'add-task__label', 'add-task__label--edit-box');
    var addTaskLabel2 = this.getElementWithClass('label', 'add-task__label', 'add-task__label--edit-box');
    var addTaskInput = this.getElementWithClass('input', 'add-task__text-field', 'add-task__text-field--edit-box', 'add-task__text-field-name--edit-box');
    var addTaskTextarea = this.getElementWithClass('textarea', 'add-task__text-field', 'add-task__text-field--edit-box', 'add-task__text-field-desc--edit-box');
    var addTaskButtons = this.getElementWithClass('div', 'add-task__buttons');
    var addTaskCreateBtn = this.getElementWithClass('button', 'btn', 'add-task__create', 'add-task__create--edit-box');
    var addTaskCancelBtn = this.getElementWithClass('button', 'btn', 'add-task__cancel')

    addTaskLabel1.setAttribute('for', 'task-name-field-inner' + counter1)
    addTaskLabel1.textContent = 'Enter task name';

    addTaskLabel2.setAttribute('for', 'task-name-field-inner' + counter2)
    addTaskLabel2.textContent = 'Enter task description';

    addTaskInput.type = 'text';
    addTaskInput.name = 'task-name';
    addTaskInput.id = 'task-name-field-inner' + counter1;
    addTaskInput.placeholder = 'Enter name';

    addTaskTextarea.id = 'task-desc-field-inner' + counter2;
    addTaskTextarea.placeholder = 'Enter description of task';

    addTaskCreateBtn.textContent = 'Edit task';
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

    return parentBox.appendChild(addTaskForm);
  },
  getEditBox: function(parentBox) {
    var taskEditBox = this.getElementWithClass('div', 'task__edit-box');
    this.getEditForm(taskEditBox);

    return parentBox.appendChild(taskEditBox);
  },
  getInfoBox: function(parentBox, name, desc) {
    var taskInfoBox = this.getElementWithClass('div', 'task__info-box');
    var taskName = this.getElementWithClass('h3', 'task__name');
    var taskDesc = this.getElementWithClass('p', 'task__desc');

    taskName.textContent = name;

    taskDesc.textContent = desc;
    taskInfoBox.appendChild(taskName);
    taskInfoBox.appendChild(taskDesc);

    return parentBox.appendChild(taskInfoBox);
  },
  getTask: function(name, desc) {
    var actualTasks = document.querySelector('.actual-tasks');
    var taskBox = this.getElementWithClass('article', 'task', 'task--actual');

    this.getInfoBox(taskBox, name, desc);
    this.getEditBox(taskBox);
    this.getControlBox(taskBox);

    return actualTasks.appendChild(taskBox);
  }
};
/* create task structure */
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
/* restore task from localStorage */
var restoreTaskAfterRefresh = function() {
  var localStorageLength = localStorage.length;
  if (localStorageLength > 0) {
    for (var i = 0; i < localStorageLength; i++) {
      var name = localStorage.key(i);
      var desc = localStorage.getItem(name);
      task.create(name, desc);
      counter1 += 2;
      counter2 += 2;
    }
  }
}
restoreTaskAfterRefresh();
/* restore task from localStorage */
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