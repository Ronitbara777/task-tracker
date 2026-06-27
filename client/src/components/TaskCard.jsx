import React from 'react';

const priorityColors = {
  low: 'bg-green-500/10 text-green-400 border-green-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  high: 'bg-red-500/10 text-red-400 border-red-500/20'
};

const statusColors = {
  todo: 'bg-slate-600/20 text-slate-300 border-slate-600/30',
  'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
};

const TaskCard = ({ task, onEdit, onDelete, onComplete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric' 
    });
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className={`bg-slate-800 rounded-xl p-5 border shadow-sm transition-all duration-200 hover:shadow-lg ${isCompleted ? 'border-emerald-500/30 opacity-75' : 'border-slate-700 hover:border-indigo-500/50'}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-lg font-semibold ${isCompleted ? 'text-slate-400 line-through' : 'text-white'}`}>
          {task.title}
        </h3>
        <div className="flex gap-2">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${priorityColors[task.priority] || priorityColors.medium}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusColors[task.status] || statusColors.todo}`}>
            {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p className={`text-sm mb-4 line-clamp-3 ${isCompleted ? 'text-slate-500' : 'text-slate-400'}`}>
          {task.description}
        </p>
      )}
      
      <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-700/50">
        <div className="text-xs text-slate-500">
          {task.dueDate ? (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Due {formatDate(task.dueDate)}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Created {formatDate(task.createdAt)}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {!isCompleted && (
            <button 
              onClick={() => onComplete(task)}
              className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors"
              title="Mark Completed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </button>
          )}
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-lg transition-colors"
            title="Edit Task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this task?')) onDelete(task._id);
            }}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            title="Delete Task"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
