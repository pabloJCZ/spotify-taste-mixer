'use client';

type ArtistWidgetProps = {
  
};

export default function ArtistWidget(_props: ArtistWidgetProps) {
  return (
    <section className="bg-neutral-900 rounded-xl p-4">
      <h3 className="font-semibold mb-2">Artistas favoritos</h3>
      <p className="text-sm text-gray-400">
        Aquí podrás buscar y seleccionar tus artistas favoritos de Spotify.
      </p>
    </section>
  );
}
