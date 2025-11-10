import { ControllerAPI } from "./Controller.js";
import { TaskAPI } from "./FetchClassApi.js";
import { TaskApiXml } from "./XMLHttpRequest.js";


// fetch with controller
const api = new TaskAPI('https://tasks-service-maks1394.amvera.io');
const controller = new ControllerAPI(api);

// Функции для кнопок
window.getAllTasks = async function getAllTasks() {
    await controller.getAllTasks({ isImportant: false, isCompleted: false });
}

window.getTaskById = async function getTaskById() {
    await controller.getTaskById(540);
}

window.postTask = async function postTask() {
    await controller.postTask({
        name: 'Task 3',
        isImportant: false
    });
}

window.patchTask = async function patchTask() {
    await controller.patchTask(383, {
        isCompleted: false
    });
}

window.deleteTask = async function deleteTask() {
    await controller.deleteTask(566);
}


//XML
// экземпляр XML
const apiXml = new TaskApiXml('https://tasks-service-maks1394.amvera.io');

// Функции для кнопок
window.getAllTasksXml = async function getAllTasksXml() {
    await apiXml.getAllTasks();
}

window.getTaskByIdXml = async function getTaskByIdXml() {
    await apiXml.getTaskById(540);
}

window.postTaskXml = async function postTaskXml() {
    await apiXml.postTask({
        name: 'Task 4',
        isImportant: true
    });
}

window.patchTaskXml = async function patchTaskXml() {
    await apiXml.patchTask(383, {
        isCompleted: false
    });
}

window.deleteTaskXml = async function deleteTaskXml() {
    await apiXml.deleteTask(567);
}