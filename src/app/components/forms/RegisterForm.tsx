'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useUser } from '@/app/user-provider';
import { useRouter } from 'next/navigation';
import API from '@/app/lib/axios';
import Notification from '../ui/Notification';

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const {setUser} = useUser();
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data: FormData) => {
    try {
      const {data: {user}} = await API.post('/auth/register', data);
      setMessage('Resistration is success!');
      
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user)
      setTimeout(() => {
        router.push('/recipes');
      }, 3000)
    } catch (err: any) {
      setIsError(true)
      setMessage(err.response?.data?.message || 'Error');
    } finally{
      setTimeout(() => {
        setMessage('')
        setIsError(false)
      }, 3000)
    };
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('firstName', { required: true })}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="First Name"
        />
        {errors.firstName && <p className="text-red-500 text-sm">Put first name</p>}
      </div>

      <div>
        <input
          {...register('lastName', { required: true })}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Last name"
        />
        {errors.lastName && <p className="text-red-500 text-sm">Put last name</p>}
      </div>

      <div>
        <input
          type="email"
          {...register('email', { required: true })}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Email"
        />
        {errors.email && <p className="text-red-500 text-sm">Put email</p>}
      </div>

      <div>
        <input
          type="password"
          {...register('password', { required: true, minLength: 6 })}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Password"
        />
        {errors.password && <p className="text-red-500 text-sm">Min 6 char</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Sign up
      </button>

      <a
        href="/auth/login"
        className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200 mb-2 block text-sm"
      >
        Already have an account? Log in here
      </a>


      {message && <Notification message={message} error={isError}/>}
    </form>
  );
}
