//import the configured axios instance with base URL and auth interceptor
import api from "./axios";

//API service functions for project resource

//Get all projects
export const getProjects = () => api.get("/projects");

//Get a single project by ID
export const getProject = (id) => api.get(`/projects/${id}`);

//Create a new project with the provided payload
export const createProject = (payload) => api.post("/projects", payload);

//Update an existing project by ID with the provided payload
export const updateProject = (id, payload) =>
  api.put(`/projects/${id}`, payload);

//Delete a project by ID
export const deleteProject = (id) => api.delete(`/projects/${id}`);

//export the api instance as default for direct use if needed
export default api;
