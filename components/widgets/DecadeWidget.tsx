'use client';

type DecadeWidgetProps = {
  selectedItems: number[];
  onSelect: (decades: number[]) => void;
};

const DECADES = [1980, 1990, 2000, 2010, 2020];

export default function DecadeWidget({ selectedItems, onSelect }: DecadeWidgetProps) {
  const toggleDecade = (decade: number) => {
    const exists = selectedItems.includes(decade);
    if (exists) {
      onSelect(selectedItems.filter(d => d !== decade));
    } else {
      onSelect([...selectedItems, decade]);
    }
  };

  return (
    <section className="bg-neutral-900 rounded-xl p-4 flex flex-col h-full">
      <h3 className="font-semibold mb-3">Décadas</h3>
      <p className="text-sm text-gray-400 mb-3">
        Indica de qué décadas quieres que salgan canciones.
      </p>
      <div className="flex flex-wrap gap-2">
        {DECADES.map(decade => {
          const active = selectedItems.includes(decade);
          return (
            <button
              key={decade}
              onClick={() => toggleDecade(decade)}
              className={`px-3 py-1 rounded-full text-xs border ${
                active
                  ? 'bg-green-500 text-black border-green-400'
                  : 'border-neutral-700 text-gray-200 hover:bg-neutral-800'
              }`}
            >
              {decade}s
            </button>
          );
        })}
      </div>
    </section>
  );
}
