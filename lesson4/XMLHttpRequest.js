export class TaskApiXml {
    constructor(baseURL = 'https://tasks-service-maks1394.amvera.io') {
        this.baseURL = baseURL;
    }

    _makeRequest(method, url, data = null) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = xhr.responseText ? JSON.parse(xhr.responseText) : {};
                        resolve(response);
                    } catch (e) {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error(`Error: ${xhr.status}`));
                }
            };

            xhr.onerror = function() {
                reject(new Error('Network error'));
            };

            xhr.ontimeout = function() {
                reject(new Error('Request timeout'));
            };

            xhr.send(data ? JSON.stringify(data) : null);
        });
    }

    async getAllTasks(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const url = `${this.baseURL}/tasks${queryParams ? `?${queryParams}` : ''}`;

        try {
            const result = await this._makeRequest('GET', url);
            console.log('All tasks:', result);
            return result;
        } catch (error) {
            console.error('Error getting all tasks:', error);
            throw error;
        }
    }

    async getTaskById(id) {
        const url = `${this.baseURL}/tasks/${id}`;

        try {
            const result = await this._makeRequest('GET', url);
            console.log('Task id:', result);
            return result;
        } catch (error) {
            console.error(`Error getting task ${id}:`, error);
            throw error;
        }
    }

    async postTask(data) {
        const url = `${this.baseURL}/tasks`;

        try {
            const result = await this._makeRequest('POST', url, data);
            console.log('Task Post:', result);
            return result;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

    async patchTask(id, data) {
        const url = `${this.baseURL}/tasks/${id}`;

        try {
            const result = await this._makeRequest('PATCH', url, data);
            console.log('Task Patch:', result);
            return result;
        } catch (error) {
            console.error(`Error updating task ${id}:`, error);
            throw error;
        }
    }

    async deleteTask(id) {
        const url = `${this.baseURL}/tasks/${id}`;

        try {
            const result = await this._makeRequest('DELETE', url);
            console.log('Task deleted:', result);
            return result;
        } catch (error) {
            console.error(`Error deleting task ${id}:`, error);
            throw error;
        }
    }
}