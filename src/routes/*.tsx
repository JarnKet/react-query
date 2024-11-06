import { createFileRoute, useNavigate } from "@tanstack/react-router";

// UI
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/*")({
	component: NotFoundComponent,
});

function NotFoundComponent() {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<h1>Not Found</h1>
			<Button onClick={() => navigate({ to: "/" })}>Go back to Home</Button>
		</div>
	);
}
