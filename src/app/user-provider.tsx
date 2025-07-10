'use client';

import { createContext, useContext, useState } from 'react';
import { User } from './types';

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

	const logout = () => {
		setUser(null);
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
