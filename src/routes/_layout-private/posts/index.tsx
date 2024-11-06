import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

// Service
import { getPosts } from "@/api/posts";

// UI
import { Skeleton } from "@/components/ui/skeleton";

type SearchParams = {
	skip: number;
	limit: number;
};

const postsQueryOptions = (skip: number, limit: number) => {
	return queryOptions({
		queryKey: ["posts"],
		queryFn: () => getPosts({ skip, limit }),
	});
};

export const Route = createFileRoute("/_layout-private/posts/")({
	component: PostsIndexComponent,
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			skip: Number(search.skip) || 0,
			limit: Number(search.limit) || 10,
		};
	},
	loaderDeps: ({ search: { skip, limit } }) => ({ skip, limit }),
	// loader: () => getPosts(),
	loader: ({ context: { queryClient }, deps: { skip, limit } }) =>
		queryClient.ensureQueryData(postsQueryOptions(skip, limit)),
	// loader: ({ context: { queryClient }, deps: { skip, limit } }) =>
	// 	queryClient.fetchQuery(postQueryOptions(skip, limit)),

	pendingComponent: () => <Skeleton className="h-4 w-[250px]" />,
});

function PostsIndexComponent() {
	// const response = Route.useLoaderData();
	const { skip, limit } = Route.useSearch();
	const { data } = useSuspenseQuery(
		postsQueryOptions(Number(skip), Number(limit)),
	);

	// if (response) {
	// 	console.log(response, "Response");
	// }

	return (
		<div className="grid grid-cols-1 gap-4">
			{data?.map((post) => (
				<Link
					to={`/posts/${post.id}`}
					key={post.id}
					className="p-3 rounded-md shadow"
				>
					{post.title}
				</Link>
			))}
		</div>
	);
}
