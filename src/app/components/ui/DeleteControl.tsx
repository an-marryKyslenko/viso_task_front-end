'use client';

import { useState } from "react";
import Modal from "../layout/Modal";
import { useRouter } from "next/navigation";
import API from "@/app/lib/axios";
import { useUser } from "@/app/user-provider";

type Props = {
	recipeId: string;
	userId: string;
}

const DeleteControl = ({recipeId, userId}: Props) => {
	const [open, setOpen] = useState(false);
	const route = useRouter();
	const { user } = useUser()
	
	if (user?.id !== userId) {
		return;
	}
	
	const handleDelete = async () => {
		try {
			await API.delete(`/recipes/${recipeId}`);
			route.push('/recipes/my-recipes')
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<button onClick={() => setOpen(true)} className='w-full transition-colors duration-300 p-2 border rounded-2xl border-red-500 text-red-600 hover:bg-red-600/40'>Delete recipe</button>
			{open && (
				<Modal onClose={() => setOpen(false)}>
					<div className="flex flex-wrap gap-4 max-w-md mx-auto">
						<h2 className="basis-full text-lg font-semibold">Are you shore?</h2>
						<button 
							onClick={handleDelete} 
							className="flex-1 basis-full md:basis-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
						>Delete</button>
						<button 
							onClick={() => setOpen(false)} 
							className="flex-1 basis-full md:basis-auto px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
						>Cansel</button>
					</div>
				</Modal>
			)}
		</>
	)
}

export default DeleteControl