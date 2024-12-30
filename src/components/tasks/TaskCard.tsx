import { useTaskContext } from '../../context/TaskContext';
import { Task } from '../../interfaces/Tasks';
import { TaskActions } from './TaskActions';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { updateTask } = useTaskContext();
  
  const handleToggleComplete = async () => {
    await updateTask(task._id, { completed: !task.completed });
  };

  return (
    <div 
      className="card bg-base-100 shadow-xl cursor-pointer hover:bg-base-200 transition-colors"
      onClick={handleToggleComplete}
    >
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h2 className="card-title">{task.title}</h2>
          <div className={`badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </div>
        </div>
        <p className="text-base-content/70">{task.description}</p>
        <div className="flex items-center gap-2 text-sm text-base-content/60">
          <span>By: {task.user.names} {task.user.lastnames}</span>
        </div>
        <div className="text-sm text-base-content/60">
          Created: {new Date(task.createAt).toLocaleDateString()}
        </div>
        <div 
          className="card-actions justify-end" 
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <TaskActions task={task} />
        </div>
      </div>
    </div>
  );
};