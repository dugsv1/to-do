import "./style.css";

import { createCard } from "./cards";

const addProjectButton = document.querySelector('.create-project')
addProjectButton.addEventListener('click', addNewProject)

class Project{
    constructor(title){
        this.title = title;
    }

    /**Any project related functions that may need to execute */
}

function addNewProject(){
    const card = createCard();
    const input = document.querySelector('#project-input')
    const title = input.value;
    const project = new Project(title)
    const projectTitle = card.querySelector('.project-title')
    projectTitle.textContent = project.title

    const container = document.querySelector('.containers')
    container.appendChild(card)
}