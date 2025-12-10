'use client';

type MoodWidgetProps = {
  selectedItems: string[];
  onSelect: (moods: string[]) => void;
};

const MOODS = [
  { id: 'chill', label: 'Chill' },
  { id: 'focus', label: 'Focus' },
  { id: 'party', label: 'Fiesta' },
  { id: 'workout', label: 'Workout' },
];

export default function MoodWidget({ selectedItems, onSelect }: MoodWidgetProps) {
  const toggleMood = (id: string) => {
    const exists = selectedItems.includes(id);
    if (exists) {
      onSelect(selectedItems.filter(m => m !== id));
    } else {
      onSelect([...selectedItems, id]);
    }
  };

  return (
    <section className="bg-neutral-900 rounded-xl p-4 flex flex-col h-full">
      <h3 className="font-semibold mb-3">Mood / Energía</h3>
      <p className="text-sm text-gray-400 mb-3">
        Elige uno o varios moods para orientar el tipo de canciones.
      </p>
      <div className="flex flex-wrap gap-2">
        {MOODS.map(mood => {
          const active = selectedItems.includes(mood.id);
          return (
            <button
              key={mood.id}
              onClick={() => toggleMood(mood.id)}
              className={`px-3 py-1 rounded-full text-xs border ${
                active
                  ? 'bg-green-500 text-black border-green-400'
                  : 'border-neutral-700 text-gray-200 hover:bg-neutral-800'
              }`}
            >
              {mood.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
