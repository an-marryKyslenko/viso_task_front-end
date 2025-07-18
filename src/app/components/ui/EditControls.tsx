'use client';

import { Recipe } from '@/app/types';
import { useState } from 'react';
import Modal from '../layout/Modal';
import { MdEdit } from 'react-icons/md';
import RecipeForm from '../forms/RecipeForm';


export default function EditControls(props: Recipe) {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	}
	return (
		<div className="flex gap-2 justify-end absolute text-3xl top-4 md:top-10 right-4 md:right-10">
			<button onClick={() => setOpen(true)}>
				<MdEdit className='text-white hover:text-green-200'/>
			</button>

			{open && (
				<Modal onClose={handleClose}>
					<h2 className="text-xl font-bold mb-4">Edit recipe</h2>
					<RecipeForm handleClose={handleClose} mode="edit" defaultValues={props} recipeId={props.id}/>
				</Modal>
			)}
		</div>
	);
}
