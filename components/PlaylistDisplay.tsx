'use client';

import type { SpotifyTrack } from '@/lib/spotify';
import TrackCard from './TrackCard1';

type PlaylistDisplayProps = {
  tracks: SpotifyTrack[];
  hasGenerated: boolean;
};

export default function PlaylistDisplay({ tracks, hasGenerated }: PlaylistDisplayProps) {
  if (!hasGenerated && tracks.length === 0) {
    return null;
  }

  return (
    <section className="mt-8 bg-neutral-950 border border-neutral-800 rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-2">Playlist generada</h3>
      {tracks.length === 0 ? (
        <p className="text-sm text-gray-400">
          No se han encontrado canciones con los filtros seleccionados.
        </p>
      ) : (
        <>
          <p className="text-xs text-gray-500 mb-3">
            Mostrando {tracks.length} canciones basadas en tus preferencias.
          </p>
          <div className="max-h-96 overflow-y-auto space-y-1">
            {tracks.map(track => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
