import axiosInstance from "../config/axiosConfig";
import type { Post } from "../interfaces/post";

const getPosts = async (): Promise<Post[]> => {
	const response = await axiosInstance.get<Post[]>("/posts");
	return response.data;
};

const getPost = async (id: string) => {
	const response = await axiosInstance.get(`/posts/${id}`);
	return response.data;
};

const createPost = async (post: any) => {
	const response = await axiosInstance.post("/posts", post);
	return response.data;
};

const updatePost = async (id: string, post: any) => {
	const response = await axiosInstance.patch(`/posts/${id}`, post);
	return response.data;
};

const deletePost = async (id: string) => {
	const response = await axiosInstance.delete(`/posts/${id}`);
	return response.data;
};

export { getPosts, getPost, createPost, updatePost, deletePost };
