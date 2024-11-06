import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	ScrollRestoration,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => (
		<>
			{/* <div className="flex gap-2 p-2">
				<Link to="/" className="[&.active]:font-bold">
					Home
				</Link>{" "}
				<Link to="/about" className="[&.active]:font-bold">
					About
				</Link>
				<Link
					to="/account"
					// params={{ test: "test" }}
					search={{ test: "test" }}
					className="[&.active]:font-bold"
				>
					Test Params
				</Link>
			</div> */}
			<Outlet />
			<ScrollRestoration />
			<TanStackRouterDevtools />
		</>
	),
});
