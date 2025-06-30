import { toDoList } from "./toDoList.js";
import { PRIORITIES, STATUSES } from "./constants.js";

const forms = document.querySelectorAll('.toDoList__form');

const showTasks = () => {
    const highList = document.getElementById('high-list');
    const lowList = document.getElementById('low-list');

    clearTasks();

    toDoList.list.forEach(task => {
        const taskUI = document.createElement('li');
        taskUI.className = 'task';

        const taskContent = `<label class="task__label">
                                <input type="checkbox" class="task__checkbox" ${task.status === STATUSES.DONE ? 'checked' : ''}>
                                <p class="task__label-text">
                                    ${task.name}
                                </p>
                            </label>
                            <button class="task__delete">
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line y1="-0.5" x2="20.7803" y2="-0.5" transform="matrix(0.710506 0.703691 -0.65218 0.758064 1 1)" stroke="#998899"/>
                                    <line y1="-0.5" x2="20.8155" y2="-0.5" transform="matrix(0.693335 -0.720616 0.670126 0.742247 1.56787 16)" stroke="#998899"/>
                                </svg>
                            </button>`;

        taskUI.innerHTML = taskContent;

        switch(task.priority) {
            case PRIORITIES.HIGH:
                highList.insertAdjacentElement('beforeend', taskUI);
                break;
            case PRIORITIES.LOW:
                lowList.insertAdjacentElement('beforeend', taskUI);
                break;
            default:
                break;
        }

        const btnDelete = taskUI.querySelector('.task__delete');
        btnDelete.addEventListener('click', (event) => {
            event.stopPropagation();

            toDoList.deleteTask(task.id);

            showTasks();
        });

        taskUI.addEventListener('click', () => {
            toDoList.changeStatus(task.id);

            showTasks();
        });
    })
}

const clearTasks = () => {
    const taskLists = document.querySelectorAll('.toDoList__list');

    taskLists.forEach(taskList => taskList.innerHTML = '');
}

const taskSubmitHandler = (event) => {
    event.preventDefault();

    const form = event.target;
    const taskInput = form.querySelector('.toDoList__form-input');
    const priority = form.id === 'high-form' ? 'high' : 'low';

    toDoList.addTask(taskInput.value, priority);
    taskInput.value = "";

    showTasks();
}

forms.forEach(form => form.addEventListener('submit', taskSubmitHandler));

showTasks();