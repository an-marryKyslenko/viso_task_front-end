'use client';
import LoginForm from '@/app/components/forms/LoginForm';

const page = () => {
	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-black/50 rounded-lg">
			<h2 className="text-2xl font-bold mb-4 text-center">Log in</h2>

			<LoginForm/>
		</div>
	)
}

export default page