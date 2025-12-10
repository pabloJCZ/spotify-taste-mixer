export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center max-w-xl px-4">
        <h1 className="text-4xl font-bold mb-3">
          Spotify Taste Mixer
        </h1>
        <p className="text-gray-400 mb-6">
          Proyecto de práctica de programación web con la API de Spotify.
        </p>
        <button
          className="px-5 py-3 rounded-full bg-green-500 text-black font-semibold opacity-60 cursor-not-allowed"
        >
          Conectar con Spotify (pendiente)
        </button>
      </div>
    </main>
  );
}
