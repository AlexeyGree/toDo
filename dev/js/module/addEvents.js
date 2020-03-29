/* create Events for task*/
export function createEvents(task, that, counter_1, counter_2) {
  let counter = 0;
  let name = task.querySelector('#js-task-name_' + counter_1);
  let desc = task.querySelector('#js-task-desc_' + counter_1);
  let editName = task.querySelector('#js-task-name-field-inner_' + counter_1);
  let editDesc = task.querySelector('#js-task-desc-field-inner_' + counter_2);
  let editOkBtn = task.querySelector('#js-edit-box-ok_' + counter_1);
  let editCancelBtn = task.querySelector('#js-edit-box-cancel_' + counter_1);
  let taskEditBox = task.querySelector('#js-task__edit-box_' + counter_1);
  let edit = task.querySelector('#js-task__btn-edit_' + counter_1);
  let remove = task.querySelector('#js-task__btn-remove_' + counter_1);
  let complete = task.querySelector('#js-task__btn-complete_' + counter_1);

  localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

  if (task.classList.contains('task--completed')) {//Добавить изменение id при переносе таска в блок завершенных!!!
    localStorage.removeItem(name.getAttribute('data-storage-key'));
    that.removeClassOfElement(task, 'task--completed');
    that.addClassesForElement(task, 'task--actual')

    that.addAttrForElement(task, 'id', 'js-task_' + counter_1, that.mask);

    that.removeClassOfElement(name, 'task__name--completed');
    that.addAttrForElement(name, 'data-storage-key', that.mask + name.getAttribute('data-storage-key').slice(10));

    that.removeClassOfElement(desc, 'task__desc--completed');
    that.addAttrForElement(desc, 'data-storage-value', that.mask + desc.getAttribute('data-storage-value').slice(10));

    that.removeClassOfElement(complete, 'task__btn--complete-active');
    edit.disabled = false;
    that.removeClassOfElement(edit, 'task__btn--disabled', 'task__btn--edit-disabled');
    that.removeClassOfElement(remove, 'task__btn--remove-disabled');

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
      that.addAttrForElement(name, 'data-storage-key', that.mask + editName.value);
      desc.textContent = editDesc.value;
      that.addAttrForElement(desc, 'data-storage-value', that.mask + editDesc.value);
      localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

      that.removeClassOfElement(taskEditBox, 'task__edit-box--active');
      counter ++;
    }
  });

  editCancelBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    that.removeClassOfElement(taskEditBox, 'task__edit-box--active');
    counter ++;
  });

  edit.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (counter % 2 === 0) {
      editName.value = name.textContent;
      editDesc.value = desc.textContent;
      that.addClassesForElement(taskEditBox, 'task__edit-box--active');
    } else {
      that.removeClassOfElement(taskEditBox, 'task__edit-box--active');
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
    that.mask = 'completed_';
    createEventsForCompleteTask(task, that, counter_1, counter_2);
  });
}
/* create Events for task*/
/* create Events for completed task*/
export function createEventsForCompleteTask(task, that, counter_1, counter_2) {
  let actualTasksBox = document.querySelector('#js-actual-box');
  let completedTasksBox = document.querySelector('#js-completed-box');
  let name = task.querySelector('#js-task-name_' + counter_1);
  let desc = task.querySelector('#js-task-desc_' + counter_1);
  let completed = task.querySelector('#js-task__btn-complete_' + counter_1);
  let edit = task.querySelector('#js-task__btn-edit_' + counter_1);
  let remove = task.querySelector('#js-task__btn-remove_' + counter_1);

  that.removeClassOfElement(task, 'task--actual');
  that.addClassesForElement(task, 'task--completed');
  that.addAttrForElement(task, 'id', 'js-task_' + counter_1, that.mask);

  that.addClassesForElement(name, 'task__name--completed');
  if (name.getAttribute('data-storage-key').slice(0, 7) === 'actual_') {
    name.setAttribute('data-storage-key', that.mask + name.getAttribute('data-storage-key').slice(7));
  }
  that.addClassesForElement(desc, 'task__desc--completed');
  if (desc.getAttribute('data-storage-value').slice(0, 7) === 'actual_') {
    desc.setAttribute('data-storage-value', that.mask + desc.getAttribute('data-storage-value').slice(7));
  }

  localStorage.setItem(name.getAttribute('data-storage-key'), desc.getAttribute('data-storage-value'));

  that.addClassesForElement(completed, 'task__btn--complete-active');

  that.addClassesForElement(edit, 'task__btn--edit-disabled', 'task__btn--disabled');
  that.addAttrForElement(edit, 'disabled', 'true');

  that.addClassesForElement(remove, 'task__btn--remove-disabled');

  completedTasksBox.appendChild(task);

  completed.addEventListener('click', (evt) => {
    evt.preventDefault();
    actualTasksBox.appendChild(task);
    localStorage.removeItem(name.getAttribute('data-storage-key'));
    that.mask = 'actual_';
    createEvents(task, that, counter_1, counter_2);
  });

  remove.addEventListener('click', (evt) => {
    evt.preventDefault();
    localStorage.removeItem(name.getAttribute('data-storage-key'));
    task.remove();
  });
}
/* create Events for completed task*/