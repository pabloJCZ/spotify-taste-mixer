'use client';

type PopularityWidgetProps = {
  selectedItems: [number, number];
  onSelect: (range: [number, number]) => void;
};

export default function PopularityWidget({ selectedItems, onSelect }: PopularityWidgetProps) {
  const [min, max] = selectedItems;

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, max - 1);
    onSelect([newMin, max]);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, min + 1);
    onSelect([min, newMax]);
  };

  return (
    <section className="bg-neutral-900 rounded-xl p-4 flex flex-col h-full">
      <h3 className="font-semibold mb-3">Popularidad</h3>
      <p className="text-sm text-gray-400 mb-4">
        Ajusta el rango de popularidad de las canciones (0 = muy underground, 100 = súper mainstream).
      </p>

      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
        <span>Mín: {min}</span>
        <span>Máx: {max}</span>
      </div>

      <div className="space-y-3">
        <input
          type="range"
          min={0}
          max={99}
          value={min}
          onChange={e => handleMinChange(Number(e.target.value))}
          className="w-full"
        />
        <input
          type="range"
          min={1}
          max={100}
          value={max}
          onChange={e => handleMaxChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    </section>
  );
}
