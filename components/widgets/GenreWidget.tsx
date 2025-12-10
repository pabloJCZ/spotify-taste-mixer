'use client';

type GenreWidgetProps = {
  selectedItems: string[];
  onSelect: (genres: string[]) => void;
};

const GENRES = [
  'pop',
  'rock',
  'reggaeton',
  'latin',
  'hip hop',
  'trap',
  'electronic',
  'indie',
  'r&b',
];

export default function GenreWidget({ selectedItems, onSelect }: GenreWidgetProps) {
  const toggleGenre = (genre: string) => {
    const exists = selectedItems.includes(genre);
    if (exists) {
      onSelect(selectedItems.filter(g => g !== genre));
    } else {
      onSelect([...selectedItems, genre]);
    }
  };

  return (
    <section className="bg-neutral-900 rounded-xl p-4 flex flex-col h-full">
      <h3 className="font-semibold mb-3">Géneros</h3>
      <p className="text-sm text-gray-400 mb-3">
        Selecciona los géneros que quieres que predominen en la playlist.
      </p>
      <div className="flex flex-wrap gap-2">
        {GENRES.map(genre => {
          const active = selectedItems.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              className={`px-3 py-1 rounded-full text-xs border ${
                active
                  ? 'bg-green-500 text-black border-green-400'
                  : 'border-neutral-700 text-gray-200 hover:bg-neutral-800'
              }`}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </section>
  );
}
