import { Plus } from 'lucide-react';

export const TaskHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-2xl font-bold">My Workspace</h1>
      <div className="flex gap-2">
        <div className="form-control">
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="input input-bordered w-full max-w-xs" 
          />
        </div>
        <button className="btn btn-primary">
          <Plus className="h-5 w-5" />
          New Task
        </button>
      </div>
    </div>
  );
};