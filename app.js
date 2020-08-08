const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterTodo = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', function (e) {
  getTodo();
});
todoButton.addEventListener('click', addTodos);
todoList.addEventListener('click', deleteCheck);
filterTodo.addEventListener('click', filtertodos);

function addTodos(e) {
  const todoDiv = document.createElement('div');
  todoDiv.className = 'todo';
  const todos = document.createElement('li');
  todos.className = 'todo-item';
  setTodos(todoInput.value);
  todos.appendChild(document.createTextNode(todoInput.value));
  todoDiv.appendChild(todos);
  todoInput.value = '';

  //creating complete button
  const completeBtn = document.createElement('button');
  completeBtn.className = 'complete-btn';
  completeBtn.innerHTML = '<li class="fas fa-check"></li>';
  todoDiv.appendChild(completeBtn);

  //creating trash button
  const trashBtn = document.createElement('button');
  trashBtn.className = 'trash-btn';
  trashBtn.innerHTML = '<li class="fas fa-trash"></li>';
  todoDiv.appendChild(trashBtn);
  todoList.appendChild(todoDiv);
  e.preventDefault();
}

function deleteCheck(e) {
  const items = e.target;
  if (items.className === 'trash-btn') {
    const todo = items.parentElement;
    todo.classList.add('fall');
    removeTodo(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }
  if (items.className === 'complete-btn') {
    const todo = items.parentElement;
    todo.classList.toggle('completed');
  }
  e.preventDefault();
}

function filtertodos(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
  e.preventDefault();
}

//getting to local storage

function setTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);

  //set items to llocalstorage
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';
    const todos = document.createElement('li');
    todos.className = 'todo-item';

    todos.appendChild(document.createTextNode(todo));
    todoDiv.appendChild(todos);
    todoInput.value = '';

    //creating complete button
    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete-btn';
    completeBtn.innerHTML = '<li class="fas fa-check"></li>';
    todoDiv.appendChild(completeBtn);

    //creating trash button
    const trashBtn = document.createElement('button');
    trashBtn.className = 'trash-btn';
    trashBtn.innerHTML = '<li class="fas fa-trash"></li>';
    todoDiv.appendChild(trashBtn);
    todoList.appendChild(todoDiv);
  });
}

function removeTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
