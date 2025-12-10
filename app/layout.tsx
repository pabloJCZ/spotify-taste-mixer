export const metadata = {
  title: 'Spotify Taste Mixer',
  description: 'Generador de playlists personalizadas con Spotify',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
