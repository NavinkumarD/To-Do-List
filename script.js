const taskInput = document.getElementById('taskInput');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

addTask.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTaskItem(taskText);
    taskInput.value = '';
    saveTasks();
  }
});

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask.click();
  }
});

function addTaskItem(text) {
  const li = document.createElement('li');
  li.textContent = text;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach(task => {
      addTaskItem(task.text);
      if (task.completed) {
        taskList.lastChild.classList.add('completed');
      }
    });
  }
}

loadTasks();
