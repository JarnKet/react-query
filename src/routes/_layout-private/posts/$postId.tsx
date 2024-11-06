import React from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
	queryOptions,
	useSuspenseQuery,
	useQueryErrorResetBoundary,
} from "@tanstack/react-query";

// Services
import { getPost } from "@/api/posts";

// UI
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const postQueryOptions = (postId: string) => {
	return queryOptions({
		queryKey: ["post", postId],
		queryFn: () => getPost(postId),
	});
};

export const Route = createFileRoute("/_layout-private/posts/$postId")({
	loader: ({ context: { queryClient }, params: { postId } }) =>
		queryClient.ensureQueryData(postQueryOptions(postId)),
	pendingComponent: () => <Skeleton className="h-4 w-[250px]" />,
	component: () => {
		const { postId } = Route.useParams();
		const { data } = useSuspenseQuery(postQueryOptions(postId));

		if (data) {
			console.log("Post", data);
		}

		return (
			<article className="space-y-4 ">
				<h1 className="text-xl font-bold">{data?.title}</h1>
				<p>{data?.body}</p>
			</article>
		);
	},
	errorComponent: ({ error, reset }) => {
		const router = useRouter();
		const queryErrorResetBoundary = useQueryErrorResetBoundary();

		React.useEffect(() => {
			// Reset the query error boundary
			queryErrorResetBoundary.reset();
		}, [queryErrorResetBoundary]);

		return (
			<div>
				{error.message}
				<Button
					onClick={() => {
						// Invalidate the route to reload the loader, and reset any router error boundaries
						router.invalidate();
					}}
				>
					retry
				</Button>
			</div>
		);
	},
});
