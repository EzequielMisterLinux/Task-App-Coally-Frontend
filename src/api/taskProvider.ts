import { Task } from '../interfaces/Tasks';
import { api } from "./AxiosRouter";

interface CreateTaskDto {
  title: string;
  description: string;
}

interface UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const TaskProvider = {
  getTasks: async (): Promise<Task[]> => {
    const { data } = await api.get('/tasks');
    return data;
  },
  
  getTaskById: async (id: string): Promise<Task> => {
    const { data } = await api.get(`/tasks/${id}`);
    return data;
  },

  createTask: async (taskData: CreateTaskDto): Promise<Task> => {
    const { data } = await api.post('/tasks', taskData);
    return data;
  },

  updateTask: async (id: string, taskData: UpdateTaskDto): Promise<Task> => {
    const { data } = await api.put(`/tasks/${id}`, taskData);
    return data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};