import { useState, useEffect } from 'react';
import { Task } from '../../interfaces/Tasks';
import { TaskProvider } from '../../api/taskProvider';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string | null;
  mode: 'view' | 'edit';
  onUpdate?: () => void;
}

export const TaskDetailModal = ({ isOpen, onClose, taskId, mode, onUpdate }: TaskDetailModalProps) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const taskData = await TaskProvider.getTaskById(taskId);
        setTask(taskData);
        setFormData({
          title: taskData.title,
          description: taskData.description,
          completed: taskData.completed,
        });
      } catch (err) {
        setError('Failed to fetch task details');
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && taskId) {
      fetchTask();
    }
  }, [taskId, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId) return;

    try {
      setIsSaving(true);
      setError(null);
      await TaskProvider.updateTask(taskId, formData);
      onUpdate?.();
      onClose();
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      <div className="modal modal-open z-50">
        <div className="modal-box w-11/12 max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">
              {mode === 'view' ? 'Task Details' : 'Edit Task'}
            </h3>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-4">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : task ? (
            <div className="space-y-4">
              {mode === 'edit' ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="textarea textarea-bordered h-24"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Mark as completed</span>
                      <input
                        type="checkbox"
                        checked={formData.completed}
                        onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
                        className="checkbox checkbox-primary"
                      />
                    </label>
                  </div>

                  {error && (
                    <div className="alert alert-error">
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="modal-action">
                    <button 
                      type="button" 
                      className="btn" 
                      onClick={onClose}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold">Title</h4>
                      <p>{task.title}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Status</h4>
                      <div className={`badge ${task.completed ? 'badge-success' : 'badge-warning'}`}>
                        {task.completed ? 'Completed' : 'Pending'}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-semibold">Description</h4>
                      <p>{task.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Created At</h4>
                      <p>{new Date(task.createAt).toLocaleString()}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Created By</h4>
                      <p>{task.user.names} {task.user.lastnames}</p>
                    </div>
                  </div>

                  <div className="modal-action">
                    <button className="btn" onClick={onClose}>Close</button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};