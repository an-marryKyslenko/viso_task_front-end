'use client'

import { useEffect, useState } from "react"
import CommentForm from "../forms/CommentForm"
import { CommentType } from "@/app/types"
import API from "@/app/lib/axios"
import Comment from "./Comment"
import Notification from "./Notification"
import { AxiosError } from "axios"

type Props = {
	recipeId: string,
	userId: string
}
const CommentsList = ({recipeId, userId}: Props) => {
	const [comments, setComments] = useState<CommentType[]>([]);
	const [isError, setIsError] = useState(false);
	const [message, setMessage] = useState('');

	const fetchComments = async () => {
		try {
			const {data} = await API.get('/comments');
			setComments(data);
		} catch (err) {
			const axiosErr = err as AxiosError<{ message: string }>;
			
			setMessage(axiosErr.response?.data.message || 'Cannot fetch comments');
			setIsError(true);
		} finally{
			setTimeout(() => {
				setMessage('');
				setIsError(false)
			}, 3000)
		}
	}

	useEffect(() => {
		fetchComments()
	}, [])

	const addComment = async (text: string) => {
		try {
			await API.post('/comments', {
				text,
				userId,
				recipeId
			})
			setMessage('Comment was added successfully!')
			await fetchComments();
		} catch (err) {
			const axiosErr = err as AxiosError<{ message: string }>;
			setMessage(axiosErr.response?.data.message || 'Cannot add comment');
			setIsError(true);
		} finally{
			setTimeout(() => {
				setMessage('');
				setIsError(false)
			}, 3000)
		}
	}

	const handleDelete = async (id: string) => {
		try {
			await API.delete(`/comments/${id}`)
			await fetchComments();
			setMessage('Comment was deleted successfully')
		} catch (err) {
			const axiosErr = err as AxiosError<{ message: string }>;

			setMessage(axiosErr.response?.data.message || 'Cannot delete comment');
			setIsError(true)
		} finally{
			setTimeout(() => {
				setMessage('');
				setIsError(false)
			}, 3000)
		}
	}

	return (
		<>
			{comments.length === 0 ? (
				<p className="text-gray-500">No comments yet.</p>
			) : (
				<ul className="space-y-4">
					{comments.map(comment => (
						<Comment 
							comment={comment} 
							key={comment.id} 
							onDelete={() => handleDelete(comment.id)}
						/>
					))}
				</ul>
			)}

			<CommentForm addComment={addComment}/>
			{message && <Notification message={message} error={isError}/>}
		</>
	)
}

export default CommentsList