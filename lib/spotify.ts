import { getStoredTokens } from './auth';

export type SpotifyImage = {
  url: string;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  images?: SpotifyImage[];
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
