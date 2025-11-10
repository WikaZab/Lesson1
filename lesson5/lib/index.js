var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'https://tasks-service-maks1394.amvera.io';
const BASE_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
    },
};
class BaseFetchAgent {
    constructor(_apiUrl) {
        this._apiUrl = _apiUrl;
    }
    fetchRequest(url_1) {
        return __awaiter(this, arguments, void 0, function* (url, config = {}) {
            const fullUrl = `${this._apiUrl}${url}`;
            const response = yield fetch(fullUrl, Object.assign(Object.assign({}, BASE_CONFIG), config));
            if (response.ok) {
                const data = yield response.json();
                return data;
            }
            throw new Error(String(response.status));
        });
    }
}
export class TaskAgent extends BaseFetchAgent {
    constructor() {
        super(API_URL);
        this.getAllTasks = (...args_1) => __awaiter(this, [...args_1], void 0, function* (filters = {}) {
            const queryParams = new URLSearchParams(filters).toString();
            const url = `/tasks${queryParams ? `?${queryParams}` : ''}`;
            try {
                const response = yield this.fetchRequest(url);
                return response;
            }
            catch (error) {
                throw new Error('Failed to get All tasks');
            }
        });
        this.getTaskById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.fetchRequest(`/tasks/${id}`);
                return response;
            }
            catch (error) {
                throw new Error('Failed to get task');
            }
        });
        this.addTask = (newTask) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.fetchRequest('/tasks', {
                    method: 'POST',
                    body: JSON.stringify(newTask),
                });
                return response;
            }
            catch (error) {
                throw new Error('Failed to create task');
            }
        });
        this.updateTask = (id, updatedTask) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.fetchRequest(`/tasks/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(updatedTask),
                });
                return response;
            }
            catch (error) {
                throw new Error('Failed to update task');
            }
        });
        this.deleteTask = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.fetchRequest(`/tasks/${id}`, {
                    method: 'DELETE',
                });
            }
            catch (error) {
                throw new Error('Failed to delete task');
            }
        });
    }
}
const requests = new TaskAgent();
requests.getTaskById(861).then((data) => console.log('Task', data));
requests.getAllTasks({ isImportant: true, isCompleted: false }).then((data) => console.log('Tasks', data));
//# sourceMappingURL=index.js.map