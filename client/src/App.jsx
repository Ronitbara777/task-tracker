import React, { useState, useEffect, useMemo } from 'react';
import * as api from './api/tasks';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for filtering and sorting
  const [filters, setFilters] = useState({ status: 'all', priority: 'all' });
  const [sort, setSort] = useState('newest');
  
  // State for modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [filters]); // Reload from API when filters change (as backend supports filtering)

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await api.getAllTasks(filters);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      await api.createTask(taskData);
      setIsFormOpen(false);
      loadTasks();
    } catch (err) {
      alert(err.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      await api.updateTask(editingTask._id, taskData);
      setIsFormOpen(false);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      alert(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      loadTasks();
    } catch (err) {
      alert(err.message || 'Failed to delete task');
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      await api.updateTask(task._id, { ...task, status: 'completed' });
      loadTasks();
    } catch (err) {
      alert(err.message || 'Failed to mark task as completed');
    }
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  // Client-side sorting
  const sortedTasks = useMemo(() => {
    if (!tasks) return [];
    return [...tasks].sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });
  }, [tasks, sort]);

  // Derived stats
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                Task Tracker
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} · {completedCount} completed · {pendingCount} pending
              </p>
            </div>
            <button 
              onClick={openCreateForm}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              New Task
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p>{error}</p>
          </div>
        )}

        <FilterBar 
          filters={filters} 
          setFilters={setFilters} 
          sort={sort} 
          setSort={setSort} 
        />

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <TaskList 
            tasks={sortedTasks} 
            onEdit={openEditForm} 
            onDelete={handleDeleteTask} 
            onComplete={handleCompleteTask} 
          />
        )}
      </main>

      {/* Form Modal */}
      {isFormOpen && (
        <TaskForm 
          initialData={editingTask} 
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask} 
          onCancel={closeForm} 
        />
      )}
    </div>
  );
}

export default App;
