import axios from 'axios';
import { headers } from 'next/headers';

export async function fetchWithToken(endpoint: string) {
  const headerStore = headers();
  const cookieHeader = (await headerStore).get('cookie')

  try {
    const res = await axios.get(endpoint, {
      baseURL: 'https://viso-task-back-end.onrender.com',
      headers: {
        Cookie: cookieHeader || '',
      },
    });

    return res.data;
  } catch (err: any) {
    const isAuthError = axios.isAxiosError(err) && err.response?.status === 401;

    if (isAuthError && cookieHeader?.includes('refresh_token')) {
      try {
        await axios.post('https://viso-task-back-end.onrender.com/auth/refresh', null, {
          headers: {
            Cookie: cookieHeader,
          },
          withCredentials: true,
        });

        const retryRes = await axios.get(endpoint, {
          baseURL: 'https://viso-task-back-end.onrender.com',
          headers: {
            Cookie: cookieHeader,
          },
        });

        return retryRes.data;
      } catch (refreshErr) {
        console.error('SSR Refresh failed:', refreshErr);
        throw refreshErr;
      }
    }

    throw err;
  }
}
