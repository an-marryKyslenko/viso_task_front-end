import RecipeCard from "../components/ui/RecipeCard";
import Title from "../components/ui/Title";
import { Recipe } from "../types";
import { fetchWithToken } from "../lib/serverApi";

export default async function RecipesPage() {
	const recipes = await fetchWithToken('/recipes') as Recipe[];

	return (
		<>
			<Title>Explore all recipes</Title>
			<p className="text-lg mb-6 max-w-xl">
				Browse delicious meals and discover culinary inspiration!
			</p>
			<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{recipes.length === 0  
				? (
					<p>There are no recipes yet</p>
				)
				:	recipes.map((r) => (
						<RecipeCard key={r.id} {...r} />
					))
				}
			</div>
		</div>
		</>
	);
}

