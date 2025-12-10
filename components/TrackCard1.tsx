'use client';

import type { SpotifyTrack } from '@/lib/spotify';

type TrackCardProps = {
  track: SpotifyTrack;
};

export default function TrackCard({ track }: TrackCardProps) {
  const image = track.album.images?.[0]?.url;
  const artists = track.artists.map(a => a.name).join(', ');

  return (
    <article className="flex gap-3 p-2 rounded-lg hover:bg-neutral-900 transition">
      {image && (
        <img
          src={image}
          alt={track.name}
          className="w-12 h-12 rounded object-cover flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold truncate">{track.name}</h4>
        <p className="text-xs text-gray-400 truncate">{artists}</p>
        <p className="text-xs text-gray-500 mt-1">
          Popularidad: {track.popularity}
        </p>
      </div>
    </article>
  );
}
