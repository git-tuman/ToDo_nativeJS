import data from './tasks.json' with {type: "json"};
import { ERROR, STATUSES } from './constants.js';

function Task(name, priority) {
    this.id = Math.floor(Math.random() * 1000);
    this.name = name;
    this.status = STATUSES.TO_DO;
    this.priority = priority;
}

export const toDoList = {
    list: data.tasks,

    getIndexTask(id) {
        return this.list.findIndex(task => task.id === id);
    },

    checkValidStatus(newStatus) {
        for (const status in STATUSES) {
            const isValidStatus = newStatus === STATUSES[status];
            if (isValidStatus) {
                return isValidStatus;
            }

        }

        return false;
    },

    isTaskInList(indexTask) {
        return indexTask !== -1;
    },

    changeStatus(id) {
        const indexTask = this.getIndexTask(id);
        const task = this.list[indexTask];

        switch (task.status) {
            case STATUSES.TO_DO:
                task.status = STATUSES.DONE;
                break;

            case STATUSES.DONE:
                task.status = STATUSES.TO_DO;
                break;

            default:
                break;
        }
    },

    addTask(name, priority) {
        const isNotCorrectlyName = name.length > 30 || name.length < 3;

        if (isNotCorrectlyName) {
            alert(ERROR);
            throw new Error(ERROR);
        }

        this.list.push(new Task(name, priority));
    },

    deleteTask(id) {
        const indexTask = this.getIndexTask(id);

        this.list.splice(indexTask, 1);
    }
}
