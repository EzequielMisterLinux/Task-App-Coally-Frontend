import { Layout } from '../components/Layout';
import { TaskHeader } from '../components/tasks/TaskHeader';
import { TaskStats } from '../components/tasks/TaskStats';
import { TaskList } from '../components/tasks/TaskList';
import { useTaskContext } from '../context/TaskContext';

export const DashboardPage = () => {
  const { error } = useTaskContext();

  return (
    <Layout>
      <div className="space-y-6">
        <TaskHeader />
        <TaskStats />
        <TaskList error={error} />
      </div>
    </Layout>
  );
};

export default DashboardPage;