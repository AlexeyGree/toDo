'use strict';

var counter1 = 0;
var counter2 = 1;

/* move/delete tasks */
var moveOrDeleteTasks = function(action) {
  var actualTasks = document.querySelectorAll('.task--actual');
  var completedTasks = document.querySelectorAll('.task--completed');

  if (action === 'done') {
    for (var i = 0; i < actualTasks.length; i++) {
      var taskKey = actualTasks[i].querySelector('.task__name').getAttribute('data-storage-key');
      localStorage.removeItem(taskKey);
      createEventsForCompleteTask(actualTasks[i]);
    }
  } else if (action === 'delete') {
    for (var i = 0; i < completedTasks.length; i++) {
      var taskKey = completedTasks[i].querySelector('.task__name').getAttribute('data-storage-key');
      localStorage.removeItem(taskKey);
      completedTasks[i].remove();
    }
  }
}

var removeAll = document.querySelector('.tasks__remove-completed');
var completeAll = document.querySelector('.tasks__remove-actual');

removeAll.addEventListener('click', function(evt) {
  evt.preventDefault();
  moveOrDeleteTasks('delete');
});

completeAll.addEventListener('click', function(evt) {
  evt.preventDefault();
  moveOrDeleteTasks('done');
})

/* move/delete tasks */

/* creating events of completed task */
var createEventsForCompleteTask = function(task) {
  var actualTasksBox = document.querySelector('.actual-tasks__box');
  var completedTask = task;
  var completedTasksBox = document.querySelector('.completed-tasks__box');
  var name = completedTask.querySelector('.task__name');
  var desc = completedTask.querySelector('.task__desc');
  var completed = completedTask.querySelector('.task__btn--complete');
  var edit = completedTask.querySelector('.task__btn--edit');
  var remove = completedTask.querySelector('.task__btn--remove');

  name.classList.add('task__name--completed');
  if (name.getAttribute('data-storage-key').slice(0, 7) === 'actual_') {
    name.setAttribute('data-storage-key', 'completed_' + name.getAttribute('data-storage-key').slice(7));
  } else {
    name.setAttribute('data-storage-key', 'completed_' + name.getAttribute('data-storage-key').slice(10));
  }

  desc.classList.add('task__desc--completed');
  if (desc.getAttribute('data-storage-value').slice(0, 7) === 'actual_') {
    desc.setAttribute('data-storage-value', 'completed_' + desc.getAttribute('data-storage-value').slice(7));
  } else {
    desc.setAttribute('data-storage-value', 'completed_' + desc.getAttribute('data-storage-value').slice(10));
  }


  localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

  completedTask.classList.remove('task--actual');
  completedTask.classList.add('task--completed');
  completed.classList.add('task__btn--complete-active');

  edit.classList.add('task__btn--edit-disabled');
  edit.classList.add('task__btn--disabled');
  edit.disabled = true;

  remove.classList.add('task__btn--remove-disabled');
  completedTasksBox.appendChild(completedTask);

  completed.addEventListener('click', function(evt) {
    evt.preventDefault();
    actualTasksBox.appendChild(task);
    localStorage.removeItem(name.getAttribute('data-storage-key'));
    createEvents(task);
  });

  remove.addEventListener('click', function(evt) {
    evt.preventDefault();
    localStorage.removeItem(name.getAttribute('data-storage-key'));
    completedTask.remove();
  });
};
/* creating events of completed task */
/* creating events of task */
var createEvents = function(taskStructure) {
  var counter = 0;
  var task = taskStructure;
  var name = taskStructure.querySelector('.task__name');
  var desc = taskStructure.querySelector('.task__desc');
  var editName = taskStructure.querySelector('.add-task__text-field-name--edit-box');
  var editDesc = taskStructure.querySelector('.add-task__text-field-desc--edit-box');
  var editBtn = taskStructure.querySelector('.add-task__create--edit-box');
  var editCancelBtn = taskStructure.querySelector('.add-task__cancel');
  var taskEditBox = taskStructure.querySelector('.task__edit-box');
  var edit = taskStructure.querySelector('.task__btn--edit');
  var remove = taskStructure.querySelector('.task__btn--remove');
  var complete = taskStructure.querySelector('.task__btn--complete');
  var completeAll = document.querySelector('.tasks__remove-actual');

  localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

  if (task.classList.contains('task--completed')) {
    localStorage.removeItem(name.getAttribute('data-storage-key'));
    task.classList.remove('task--completed');
    task.classList.add('task--actual');

    name.classList.remove('task__name--completed');
    if (name.getAttribute('data-storage-key').slice(0, 10) === 'completed_') {
      name.setAttribute('data-storage-key', 'actual_' + name.getAttribute('data-storage-key').slice(10));
    }

    desc.classList.remove('task__desc--completed');
    if (desc.getAttribute('data-storage-value').slice(0, 10) === 'completed_') {
      desc.setAttribute('data-storage-value', 'actual_' + desc.getAttribute('data-storage-value').slice(10));
    }

    complete.classList.remove('task__btn--complete-active');
    edit.disabled = false;
    edit.classList.remove('task__btn--disabled');
    edit.classList.remove('task__btn--edit-disabled');
    remove.classList.remove('task__btn--remove-disabled');
    localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));
  }

  editBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    localStorage.removeItem(name.getAttribute('data-storage-key'));
    name.textContent = editName.value;
    name.setAttribute('data-storage-key', 'actual_' + editName.value);
    desc.textContent = editDesc.value;
    desc.setAttribute('data-storage-value', 'actual_' + editDesc.value);
    localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

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
    localStorage.removeItem(name.getAttribute('data-storage-key'));
  });

  complete.addEventListener('click', function(evt) {
    evt.preventDefault();
    localStorage.removeItem(name.getAttribute('data-storage-key'));
    createEventsForCompleteTask(task);//, storageKey
  });
};
/* creating events of task */
/* task object */
var task = {
  create: function(name, desc, mask) {
    this.name = name;
    this.desc = desc;
    this.taskHtml = taskStructure.getTask(name, desc, mask);

    if (mask === 'actual_') {
      this.events = createEvents(this.taskHtml);
    } else if (mask === 'completed_') {
      this.events = createEventsForCompleteTask(this.taskHtml)
    }
  },
  add: function(place, taskStructure) {
    return place.appendChild(taskStructure);
  }
};
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
  getDataAttr: function(taskName, taskDesc, mask) {
    taskName.setAttribute('data-storage-key', mask + taskName.textContent);
    taskDesc.setAttribute('data-storage-value', mask + taskDesc.textContent);
  },
  getInfoBox: function(parentBox, name, desc, mask) {
    var taskInfoBox = this.getElementWithClass('div', 'task__info-box');
    var taskName = this.getElementWithClass('h3', 'task__name');
    var taskDesc = this.getElementWithClass('p', 'task__desc');

    taskName.textContent = name;
    taskDesc.textContent = desc;
    this.getDataAttr(taskName, taskDesc, mask)

    taskInfoBox.appendChild(taskName);
    taskInfoBox.appendChild(taskDesc);

    return parentBox.appendChild(taskInfoBox);
  },
  getTask: function(name, desc, mask) {
    var taskBox = this.getElementWithClass('article', 'task');
    if (mask === 'actual_') {
      taskBox.classList.add('task--actual')
    } else if (mask === 'completed') {
      taskBox.classList.add('task--completed');
    }

    this.getInfoBox(taskBox, name, desc, mask);
    this.getEditBox(taskBox);
    this.getControlBox(taskBox);

    return taskBox;
  },
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
};
/* form object */
/* restore task from localStorage */
var restoreTaskAfterRefresh = function() {
  var localStorageLength = localStorage.length;
  var maskActual = 'actual_';
  var maskCompleted = 'completed_'
  if (localStorageLength > 0) {
    for (var i = 0; i < localStorageLength; i++) {
      if (localStorage.key(i).slice(0, 7) === maskActual) {
        var name = localStorage.key(i).slice(7);
        var desc = localStorage.getItem(localStorage.key(i)).slice(7);
        task.create(name, desc, maskActual);
        task.add(document.querySelector('.actual-tasks__box'), task.taskHtml);
        counter1 += 2;
        counter2 += 2;
      } else if (localStorage.key(i).slice(0, 10) === maskCompleted) {
        var name = localStorage.key(i).slice(10);
        var desc = localStorage.getItem(localStorage.key(i)).slice(10);
        task.create(name, desc, maskCompleted);
        task.add(document.querySelector('.completed-tasks__box'), task.taskHtml);
        counter1 += 2;
        counter2 += 2;
      }
    }
  }
};
restoreTaskAfterRefresh();
/* restore task from localStorage */
/* add new task */
form.addTaskBtn.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (form.getName() !== '' && form.getDesc() !== '') {
    task.create(form.getName(), form.getDesc(), 'actual_');
    task.add(document.querySelector('.actual-tasks__box'), task.taskHtml);
    counter1 += 2;
    counter2 += 2;
    form.name = document.querySelector('.add-task__text-field-name').value = '';
    form.desc = document.querySelector('.add-task__text-field-desc').value = '';
  }
});
/* add new task */