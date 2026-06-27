import React from 'react';

const FilterBar = ({ filters, setFilters, sort, setSort }) => {
  const statuses = ['all', 'todo', 'in-progress', 'completed'];
  const priorities = ['all', 'low', 'medium', 'high'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'dueDate', label: 'Due Date' }
  ];

  return (
    <div className="bg-slate-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center mb-6 shadow-sm border border-slate-700">
      <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm font-medium">Status:</span>
          <select 
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="bg-slate-700 text-white rounded-lg px-3 py-1.5 text-sm border border-slate-600 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm font-medium">Priority:</span>
          <select 
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="bg-slate-700 text-white rounded-lg px-3 py-1.5 text-sm border border-slate-600 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
          >
            {priorities.map(p => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-slate-400 text-sm font-medium">Sort:</span>
        <select 
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-slate-700 text-white rounded-lg px-3 py-1.5 text-sm border border-slate-600 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer w-full md:w-auto"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
