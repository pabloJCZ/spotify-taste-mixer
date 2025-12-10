'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { clearTokens, isAuthenticated } from '@/lib/auth';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isAuthenticated()) {
      router.replace('/');
    }
  }, [router]);

  const handleLogout = () => {
    clearTokens();
    router.replace('/');
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header showLogout onLogout={handleLogout} />
      <section className="flex-1 px-4 py-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Dashboard de preferencias</h2>
        <p className="text-gray-400">
          Aquí configuraremos tus artistas, géneros y décadas favoritas para generar una playlist.
        </p>
      </section>
    </main>
  );
}
