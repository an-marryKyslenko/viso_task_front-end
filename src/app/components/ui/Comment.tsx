'use client'
import { CommentType } from "@/app/types"

type Props = {
	comment: CommentType;
	onDelete: () => void
}

const Comment = ({comment, onDelete}: Props) => {
	
	return (
		<li key={comment.id} className="bg-white p-4 rounded shadow border">
			<p className="text-gray-700">{comment.text}</p>
			<button className="border border-black-700 px-3 text-black" onClick={onDelete}>Delete</button>
			<div className="mt-2 text-sm text-gray-500 text-right">{comment.userId}</div>
		</li>
	)
}

export default Comment