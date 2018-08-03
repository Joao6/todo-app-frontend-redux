import axios from "axios";

const server = axios.create({ baseURL: "http://localhost:3003/api/" });

export const getTodos = search => server.get(`todos?sort=-createAt${search}`);
export const createTodos = description => server.post(`todos`, { description });
export const updateTodos = todo => server.put(`todos/${todo._id}`, todo);
export const deleteTodos = id => server.delete(`todos/${id}`);

const api = {
  getTodos,
  createTodos,
  updateTodos,
  deleteTodos
};

export default api;
