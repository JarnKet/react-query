import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

// UI
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type SearchParams = {
	query: string;
	limit: number;
};

export const Route = createFileRoute("/search")({
	component: SearchComponent,
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		return {
			query: search.query as string,
			limit: Number(search.limit) || 10,
		};
	},
});

function SearchComponent() {
	const navigate = useNavigate({ from: Route.fullPath });
	const { query, limit } = Route.useSearch();

	const [searchParams, setSearchParams] = useState({
		query,
		limit,
	});

	// Effect
	useEffect(() => {
		navigate({ search: { ...searchParams } });
	}, [searchParams, navigate]);

	const handleSearchParamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSearchParams((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div>
			Search {query} {limit}
			<div className="grid gap-2">
				<Label htmlFor="email">Query</Label>
				<Input
					id="query"
					name="query"
					type="text"
					placeholder="m@example.com"
					required
					value={searchParams.query}
					onChange={handleSearchParamsChange}
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="email">Limit</Label>
				<Input
					id="limit"
					name="limit"
					type="number"
					required
					value={searchParams.limit}
					onChange={handleSearchParamsChange}
				/>
			</div>
		</div>
	);
}
