import { createLazyFileRoute, Link } from "@tanstack/react-router";

// UI
import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-8">
			Home
			<Link to="/login">
				<Button>Login</Button>
			</Link>
			<Link to="/contactus">Contact Us</Link>
		</div>
	);
}
