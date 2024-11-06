import {
	createFileRoute,
	Outlet,
	Link,
	useNavigate,
	redirect,
} from "@tanstack/react-router";

// Helpers

// UI
import AlertModal from "@/components/general/AlertModal";
import { Button } from "@/components/ui/button";

// Icons
import { LogOut } from "lucide-react";
import {
	accessLocalStorage,
	clearLocalStorage,
} from "@/helpers/accessLocalStorage";

export const Route = createFileRoute("/_layout-private")({
	beforeLoad: async ({ location }) => {
		const isAuthenticated = accessLocalStorage("user-data");

		if (!isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: SideBar,
});

function SideBar() {
	const navigate = useNavigate();

	// Function
	const handleLogout = () => {
		clearLocalStorage();

		navigate({
			to: "/",
		});
	};

	return (
		<div className="flex flex-row h-screen overflow-y-auto">
			<aside className="w-64 px-8 py-4 border-r bg-background">
				Side Bar
				<nav>
					<ul>
						<li>
							<Link to="/dashboard" className="[&.active]:font-bold">
								Dashboard
							</Link>
						</li>
						<li>
							<Link to="/account" className="[&.active]:font-bold">
								Account
							</Link>
						</li>
						<li>
							<Link
								to="/posts"
								className="[&.active]:font-bold"
								search={{
									skip: 0,
									limit: 10,
								}}
							>
								Post
							</Link>
						</li>
					</ul>
				</nav>
			</aside>
			<div className="relative w-full h-screen overflow-y-auto">
				<header className="sticky top-0 z-10 flex items-center justify-between w-full px-8 py-4 border-b bg-background">
					<h1>Header</h1>
					<AlertModal
						title="Are you sure for logout?"
						triggerComponent={
							<Button variant={"outline"}>
								<LogOut size={20} />
							</Button>
						}
						confirmFunction={handleLogout}
					/>
				</header>
				<main className="p-8 overflow-y-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
