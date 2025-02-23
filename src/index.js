import "./style.css";

import { addNewProject, loadProjects } from "./model";

document.addEventListener("DOMContentLoaded", () => {
  const addProjectButton = document.querySelector(".create-project");
  addProjectButton.addEventListener("click", addNewProject);
  loadProjects();
});
