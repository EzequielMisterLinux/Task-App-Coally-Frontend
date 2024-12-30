import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Task } from '../interfaces/Tasks';
import { TaskProvider } from '../api/taskProvider';
import { TaskHeader } from '../components/tasks/TaskHeader';
import { TaskStats } from '../components/tasks/TaskStats';
import { TaskList } from '../components/tasks/TaskList';

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await TaskProvider.getTasks();
        setTasks(response);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <TaskHeader />
        <TaskStats tasks={tasks} isLoading={isLoading} />
        <TaskList tasks={tasks} isLoading={isLoading} error={error} />
      </div>
    </Layout>
  );
};

export default DashboardPage;