import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, CreateTaskDto } from '../interfaces/Tasks';
import { TaskProvider } from '../api/taskProvider';
import { AlertModal } from '../modals/AlertModal';

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
  const [alertModalState, setAlertModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error' | 'info';
    message: string;
  }>({
    isOpen: false,
    type: 'success',
    message: ''
  });
  

  const showAlert = (type: 'success' | 'error' | 'info', message: string) => {
    setAlertModalState({ isOpen: true, type, message });
  };

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

  const getCompletedTasks = (tasks: Task[]) => tasks.filter(task => task.completed);
  const getPendingTasks = (tasks: Task[]) => tasks.filter(task => !task.completed);

  const refreshTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await TaskProvider.getTasks();
      setTasks(response);
    } catch (err) {
      console.error(err);
      
      setError('Failed to fetch tasks');
      showAlert('error', 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskDto) => {
    try {
      setIsLoading(true);
      await TaskProvider.createTask(taskData);
      await refreshTasks();
      showAlert('success', 'Task created successfully!');
    } catch (err) {
      showAlert('error', 'Failed to create task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      setIsLoading(true);
      const updateData = {
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed
      };
      await TaskProvider.updateTask(taskId, updateData);
      await refreshTasks();
      showAlert('success', 'Task updated successfully!');
    } catch (err) {
      showAlert('error', 'Failed to update task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setIsLoading(true);
      await TaskProvider.deleteTask(taskId);
      await refreshTasks();
      showAlert('success', 'Task deleted successfully!');
    } catch (err) {
      showAlert('error', 'Failed to delete task');
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

  return (
    <TaskContext.Provider value={value}>
      {children}
      <AlertModal
        isOpen={alertModalState.isOpen}
        onClose={() => setAlertModalState(prev => ({ ...prev, isOpen: false }))}
        type={alertModalState.type}
        message={alertModalState.message}
      />
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskContextProvider');
  }
  return context;
};