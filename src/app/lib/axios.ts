import axios from 'axios';

const API = axios.create({
	baseURL: 'https://viso-task-back-end.onrender.com', 
	// baseURL: 'http://localhost:3001', 
	withCredentials: true,         
	headers: {
		'Content-Type': 'application/json',
	},
});

let isRefreshing = false;

API.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if(isRefreshing) return Promise.reject(error);

			originalRequest._retry = true;
			isRefreshing = true;

			try {
			const refreshRes = await API.post('/auth/refresh');
			const newToken = refreshRes.data.accessToken;

			API.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
			originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

			return API(originalRequest);
			} catch (refreshErr) {
				isRefreshing = false;
			console.error('Refresh failed:', refreshErr);
			return Promise.reject(refreshErr);
			}
		}

		return Promise.reject(error);
	}
);

export default API;