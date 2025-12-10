import Header from '@/components/Header';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <section className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-3">
            Spotify Taste Mixer
          </h1>
          <p className="text-gray-400 mb-6">
            Generador de playlists personalizadas a partir de tus gustos en Spotify.
          </p>
          <button
            className="px-5 py-3 rounded-full bg-green-500 text-black font-semibold opacity-60 cursor-not-allowed"
          >
            Conectar con Spotify (pendiente)
          </button>
        </div>
      </section>
    </main>
  );
}
