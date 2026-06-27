const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const getAllTasks = async (filters = {}) => {
  const query = new URLSearchParams();
  if (filters.status && filters.status !== 'all') query.append('status', filters.status);
  if (filters.priority && filters.priority !== 'all') query.append('priority', filters.priority);
  
  const response = await fetch(`${API_URL}/api/tasks?${query.toString()}`);
  return handleResponse(response);
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};
