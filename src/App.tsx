import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
import { getTodos } from "./api/todos";
import type { Post } from "./interfaces/post";
import type { Todo } from "./interfaces/todos";

function App() {
	const {
		data: postData,
		error: postError,
		isLoading: postIsLoading,
	}: UseQueryResult<Post[], Error> = useQuery<Post[], Error>({
		queryKey: ["posts"],
		queryFn: getPosts,
	});

	const {
		data: todoData,
		error: todoError,
		isLoading: todoIsLoading,
	}: UseQueryResult<Todo[], Error> = useQuery<Todo[], Error>({
		queryKey: ["todos"],
		queryFn: getTodos,
	});

	if (postIsLoading || todoIsLoading) {
		return <div>Loading...</div>;
	}

	if (postError || todoError) {
		return (
			<div>An error occurred: {postError?.message || todoError?.message}</div>
		);
	}

	return (
		<main className="w-full">
			<section className="flex items-center justify-center flex-col">
				<h1 className="font-bold text-xl">Posts</h1>
				<div className="grid grid-cols-3 gap-4 p-4">
					{postData?.map((post) => (
						<div key={post.id} className="p-3 shadow rounded-md">
							{post.title}
						</div>
					))}
				</div>
			</section>
			<section className="flex items-center justify-center flex-col">
				<h1 className="font-bold text-xl">Todos</h1>
				<div className="grid grid-cols-3 gap-4 p-4">
					{todoData?.map((todo) => (
						<div key={todo.id} className="p-3 shadow rounded-md">
							{todo.title}
						</div>
					))}
				</div>
			</section>
		</main>
	);
}

export default App;
