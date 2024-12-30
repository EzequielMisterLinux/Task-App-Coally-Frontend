import { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
interface DeleteTaskProps {
  taskId: string;
  onDelete?: () => void;
}

export const DeleteTask = ({ taskId, onDelete }: DeleteTaskProps) => {
    const { deleteTask } = useTaskContext();
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleDelete = async () => {
      try {
        setIsDeleting(true);
        await deleteTask(taskId);
        setShowConfirm(false);
      } catch (err) {
        setError('Failed to delete task');
      } finally {
        setIsDeleting(false);
      }
    };

  return (
    <>
      <button 
        className="btn btn-error btn-sm"
        onClick={() => setShowConfirm(true)}
      >
        Delete
      </button>

      {showConfirm && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowConfirm(false)}></div>
          <div className="modal modal-open z-50">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirm Delete</h3>
              <p className="py-4">Are you sure you want to delete this task? This action cannot be undone.</p>
              {error && (
                <div className="alert alert-error mb-4">
                  <p>{error}</p>
                </div>
              )}
              <div className="modal-action">
                <button 
                  className="btn" 
                  onClick={() => setShowConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-error" 
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};