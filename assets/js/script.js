var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = [];

// TODO: What is the purpose of this function?
function renderTodos() {
  // TODO: Describe the functionality of the following two lines of code.
  //creates a string inside the element #todo-list, then sets the value of todoCountSpan to be equal to the length of todos[]
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // TODO: Describe the functionality of the following `for` loop.
  // given that i < todos.length, create a li element that has the value of todo as its textContent and has the data attribute "data-index" attributed to the value of i.  Then, creates a button that says "Complete ✔️" and appends it inside the newly created button.  Then, it appends the content of the newly created <li> to the element with #todo-list.
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Complete ✔️";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

// TODO: What is the purpose of the following function?
// parses the local storage item "todos" and stores them in storedTodos[].  Then, if storedTodos is not null, then set attribute todos and storedTodos[].  Then run renderTodos().  This is run on page load as an initialization function.
function init() {
  // TODO: What is the purpose of the following line of code?
  // parses local storage item "todos" and stores the data in storedTodos[]
  var storedTodos = JSON.parse(localStorage.getItem("todos"));
  // TODO: Describe the functionality of the following `if` statement.
  // if storedTodos is null, then attribute it to the array todos.
  if (storedTodos !== null) {
    todos = storedTodos;
  }
  // TODO: Describe the purpose of the following line of code.
  // runs the function renderTodos() automatically on page load as part of init()
  renderTodos();
}

function storeTodos() {
  // TODO: Describe the purpose of the following line of code.
  // creates a new local storage item "todos" and sets its value to the value of todos[], then converts it to a string with JSON.stringify()
  localStorage.setItem("todos", JSON.stringify(todos));
}
// TODO: Describe the purpose of the following line of code.
// if a submit event occurs, prevent the default handling of the submission.  then take the value of todoInput.value, removes white space from the string, and attributes it to todoText.
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var todoText = todoInput.value.trim();
  // TODO: Describe the functionality of the following `if` statement.
  // if an empty form is submitted then cancel click event
  if (todoText === "") {
    return;
  }
  // TODO: Describe the purpose of the following lines of code.
  // adds the string todoText to the end of todos[] and resets the "add a todo:" feature to be an empty string.
  todos.push(todoText);
  todoInput.value = "";

  // TODO: What will happen when the following functions are called?
  // overrides the value of local storage item "todos" with the new value after pushing todoText onto it
  storeTodos();
  // updates the todo list array based upon input from an event handler
  renderTodos();
});

// TODO: Describe the purpose of the following line of code.
// adds a function for handling when a user clicks a button.  It first stores the event target to the variable element.
todoList.addEventListener("click", function (event) {
  var element = event.target;
  // TODO: Describe the functionality of the following `if` statement.
  // Then it checks to see if the click target is a button.  If true, then it targets the parent element (ul class todo-list) holding elements with data attribute data-index and splices it based upon which button was clicked.  it does this by attributing the data attribute of that button to the varriable index and using that to call splice() to delete 1 button.
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);
    // TODO: What will happen when the following functions are called?
    // overrides the value of local storage item "todos" with the new value after pushing todoText onto it
    storeTodos();
    // updates the todo list array based upon input from an event handler
    renderTodos();
  }
});

init();
