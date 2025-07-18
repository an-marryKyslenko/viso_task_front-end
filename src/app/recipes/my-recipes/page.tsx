'use client'

import RecipeCard from '@/app/components/ui/RecipeCard';
import Title from '@/app/components/ui/Title'
import API from '@/app/lib/axios';
import { Recipe } from '@/app/types';
import React, { useEffect, useState } from 'react'

const MyRecipies = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	
	useEffect(() => {
		async function getRecipes() {
			try {
				const res = await API.get('/recipes/my');
				setRecipes(res.data)
			} catch (error) {
				console.error('Failed to fetch my recipes:', error);
			}
		}
		getRecipes()
	}, [])
	return (
		<>
			<Title>My recipes</Title>
			<p className="text-lg mb-6 max-w-xl">
				Browse delicious meals and discover culinary inspiration!
			</p>
			<div className="container mx-auto px-4 py-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
			{recipes.length === 0 ? (
				<p className='text-lg mb-6 max-w-xl'>Not recipes yet</p>
			) : recipes.map((r, i) => (
					<RecipeCard key={i} {...r} />
				))}
			</div>
		</div>
		</>
	);
}

export default MyRecipies