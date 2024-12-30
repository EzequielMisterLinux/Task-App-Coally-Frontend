import { useState } from 'react';
import { Task } from '../../interfaces/Tasks';
import { TaskDetailModal } from './TaskDetailModal';
import { DeleteTask } from './DeleteTask';

interface TaskActionsProps {
  task: Task;
}

export const TaskActions = ({ task }: TaskActionsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

  const handleView = () => {
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = () => {
    setModalMode('edit');
    setModalOpen(true);
  };

  return (
    <div className="flex gap-2">
      <button 
        className="btn btn-ghost btn-sm"
        onClick={handleEdit}
      >
        Edit
      </button>
      <button 
        className="btn btn-primary btn-sm"
        onClick={handleView}
      >
        View
      </button>
      <DeleteTask taskId={task._id} />
      
      <TaskDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        taskId={task._id}
        mode={modalMode}
      />
    </div>
  );
};