'use client';

import { useState } from 'react';
import type { SpotifyArtist } from '@/lib/spotify';
import { searchArtists } from '@/lib/spotify';

type ArtistWidgetProps = {
  selectedItems: SpotifyArtist[];
  onSelect: (artists: SpotifyArtist[]) => void;
};

export default function ArtistWidget({ selectedItems, onSelect }: ArtistWidgetProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyArtist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const artists = await searchArtists(query);
      setResults(artists);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Error al buscar artistas');
    } finally {
      setLoading(false);
    }
  };

  const toggleArtist = (artist: SpotifyArtist) => {
    const exists = selectedItems.some(a => a.id === artist.id);
    if (exists) {
      onSelect(selectedItems.filter(a => a.id !== artist.id));
    } else {
      onSelect([...selectedItems, artist]);
    }
  };

  const isSelected = (artist: SpotifyArtist) =>
    selectedItems.some(a => a.id === artist.id);

  return (
    <section className="bg-neutral-900 rounded-xl p-4 flex flex-col h-full">
      <h3 className="font-semibold mb-3">Artistas favoritos</h3>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Busca un artista (Feid, Bad Bunny...)"
          className="flex-1 px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm outline-none focus:border-green-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-3 py-2 text-sm rounded-lg bg-green-500 text-black font-semibold hover:bg-green-400 disabled:opacity-60"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {error && <p className="text-xs text-red-400 mb-2">{error}</p>}

      {selectedItems.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-400 mb-1">Seleccionados:</p>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map(artist => (
              <button
                key={artist.id}
                onClick={() => toggleArtist(artist)}
                className="px-2 py-1 rounded-full text-xs bg-green-500 text-black hover:bg-green-400"
              >
                {artist.name} ×
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto max-h-48 overflow-y-auto border-t border-neutral-800 pt-2">
        {results.map(artist => (
          <button
            key={artist.id}
            onClick={() => toggleArtist(artist)}
            className={`w-full flex items-center gap-2 px-2 py-1 rounded-lg text-sm text-left hover:bg-neutral-800 ${
              isSelected(artist) ? 'bg-green-600/70 text-black' : ''
            }`}
          >
            <span>{artist.name}</span>
          </button>
        ))}
        {!loading && results.length === 0 && (
          <p className="text-xs text-gray-500">
            Escribe un nombre y pulsa buscar para ver resultados.
          </p>
        )}
      </div>
    </section>
  );
}
