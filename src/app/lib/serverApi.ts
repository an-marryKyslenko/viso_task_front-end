import axios from "axios";
import { cookies } from 'next/headers';

export async function fetchWithToken(endpoint: string) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('access_token')?.value;
	const refreshToken = cookieStore.get('refresh_token')?.value;

	try {
		const res = await axios.get(endpoint, {
			baseURL: 'https://viso-task-back-end.onrender.com',
			headers: {
			Authorization: `Bearer ${accessToken}`,
			},
		});

		return res.data;
	} catch (err: any) {
		if (axios.isAxiosError(err) && err.response?.status === 401 && refreshToken) {
			const refreshRes = await axios.post('https://viso-task-back-end.onrender.com/auth/refresh', null, {
			headers: {
				Cookie: `refresh_token=${refreshToken}`,
			},
			});

			const newAccessToken = refreshRes.data.accessToken;

			const retryRes = await axios.get(endpoint, {
			baseURL: 'https://viso-task-back-end.onrender.com',
			headers: {
				Authorization: `Bearer ${newAccessToken}`,
			},
			});

			return retryRes.data;
		}

		throw err;
	}
}
