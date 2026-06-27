import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [initialData]);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'title') {
      if (!value.trim()) error = 'Title is required';
      else if (value.trim().length < 3) error = 'Title must be at least 3 characters';
    } else if (name === 'description') {
      if (value.trim().length > 500) error = 'Description cannot exceed 500 characters';
    } else if (name === 'dueDate') {
      if (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        // Parse date as local time by adding T00:00:00 to avoid timezone shifts
        const selectedDate = new Date(value + 'T00:00:00'); 
        if (selectedDate < today) {
          error = 'Due date cannot be in the past';
        }
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error as soon as it's fixed
    if (errors[name]) {
      const fieldError = validateField(name, value);
      if (!fieldError) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      } else {
        setErrors(prev => ({ ...prev, [name]: fieldError }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const titleError = validateField('title', formData.title);
    const descError = validateField('description', formData.description);
    const dateError = validateField('dueDate', formData.dueDate);
    
    const newErrors = {};
    if (titleError) newErrors.title = titleError;
    if (descError) newErrors.description = descError;
    if (dateError) newErrors.dueDate = dateError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit(formData);
  };

  const getInputClassName = (fieldName) => {
    const base = "w-full bg-slate-900 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 transition-colors";
    if (errors[fieldName]) {
      return `${base} border-red-500 focus:border-red-500 focus:ring-red-500`;
    }
    return `${base} border-slate-700 focus:border-indigo-500 focus:ring-indigo-500`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-800 rounded-2xl w-full max-w-lg border border-slate-700 shadow-2xl relative my-8">
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">
            {initialData ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-300">Title <span className="text-red-400">*</span></label>
              <span className={`text-xs ${formData.title.length > 100 ? 'text-red-400' : 'text-slate-500'}`}>
                {formData.title.length}/100
              </span>
            </div>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={100}
              className={getInputClassName('title')}
              placeholder="What needs to be done?"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1.5">{errors.title}</p>}
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-slate-300">Description</label>
              <span className={`text-xs ${formData.description.length > 500 ? 'text-red-400' : 'text-slate-500'}`}>
                {formData.description.length}/500
              </span>
            </div>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={500}
              rows="3"
              className={`${getInputClassName('description')} resize-none`}
              placeholder="Add some details..."
            />
            {errors.description && <p className="text-red-400 text-xs mt-1.5">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Priority</label>
              <select 
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Status</label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Due Date</label>
            <input 
              type="date" 
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${getInputClassName('dueDate')} [color-scheme:dark]`}
            />
            {errors.dueDate && <p className="text-red-400 text-xs mt-1.5">{errors.dueDate}</p>}
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button 
              type="button" 
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20"
            >
              {initialData ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
