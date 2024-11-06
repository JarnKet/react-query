import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout-private/account/")({
	component: () => <div>Hello /private/account/!</div>,
});
