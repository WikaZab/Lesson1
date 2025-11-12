interface Task {
    id: number;
    name: string;
    info?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
}

interface TaskFilters {
    isImportant?: boolean;
    isCompleted?: boolean;
}

interface CreateTaskData {
    name: string;
    info?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
}

interface UpdateTaskData {
    name?: string;
    info?: string;
    isImportant?: boolean;
    isCompleted?: boolean;
}

// Класс API
const API_URL = 'https://tasks-service-maks1394.amvera.io';
const BASE_CONFIG: RequestInit = {
    headers: {
        'Content-Type': 'application/json',
    },
};

class BaseFetchAgent {
    constructor(private _apiUrl: string) {}

    protected async fetchRequest<ReturnDataType>(
        url: string,
        config: RequestInit = {}
    ): Promise<ReturnDataType> {
        const fullUrl = `${this._apiUrl}${url}`;
        const response = await fetch(fullUrl, {
            ...BASE_CONFIG,
            ...config,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        throw new Error(String(response.status));
    }
}

export class TaskAgent extends BaseFetchAgent {
    constructor() {
        super(API_URL);
    }

    getAllTasks = async (filters: TaskFilters = {}): Promise<Task[]> => {
        const queryParams = new URLSearchParams(filters as Record<string, string>).toString();
        const url = `/tasks${queryParams ? `?${queryParams}` : ''}`;

        try {
            const response = await this.fetchRequest<Task[]>(url);
            return response;
        } catch (error) {
            throw new Error('Failed to get All tasks');
        }
    }

    getTaskById = async (id: number): Promise<Task> => {
        try {
            const response = await this.fetchRequest<Task>(`/tasks/${id}`);
            return response;
        } catch (error) {
            throw new Error('Failed to get task');
        }
    }

    addTask = async (newTask: CreateTaskData): Promise<Task> => {
        try {
            const response = await this.fetchRequest<Task>('/tasks', {
                method: 'POST',
                body: JSON.stringify(newTask),
            });
            return response;
        } catch (error) {
            throw new Error('Failed to create task');
        }
    }

    updateTask = async (id: number, updatedTask: UpdateTaskData): Promise<Task> => {
        try {
            const response = await this.fetchRequest<Task>(`/tasks/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedTask),
            });
            return response;
        } catch (error) {
            throw new Error('Failed to update task');
        }
    }

    deleteTask = async (id: number): Promise<void> => {
        try {
            await this.fetchRequest(`/tasks/${id}`, {
                method: 'DELETE',
            });
        } catch (error) {
            throw new Error('Failed to delete task');
        }
    }
}
const requests = new TaskAgent();

requests.getAllTasks({isImportant: true, isCompleted: false}).then((data) => console.log('Tasks', data));
requests.getTaskById(861).then((data) => console.log('Task', data));
// requests.updateTask(861, {name:'Task', info: '123', isImportant: false}).then((data) => console.log('Update Tasks', data));
// requests.addTask({name: 'My task', info: '123', isImportant: false, isCompleted: true}).then((data) => console.log('New Task', data));
// requests.deleteTask(860).then(() => console.log('Delete task'));