'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { saveTokens } from '@/lib/auth';

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Error en la autenticación de Spotify.');
      return;
    }

    if (!code) {
      setError('Falta el código de autorización.');
      return;
    }

    const exchange = async () => {
      try {
        const res = await fetch('/api/spotify-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Error en el intercambio de token');
        }

        saveTokens(data.access_token, data.refresh_token, data.expires_in);
        router.replace('/dashboard');
      } catch (e: any) {
        console.error(e);
        setError(e.message || 'Error procesando la autenticación.');
      }
    };

    exchange();
  }, [searchParams, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Conectando con Spotify...
        </h1>
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <p className="text-gray-400">
            Espera un momento mientras procesamos tu sesión.
          </p>
        )}
      </div>
    </main>
  );
}
