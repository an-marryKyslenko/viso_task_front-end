'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useUser } from '@/app/user-provider';
import { useRouter } from 'next/navigation';
import API from '@/app/lib/axios';

type LoginData = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>();
	const [message, setMessage] = useState('');
	const {setUser} = useUser();
	const router = useRouter();

	const onSubmit = async (data: LoginData) => {
		try {
			const {data: { user}} = await API.post('/auth/login', data);
			setMessage('Login successful!');
			setUser(user);

			router.push('/recipes');
		} catch (err: any) {
			setMessage(err.response?.data?.message || 'Login failed');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div>
				<input
					type="email"
					{...register('email', { required: true })}
					className="w-full border px-3 py-2 rounded-md"
					placeholder="Email"
				/>
				{errors.email && <p className="text-red-500 text-sm">Email is required</p>}
			</div>

			<div>
				<input
					type="password"
					{...register('password', { required: true })}
					className="w-full border px-3 py-2 rounded-md"
					placeholder="Password"
				/>
				{errors.password && <p className="text-red-500 text-sm">Password is required</p>}
			</div>

			<button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
			>
				Log In
			</button>
			
			<a
				href="/auth/register"
				className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200 mb-2 block text-sm"
			>
				New here? Create an account to get started!
			</a>

			{message && <p className="text-center text-sm mt-2">{message}</p>}
		</form>
	);
}
