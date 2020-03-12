var task = {
  create: function(a, b) {
    console.log('create task')
  },
  delete: function(task) {
    console.log('Delete task')
  },
  edit: function() {
    console.log('Edit task')
  }
};

var addTask = {
  form: document.querySelector('.add-task-js')
};
console.log(addTask.form);
