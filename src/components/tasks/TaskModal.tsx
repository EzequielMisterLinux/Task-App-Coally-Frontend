import { Task } from '../../interfaces/Tasks';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tasks: Task[];
}

export const TaskModal = ({ isOpen, onClose, title, tasks }: TaskModalProps) => {
  if (!isOpen) return null;

  return (
    <>

      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      <div className="modal modal-open z-50">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">{title}</h3>
            <button 
              className="btn btn-sm btn-circle btn-ghost"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>User</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task._id}>
                      <td className="font-medium">{task.title}</td>
                      <td className="max-w-xs truncate">{task.description}</td>
                      <td>
                        <div className={`badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
                          {task.completed ? 'Completed' : 'Pending'}
                        </div>
                      </td>
                      <td>{new Date(task.createAt).toLocaleDateString()}</td>
                      <td>{task.user.names} {task.user.lastnames}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};