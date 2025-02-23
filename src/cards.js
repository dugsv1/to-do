import { Task, removeProject } from "./model";

export function createCard(project) {
  const container = document.createElement("div");
  container.classList.add("container");

  const containerTop = createContainerTop(project);
  const ul = createTodoList();
  const form = createForm(project, ul);

  project.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.textContent = task.title;
    ul.appendChild(li);
  });

  ul.addEventListener("click", (e) => {
    if (e.target.matches(".todo-list li")) {
      // Clicked an <li>
      const style = window.getComputedStyle(e.target, "::after");
      if (style.content === '"X"') {
        project.removeTask(e.target.textContent);
        e.target.remove();
      }
      project.saveToLocalStorage();
    }
  });

  container.appendChild(containerTop);
  container.appendChild(form);
  container.appendChild(ul);
  return container;
}

function createContainerTop(project) {
  const containerTop = document.createElement("div");
  containerTop.classList.add("container-top");

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = project.name;

  const button = document.createElement("button");
  button.classList.add("del-btn");
  button.textContent = "Delete";

  button.addEventListener("click", () => {
    removeProject(project);
  });

  containerTop.appendChild(projectTitle);
  containerTop.appendChild(button);

  return containerTop;
}

function createTodoList() {
  const ul = document.createElement("ul");
  ul.classList.add("todo-list");
  return ul;
}

function createForm(project, ul) {
  const form = document.createElement("form");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const button = document.createElement("button");

  legend.textContent = "Add an item";

  label.setAttribute("for", "new-todo");
  label.textContent = "Enter a new to-do item";

  input.setAttribute("type", "text");
  input.setAttribute("name", "new-todo");
  input.setAttribute("id", "new-todo");

  button.classList.add("add-todo");
  button.setAttribute("type", "submit");
  button.textContent = "Add";

  button.addEventListener("click", (e) => {
    e.preventDefault();
    const todoText = input.value.trim();
    if (todoText !== "") {
      const task = new Task(todoText);
      project.addTask(task);

      const li = document.createElement("li");
      li.classList.add("list-item");
      li.textContent = todoText;
      ul.appendChild(li);
      input.value = "";
    }
  });

  fieldset.appendChild(legend);
  fieldset.appendChild(label);
  fieldset.appendChild(input);
  fieldset.appendChild(button);
  form.appendChild(fieldset);

  return form;
}
