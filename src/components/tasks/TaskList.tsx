import { Task } from '../../interfaces/Tasks';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

export const TaskList = ({ tasks, isLoading, error }: TaskListProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Recent Tasks</h2>
      {error && (
        <div className="alert alert-error mb-4">
          <p>{error}</p>
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};