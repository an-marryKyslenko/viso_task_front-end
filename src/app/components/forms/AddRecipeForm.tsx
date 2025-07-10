'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import API from '@/app/lib/axios';
import { useUser } from '@/app/user-provider';

type RecipeFormValues = {
	title: string;
	description: string;
	time: string;
	ingredients: { name: string }[];
	instructions: string;
};

export default function AddRecipeForm() {
	const { register, control, handleSubmit } = useForm<RecipeFormValues>({
		defaultValues: {
			ingredients: [{ name: '' }],
		},
	});
	const {user} = useUser();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'ingredients',
	});

	const router = useRouter();

	const onSubmit = async (data: RecipeFormValues) => {
		try {
			await API.post('/recipes', {
				...data,
				userId: user?.id
			});
			router.push('/my-recipes');
		} catch (error) {
			console.error('Error submitting recipe:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 space-y-4 bg-white/20 rounded shadow-md">
			<input
			type="text"
			{...register('title', { required: true })}
			placeholder="Recipe title"
			className="w-full px-4 py-2 border rounded"
			/>

			<textarea
			{...register('description')}
			placeholder="Short description"
			rows={3}
			className="w-full px-4 py-2 border rounded"
			/>

			<input
			type="text"
			{...register('time')}
			placeholder="Cooking time (e.g., 30 minutes)"
			className="w-full px-4 py-2 border rounded"
			/>

			<div className="space-y-2">
			<label className="block font-semibold">Ingredients:</label>
			{fields.map((field, index) => (
				<div key={field.id} className="flex gap-2">
					<input
					{...register(`ingredients.${index}.name`, { required: true })}
					placeholder={`Ingredient ${index + 1}`}
					className="flex-1 px-3 py-2 border rounded"
					/>
					<button type="button" onClick={() => remove(index)} className="text-red-600 font-bold">
					✖
					</button>
				</div>
			))}
			<button
				type="button"
				onClick={() => append({ name: '' })}
				className="text-sm text-blue-600 hover:underline"
			>
				+ Add ingredient
			</button>
			</div>

			<textarea
			{...register('instructions', { required: true })}
			placeholder="Cooking instructions"
			rows={5}
			className="w-full px-4 py-2 border rounded"
			/>

			<button
			type="submit"
			className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
			>
			Submit Recipe
			</button>
		</form>
	);
}
