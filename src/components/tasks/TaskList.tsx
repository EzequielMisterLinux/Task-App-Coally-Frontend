import { useTaskContext } from '../../context/TaskContext';
import { TaskCard } from './TaskCard';

export const TaskList = () => {
  const { filteredTasks, isLoading, error } = useTaskContext();

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
          {filteredTasks?.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};