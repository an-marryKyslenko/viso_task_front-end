import CommentsList from '@/app/components/ui/CommentsList';
import DeleteControl from '@/app/components/ui/DeleteControl';
import EditControls from '@/app/components/ui/EditControls';
import { fetchWithToken } from '@/app/lib/serverApi';
import { Recipe } from '@/app/types';

export default async function RecipePage({params}: {params: {recipe_id: string}}) {
	const { recipe_id } = await params as {recipe_id: string};

	const recipe: Recipe = await fetchWithToken(`/recipes/${recipe_id}`);

	if(!recipe) {
		return <div>Not recipe</div>
	}

	return (
		<div className="max-w-4xl mx-auto flex flex-col gap- w-full"> 
			<section className='bg-white/70 rounded-lg p-4 md:p-10 relative'>
				<h1 className="text-3xl font-bold text-gray-800 mb-2">{recipe.title}</h1>

				<EditControls {...recipe}/>
				<p className="text-gray-600 mb-4">{recipe.description}</p>
				<div className="text-sm text-gray-700 mb-6">Time: {recipe.time}</div>
				<h2 className="text-xl font-semibold mb-2">Ingrediens:</h2>
				<ul className="list-disc list-inside mb-6 text-gray-700">
					{recipe.ingredients.map((ingredient, i) => (
					<li key={i}>{ingredient.name}</li>
					))}
				</ul>

				<h2 className="text-xl font-semibold mb-2">Instruction:</h2>
				<p className="whitespace-pre-line bg-gray-50 p-4 rounded text-gray-700 border">{recipe.instructions}</p>

				<div className="mt-6 text-sm text-right text-gray-500">
					Author: <code>{recipe.userId}</code>
				</div>

				<DeleteControl recipeId={recipe.id}/>
			</section>

			<section className='bg-white/70 rounded-lg p-4 md:p-10 '>
				<h2 className="text-2xl font-bold mb-4 text-gray-800">Komments:</h2>

				<CommentsList recipeId={recipe.id} userId={recipe.userId}/>
			</section>
		</div>
	);
};