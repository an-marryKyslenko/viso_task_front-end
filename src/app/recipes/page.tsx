'use client'

import { useEffect, useState } from "react";
import RecipeCard from "../components/ui/RecipeCard";
import Title from "../components/ui/Title";
import API from "../lib/axios";

export default function RecipesPage() {
	const [recipes, setRecipes] = useState([]);

	useEffect(() => {
		async function getRecipes() {
			try {
				const res = await API.get('/recipes');
				setRecipes(res.data)
			} catch (error) {
				console.error('Failed to fetch my recipes:', error);
			}
			}
			getRecipes()
		}, [])
	return (
		<>
			<Title>Explore all recipes</Title>
			<p className="text-lg mb-6 max-w-xl">
				Browse delicious meals and discover culinary inspiration!
			</p>
			<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
			{recipes.map((r, i) => (
				<RecipeCard key={i} {...r} />
			))}
			</div>
		</div>
		</>
	);
}

