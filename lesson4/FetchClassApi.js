export class TaskAPI {
    constructor(baseURL = 'https://tasks-service-maks1394.amvera.io') {
        this.baseURL = baseURL;
    }

    async getAllTasks(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${this.baseURL}/tasks${queryParams ? `?${queryParams}` : ''}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        console.log('All tasks:', result);
        return result;
    }

    async getTaskById(id) {
        const response = await fetch(`${this.baseURL}/tasks/${id}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        console.log('Task id:', result);
        return result;
    }

    async postTask(data) {
        const response = await fetch(`${this.baseURL}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        console.log('Task Post:', result);
        return result;
    }

    async patchTask(id, data) {
        const response = await fetch(`${this.baseURL}/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const result = await response.json();
        console.log('Task Patch:', result);
        return result;
    }

    async deleteTask(id) {
        const response = await fetch(`${this.baseURL}/tasks/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);

        try {
            const result = await response.json();
            console.log('Task deleted:', result);
            return result;
        } catch {
            return { success: true, message: 'Task deleted' };
        }
    }
}

