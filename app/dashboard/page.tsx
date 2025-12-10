'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { clearTokens, isAuthenticated } from '@/lib/auth';
import ArtistWidget from '@/components/widgets/ArtistWidget';
import GenreWidget from '@/components/widgets/GenreWidget';
import DecadeWidget from '@/components/widgets/DecadeWidget';
import MoodWidget from '@/components/widgets/MoodWidget';
import PopularityWidget from '@/components/widgets/PopularityWidget';
import type { SpotifyArtist } from '@/lib/spotify';

export default function DashboardPage() {
  const router = useRouter();

  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [decades, setDecades] = useState<number[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [popularity, setPopularity] = useState<[number, number]>([30, 80]);

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
        <p className="text-gray-400 mb-6">
          Configura tus gustos y genera una playlist personalizada con tus artistas, géneros y décadas favoritas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <ArtistWidget selectedItems={artists} onSelect={setArtists} />
          <GenreWidget selectedItems={genres} onSelect={setGenres} />
          <DecadeWidget selectedItems={decades} onSelect={setDecades} />
          <MoodWidget selectedItems={moods} onSelect={setMoods} />
          <PopularityWidget selectedItems={popularity} onSelect={setPopularity} />
        </div>
      </section>
    </main>
  );
}
