'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/user-provider';
import { RecipeFormValues } from '@/app/types';
import API from '@/app/lib/axios';
import { IoMdClose } from "react-icons/io"; 
import { useState } from 'react';
import Notification from '../ui/Notification';
import { AxiosError } from 'axios';

type Props = {
	mode: "create" | "edit";
	handleClose?: () => void;
	defaultValues?: Partial<RecipeFormValues>;
	recipeId?: string;
}

const initialsValue = {
	ingredients: [{ name: '' }],

}

export default function RecipeForm({mode = 'create', handleClose = () => {}, defaultValues = initialsValue, recipeId}: Props) {
	const { register, control, handleSubmit } = useForm<RecipeFormValues>({
		defaultValues
	});
	const {user} = useUser();
	const [isError, setIsError] = useState(false);
	const [message, setMessage] = useState('');

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'ingredients',
	});

	const router = useRouter();

	const onSubmit = async (data: RecipeFormValues) => {
		try {
			if(mode === 'create') {
				await API.post('/recipes', {
					...data,
					userId: user?.id,
				});
				setMessage('Recipe was created successfully!')
				router.push('/recipes/my-recipes');
			} else {
				await API.put(`/recipes/${recipeId}`, {
					...data,
					userId: user?.id,
				});
				handleClose()
				router.push(`/recipes/${recipeId}`);
				setMessage('Recipe was updated successfully!')
	
			}
		} catch (err: unknown) {
			const axiosErr = err as AxiosError<{ message: string }>;

			setMessage(axiosErr.response?.data.message || 'Error submitting recipe:');
			setIsError(true)
		} finally{
			setTimeout(() => {
				setMessage('');
				setIsError(false)
			}, 3000)
		}
	};

	return (
		<>
		<form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 space-y-4">
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
						<IoMdClose/>
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
		{message && <Notification message={message} error={isError}/>}
		</>
	);
}
