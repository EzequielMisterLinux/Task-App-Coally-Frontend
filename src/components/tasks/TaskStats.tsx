import { useState } from 'react';
import { Calendar, FileText, BookCheck } from 'lucide-react';
import { Task } from '../../interfaces/Tasks';
import { TaskModal } from './TaskModal';

interface TaskStatsProps {
  tasks: Task[];
  isLoading: boolean;
}

type ModalType = 'today' | 'completed' | 'pending' | null;

export const TaskStats = ({ tasks, isLoading }: TaskStatsProps) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const getTodaysTasks = (tasks: Task[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter(task => {
      const taskDate = new Date(task.createAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime() && !task.completed;
    });
  };

  const getCompletedTasks = (tasks: Task[]) => {
    return tasks.filter(task => task.completed);
  };

  const getPendingTasks = (tasks: Task[]) => {
    return tasks.filter(task => !task.completed);
  };

  const todaysTasks = !isLoading ? getTodaysTasks(tasks) : [];
  const completedTasks = !isLoading ? getCompletedTasks(tasks) : [];
  const pendingTasks = !isLoading ? getPendingTasks(tasks) : [];

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

  const getModalTasks = (type: ModalType): Task[] => {
    switch (type) {
      case 'today':
        return todaysTasks;
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
        {/* Today's Tasks Card */}
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
                  {isLoading ? '...' : todaysTasks.length}
                </div>
              </div>
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost btn-sm">View all</button>
            </div>
          </div>
        </div>

        {/* Completed Tasks Card */}
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

        {/* Pending Tasks Card */}
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