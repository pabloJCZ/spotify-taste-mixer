'use client';

import { useRouter } from 'next/navigation';

type HeaderProps = {
  showLogout?: boolean;
  onLogout?: () => void;
};

export default function Header({ showLogout, onLogout }: HeaderProps) {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push('/');
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
  };

  return (
    <header className="w-full border-b border-neutral-800 bg-black/70 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <button
          onClick={handleTitleClick}
          className="flex items-center gap-2 text-lg font-semibold hover:text-green-400 transition"
        >
          <span role="img" aria-label="music">
            🎵
          </span>
          <span>Spotify Taste Mixer</span>
        </button>

        {showLogout && (
          <button
            onClick={handleLogoutClick}
            className="px-3 py-1 rounded-full border border-neutral-600 text-sm hover:bg-neutral-800"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </header>
  );
}
