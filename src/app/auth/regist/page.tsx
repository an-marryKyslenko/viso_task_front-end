'use client';
import RegisterForm from '@/app/components/forms/RegisterForm'

const page = () => {
	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-black/50 rounded-lg">
			<h2 className="text-2xl font-bold mb-4 text-center">Sing up</h2>

			<RegisterForm/>
		</div>
	)
}

export default page