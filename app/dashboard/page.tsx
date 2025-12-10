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
import type { SpotifyArtist, SpotifyTrack } from '@/lib/spotify';
import { generatePlaylist } from '@/lib/spotify';

export default function DashboardPage() {
  const router = useRouter();

  const [artists, setArtists] = useState<SpotifyArtist[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [decades, setDecades] = useState<number[]>([]);
  const [moods, setMoods] = useState<string[]>([]);
  const [popularity, setPopularity] = useState<[number, number]>([30, 80]);

  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setTracks([]);

    try {
      const prefs = {
        artists,
        genres,
        decades,
        moods,
        popularity,
      };

      const result = await generatePlaylist(prefs);
      setTracks(result);

      if (!result || result.length === 0) {
        setError(
          'No se han encontrado canciones con estos criterios. Prueba a relajar un poco los filtros.'
        );
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Error al generar la playlist.');
    } finally {
      setLoading(false);
    }
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

        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="px-5 py-3 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 disabled:opacity-60"
          >
            {loading ? 'Generando playlist...' : 'Generar playlist'}
          </button>
          {error && <span className="text-sm text-red-400">{error}</span>}
        </div>

        {/* De momento, sin UI bonita: solo un contador rápido */}
        {tracks.length > 0 && !error && (
          <p className="mt-4 text-sm text-gray-300">
            Playlist generada con {tracks.length} canciones (vista detallada en el siguiente commit).
          </p>
        )}
      </section>
    </main>
  );
}
