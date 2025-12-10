const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';

const SCOPES = [
  'user-read-email',
  'user-top-read',
].join(' ');

const STORAGE_KEY = 'spotify_tokens_v1';

type StoredTokens = {
  accessToken: string;
  refreshToken: string | null;
  expiresAt: number | null;
};

export function getSpotifyAuthUrl() {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.warn('Faltan variables de entorno de Spotify');
    return '#';
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SCOPES,
  });

  return `${SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
}

export function saveTokens(accessToken: string, refreshToken?: string, expiresIn?: number) {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const expiresAt = expiresIn ? now + expiresIn * 1000 : null;

  const data: StoredTokens = {
    accessToken,
    refreshToken: refreshToken ?? null,
    expiresAt,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getStoredTokens(): StoredTokens | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredTokens;
  } catch {
    return null;
  }
}

export function clearTokens() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated() {
  const tokens = getStoredTokens();
  if (!tokens?.accessToken) return false;
  if (!tokens.expiresAt) return true;
  return Date.now() < tokens.expiresAt;
}
