import { useState } from 'react';
import { Calendar, FileText, BookCheck } from 'lucide-react';
import { TaskModal } from './TaskModal';
import { useTaskContext } from '../../context/TaskContext';

type ModalType = 'today' | 'completed' | 'pending' | null;

export const TaskStats = () => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const { isLoading, todayTasks, completedTasks, pendingTasks } = useTaskContext();

  const getModalTitle = (type: ModalType): string => {
    switch (type) {
      case 'today':
        return "Today's Tasks";
      case 'completed':
        return 'Completed Tasks';
      case 'pending':
        return 'Pending Tasks';
      default:
        return '';
    }
  };

  const getModalTasks = (type: ModalType) => {
    switch (type) {
      case 'today':
        return todayTasks;
      case 'completed':
        return completedTasks;
      case 'pending':
        return pendingTasks;
      default:
        return [];
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div 
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => setModalType('today')}
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-lg w-12">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h2 className="card-title text-base">Today's Tasks</h2>
                <div className="stat-value text-primary text-2xl">
                  {isLoading ? '...' : todayTasks.length}
                </div>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost btn-sm">View all</button>
            </div>
          </div>
        </div>

        
        <div 
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => setModalType('completed')}
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-secondary text-secondary-content rounded-lg w-12">
                  <BookCheck className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h2 className="card-title text-base">Completed Tasks</h2>
                <div className="stat-value text-secondary text-2xl">
                  {isLoading ? '...' : completedTasks.length}
                </div>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost btn-sm">View</button>
            </div>
          </div>
        </div>

        
        <div 
          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          onClick={() => setModalType('pending')}
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="bg-accent text-accent-content rounded-lg w-12">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h2 className="card-title text-base">Pending Tasks</h2>
                <div className="stat-value text-accent text-2xl">
                  {isLoading ? '...' : pendingTasks.length}
                </div>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost btn-sm">See all</button>
            </div>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={getModalTitle(modalType)}
        tasks={getModalTasks(modalType)}
      />
    </>
  );
};