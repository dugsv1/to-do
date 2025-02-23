import { createCard } from "./cards";

export class Task {
  constructor(
    title,
    description = "",
    dueDate = "",
    priority = "low",
    completed = false,
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }
}

export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.saveToLocalStorage();
  }

  removeTask(taskTitle) {
    this.tasks = this.tasks.filter((task) => task.title !== taskTitle);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const projects = JSON.parse(localStorage.getItem("todoProjects")) || [];
    const existingProjectIndex = projects.findIndex(
      (p) => p.name === this.name,
    );

    if (existingProjectIndex > -1) {
      projects[existingProjectIndex] = this;
    } else {
      projects.push(this);
    }
    localStorage.setItem("todoProjects", JSON.stringify(projects));
  }

  static loadFromLocalStorage() {
    const storedProjects =
      JSON.parse(localStorage.getItem("todoProjects")) || [];
    return storedProjects.map((p) => {
      const project = new Project(p.name);
      project.tasks = p.tasks.map(
        (t) => new Task(t.title, t.description, t.dueDate, t.priority),
      );
      return project;
    });
  }
}

// CONTROL
export function loadProjects() {
  const projects = Project.loadFromLocalStorage();
  const containers = document.querySelector(".containers");

  // Add debugging
  console.log("Loading projects:", projects);
  console.log("Containers element:", containers);

  if (!containers) {
    console.error("Could not find containers element");
    return;
  }

  containers.replaceChildren();
  projects.forEach((project) => {
    const card = createCard(project);
    containers.appendChild(card);
  });
}

export function removeProject(project) {
  let projects = JSON.parse(localStorage.getItem("todoProjects")) || [];
  projects = projects.filter((p) => p.name !== project.name);
  localStorage.setItem("todoProjects", JSON.stringify(projects));
  loadProjects();
}

export function addNewProject() {
  const input = document.querySelector("#project-input");
  const name = input.value;
  const project = new Project(name);
  const card = createCard(project);
  project.saveToLocalStorage();

  const container = document.querySelector(".containers");
  container.appendChild(card);
}
