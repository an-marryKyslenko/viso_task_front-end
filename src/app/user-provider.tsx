'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from './types';
import API from './lib/axios';

interface DecodedUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	iat?: number;
	exp?: number;
}

type UserContextType = {
	user: User | null;
	setUser: (user: User | null) => void;
	logout: () => void;
};

const UserContext = createContext<UserContextType>({
	user: null,
	setUser: () => {},
	logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('user') || '{}');

		if(data) {
			setUser(data)
		}
	}, [])

	const logout = async() => {
		await API.post('/auth/logout');
		setUser(null);
		localStorage.removeItem('token');
	}
	return (
		<UserContext.Provider value={{ 
			user, 
			setUser,
			logout
		}}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
