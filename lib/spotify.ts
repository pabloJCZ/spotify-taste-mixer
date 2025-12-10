import { getStoredTokens } from './auth';

export type SpotifyImage = {
  url: string;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  images?: SpotifyImage[];
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: {
    images?: SpotifyImage[];
    release_date?: string;
  };
  popularity: number;
  uri: string;
};

function getAccessTokenOrThrow(): string {
  const tokens = getStoredTokens();
  if (!tokens?.accessToken) {
    throw new Error('No hay token de Spotify. Inicia sesión de nuevo.');
  }
  return tokens.accessToken;
}

export async function searchArtists(query: string): Promise<SpotifyArtist[]> {
  if (!query.trim()) return [];

  const accessToken = getAccessTokenOrThrow();

  const params = new URLSearchParams({
    q: query,
    type: 'artist',
    limit: '10',
  });

  const res = await fetch(`https://api.spotify.com/v1/search?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    throw new Error('Sesión expirada. Vuelve a conectar tu cuenta de Spotify.');
  }

  const data = await res.json();

  if (!res.ok) {
    console.error('Error buscando artistas:', data);
    throw new Error('No se han podido buscar artistas en Spotify.');
  }

  return (data.artists?.items as SpotifyArtist[]) ?? [];
}

// NUEVO: obtener top tracks del usuario
export async function getTopTracks(limit = 50): Promise<SpotifyTrack[]> {
  const accessToken = getAccessTokenOrThrow();

  const params = new URLSearchParams({
    limit: String(limit),
    time_range: 'medium_term',
  });

  const res = await fetch(`https://api.spotify.com/v1/me/top/tracks?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Error obteniendo top tracks:', data);
    throw new Error('No se han podido obtener tus canciones más escuchadas.');
  }

  return (data.items as SpotifyTrack[]) ?? [];
}

export type PlaylistPreferences = {
  artists: SpotifyArtist[];
  genres: string[];
  decades: number[];
  moods: string[];
  popularity: [number, number];
};

function getTrackYear(track: SpotifyTrack): number | null {
  const date = track.album.release_date;
  if (!date) return null;
  const yearStr = date.slice(0, 4);
  const year = Number(yearStr);
  return Number.isNaN(year) ? null : year;
}

export async function generatePlaylist(
  preferences: PlaylistPreferences
): Promise<SpotifyTrack[]> {
  const { artists, decades, popularity } = preferences;

  // 1. Partimos de las top tracks del usuario
  const allTracks = await getTopTracks(50);
  let filtered = [...allTracks];

  // 2. Filtrar por artistas seleccionados (si hay)
  if (artists.length > 0) {
    const selectedIds = new Set(artists.map(a => a.id));
    filtered = filtered.filter(track =>
      track.artists.some(a => selectedIds.has(a.id))
    );
  }

  // 3. Filtrar por décadas (si hay)
  if (decades.length > 0) {
    const selectedDecades = new Set(decades);
    filtered = filtered.filter(track => {
      const year = getTrackYear(track);
      if (!year) return false;
      const decadeStart = Math.floor(year / 10) * 10;
      return selectedDecades.has(decadeStart);
    });
  }

  // 4. Filtrar por popularidad
  const [minPop, maxPop] = popularity;
  filtered = filtered.filter(track =>
    track.popularity >= minPop && track.popularity <= maxPop
  );

  // 5. (Opcional) mezclar un poco y limitar tamaño
  filtered = filtered.slice(0, 30);

  return filtered;
}
