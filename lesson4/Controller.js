export class ControllerAPI {
    constructor(API) {
        if (!API) {
            throw new Error('API not found');
        }
        this.API = API;
    }

    async getAllTasks(filters = {}) {
        console.log('Загрузка всех задач...');
        const result = await this.API.getAllTasks(filters);
        console.log('Все задачи загружены:', result);
        return result;
    }

    async getTaskById(id) {
        console.log(`Загрузка задачи ${id}...`);
        const result = await this.API.getTaskById(id);
        console.log(`Задача ${id} загружена:`, result);
        return result;
    }

    async postTask(data) {
        console.log('Создание новой задачи...');
        const result = await this.API.postTask(data);
        console.log('Задача создана:', result);
        return result;
    }

    async patchTask(id, data) {
        console.log(`Обновление задачи ${id}...`);
        const result = await this.API.patchTask(id, data);
        console.log(`Задача ${id} обновлена:`, result);
        return result;
    }

    async deleteTask(id) {
        console.log(`Удаление задачи ${id}...`);
        const result = await this.API.deleteTask(id);
        console.log(`Задача ${id} удалена:`, result);
        return result;
    }
}