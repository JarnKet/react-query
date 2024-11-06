import { useState } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

// Helpers
import { setLocalStorage } from "@/helpers/accessLocalStorage";

// UI
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createLazyFileRoute("/login")({
	component: LoginComponent,
});

function LoginComponent() {
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const [formData, setFormData] = useState({ email: "", password: "" });

	const handleFormValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Function Login
	const login = () => {
		console.log(formData, "form data");

		setLocalStorage("user-data", JSON.stringify(formData));

		navigate({ to: "/dashboard" });
	};

	return (
		<main className="flex items-center justify-center min-h-screen">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							required
							onChange={handleFormValueChange}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							required
							onChange={handleFormValueChange}
						/>
					</div>
					<div className="flex items-center space-x-2">
						<Checkbox
							id="showPassword"
							defaultChecked={showPassword}
							onCheckedChange={() => setShowPassword((prev) => !prev)}
						/>
						<label
							htmlFor="showPassword"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Show Password
						</label>
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full" onClick={login}>
						Sign in
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
