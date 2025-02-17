const tasks = [
  {title: "Comprar comida para o gato", type: "Urgente"},
  {title: "Consertar Computador", type: "Importante"},
  {title: "Beber água", type: "Normal"},
  {title: "Enviar relatório trimestral", type: "Importante"},
  // {title: "Fazer exercícios físicos", type: "Normal"},
  // {title: "Agendar consulta médica", type: "Urgente"},
  // {title: "Ler pelo menos um capítulo de um livro", type: "Normal"},
  // {title: "Limpar a despensa", type: "Importante"},
  // {title: "Pagar a conta de energia", type: "Urgente"},
  // {title: "Assistir a um documentário interessante", type: "Normal"},
];


function renderElements(tasks) {
  const taskList = document.querySelector("ul");
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const taskItem = createTaskItem(tasks[i]);
    taskList.appendChild(taskItem);
  }
}
renderElements(tasks)

function createTaskItem(task) {
  const li = document.createElement('li');
  li.classList.add('task__item');

  const div = document.createElement('div');
  div.classList.add('task-info__container');

  const span = document.createElement('span');
  span.classList.add('task-type');
  
  if (task.type === 'Urgente') {
    span.classList.add('span-urgent');
  } else if (task.type === 'Importante') {
    span.classList.add('span-important');
  } else if (task.type === 'Normal') {
    span.classList.add('span-normal');
  }

  const p = document.createElement('p');
  p.textContent = task.title;

  div.appendChild(span);
  div.appendChild(p);

  const button = document.createElement('button');
  button.classList.add('task__button--remove-task');
  button.setAttribute("aria-label", "Remover tarefa");

  button.addEventListener("click", () => {
    const index = tasks.findIndex(t => t.title === task.title && t.type === task.type);
    if (index !== -1) {
      tasks.splice(index, 1); 
      renderElements(tasks); 
    }
  });

  li.appendChild(div);
  li.appendChild(button);

  return li;
}

const addButton = document.querySelector(".form__button--add-task");
addButton.addEventListener("click", function (event) {
  event.preventDefault(); 

  const inputTitle = document.querySelector("#input_title").value.trim();
  let inputType = document.querySelector(".form__input--priority").value.trim();

  if (inputTitle === "" || inputType === "") {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const newTask = { title: inputTitle, type: inputType };
  tasks.push(newTask);
  renderElements(tasks);

  document.querySelector("#input_title").value = "";
  document.querySelector(".form__input--priority").value = "";
});