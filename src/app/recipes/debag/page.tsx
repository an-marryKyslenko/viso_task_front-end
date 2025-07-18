'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AuthDebug() {
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    axios.get('https://viso-task-back-end.onrender.com/auth/debug-cookies', {
      withCredentials: true,
    })
      .then(res => setResult(res.data))
      .catch(err => setResult(err.response?.data ?? 'Error'));
  }, []);

  return (
    <pre>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}
