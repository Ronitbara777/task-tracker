import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed">
        <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
        </div>
        <h3 className="text-xl font-medium text-slate-300 mb-2">No tasks found</h3>
        <p className="text-slate-500 max-w-sm">Get started by creating a new task, or adjust your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map(task => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          onComplete={onComplete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
