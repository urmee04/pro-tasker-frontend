//import the pre-configured axios instance with base URL and auth interceptors
import api from "./axios";

//create a new task within a specific project
export const createTask = (projectId, payload) =>
  api.post(`/projects/${projectId}/tasks`, payload); //POST request to /projects/:projectId/tasks

//retrieve all tasks for a specific project
export const getProjectTasks = (projectId) =>
  api.get(`/projects/${projectId}/tasks`); //GET request to /projects/:projectId/tasks

//update an existing task by its ID
export const updateTask = (taskId, payload) =>
  api.put(`/tasks/${taskId}`, payload); //PUT request to /tasks/:taskId

//delete a task by its ID
export const deleteTask = (taskId) => api.delete(`/tasks/${taskId}`); //DELETE request to /tasks/:taskId
