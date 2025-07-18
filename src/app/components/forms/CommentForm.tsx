'use client'

import { FormEvent, useState } from "react";

type Props = {
	addComment: (text: string) => Promise<void>
}

const CommentForm = ({addComment}: Props) => {
	const [text, setText] = useState('');
	
	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		await addComment(text);
		setText('');
	}
	return (
		<form onSubmit={onSubmit} className="mt-6 space-y-2">
			<textarea
				value={text}
				onChange={(e)=>setText(e.target.value)}
				placeholder="Comment ...."
				className="w-full border rounded p-3 text-sm resize-none"
			/>
			<button
			type="submit"
			className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
			>
			Send
			</button>
		</form>
	)
}

export default CommentForm