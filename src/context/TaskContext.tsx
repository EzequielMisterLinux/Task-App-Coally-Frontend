import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, CreateTaskDto } from '../interfaces/Tasks';
import { TaskProvider } from '../api/taskProvider';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  todayTasks: Task[];
  completedTasks: Task[];
  pendingTasks: Task[];
  refreshTasks: () => Promise<void>;
  createTask: (taskData: CreateTaskDto) => Promise<void>;
  updateTask: (taskId: string, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  filteredTasks: Task[];
  setFilteredTasks: (tasks: Task[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const getTodaysTasks = (tasks: Task[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return tasks.filter(task => {
      const taskDate = new Date(task.createAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime() && !task.completed;
    });
  };

  const getCompletedTasks = (tasks: Task[]) => {
    return tasks.filter(task => task.completed);
  };

  const getPendingTasks = (tasks: Task[]) => {
    return tasks.filter(task => !task.completed);
  };

  const refreshTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await TaskProvider.getTasks();
      setTasks(response);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskDto) => {
    try {
      setIsLoading(true);
      setError(null);
      await TaskProvider.createTask(taskData);
      await refreshTasks();
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      setIsLoading(true);
      setError(null);

      const updateData = {
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed
      };
      await TaskProvider.updateTask(taskId, updateData);
      await refreshTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await TaskProvider.deleteTask(taskId);
      await refreshTasks();
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const value = {
    tasks,
    isLoading,
    error,
    todayTasks: getTodaysTasks(tasks),
    completedTasks: getCompletedTasks(tasks),
    pendingTasks: getPendingTasks(tasks),
    filteredTasks,
    setFilteredTasks,
    refreshTasks,
    createTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskContextProvider');
  }
  return context;
};