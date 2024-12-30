import { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTaskModal = ({ isOpen, onClose }: NewTaskModalProps) => {
  const { createTask, isLoading } = useTaskContext();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError(null);
      await createTask({
        title: formData.title,
        description: formData.description,
        completed: false,
      });
      

      setFormData({ title: '', description: '' });
      onClose();
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      
      <div className="modal modal-open z-50">
        <div className="modal-box">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Create New Task</h3>
            <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>✕</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Enter task title"
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
                placeholder="Enter task description"
                required
              />
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
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  'Create Task'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

