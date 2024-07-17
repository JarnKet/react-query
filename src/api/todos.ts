import axiosInstance from "../config/axiosConfig";
import type { Todo } from "../interfaces/todos";

const getTodos = async (): Promise<Todo[]> => {
	const response = await axiosInstance.get<Todo[]>("/todos");
	return response.data;
};

const getTodo = async (id: string) => {
	const response = await axiosInstance.get(`/todos/${id}`);
	return response.data;
};

const createTodo = async (todo: any) => {
	const response = await axiosInstance.post("/todos", todo);
	return response.data;
};

const updateTodo = async (id: string, todo: any) => {
	const response = await axiosInstance.patch(`/todos/${id}`, todo);
	return response.data;
};

const deleteTodo = async (id: string) => {
	const response = await axiosInstance.delete(`/todos/${id}`);
	return response.data;
};

export { getTodos, getTodo, createTodo, updateTodo, deleteTodo };
