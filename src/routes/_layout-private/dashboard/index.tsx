import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout-private/dashboard/")({
	component: DashboardComponent,
});

function DashboardComponent() {
	return <div>Dashboard</div>;
}
