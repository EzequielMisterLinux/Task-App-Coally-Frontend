import { Layout } from '../components/Layout';
import { TaskHeader } from '../components/tasks/TaskHeader';
import { TaskStats } from '../components/tasks/TaskStats';
import { TaskList } from '../components/tasks/TaskList';

export const DashboardPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <TaskHeader />
        <TaskStats />
        <TaskList />
      </div>
    </Layout>
  );
};

export default DashboardPage;