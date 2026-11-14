import React from 'react';

interface ColorPickerInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

const PRESET_COLORS = [
  'transparent',
  '#ffffff',
  '#f4f4f5',
  '#a1a1aa',
  '#71717a',
  '#3f3f46',
  '#27272a',
  '#18181b',
  '#09090b',
  '#4f46e5',
  '#6366f1',
  '#818cf8',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
];

export const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  label,
  value = 'transparent',
  onChange,
}) => {
  const isTransparent = !value || value === 'transparent';

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span className="font-mono text-[11px] text-zinc-500 uppercase">
          {isTransparent ? 'none' : value}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <label className="relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 shadow-sm overflow-hidden hover:border-zinc-500 transition-colors">
          {isTransparent ? (
            <span className="material-symbols-outlined text-[14px] text-zinc-500">block</span>
          ) : (
            <div className="h-full w-full" style={{ backgroundColor: value }} />
          )}
          <input
            type="color"
            value={isTransparent ? '#ffffff' : value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="transparent or #hex"
          className="h-8 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-2.5 text-xs text-zinc-200 placeholder-zinc-600 focus:border-indigo-500 focus:outline-none font-mono"
        />

        {!isTransparent && (
          <button
            type="button"
            title="Clear color"
            onClick={() => onChange('transparent')}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        )}
      </div>

      {/* Preset Swatches */}
      <div className="flex flex-wrap gap-1 pt-1">
        {PRESET_COLORS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`h-4 w-4 rounded-sm border transition-transform hover:scale-110 ${
              value === preset ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-zinc-700'
            }`}
            style={{
              backgroundColor: preset === 'transparent' ? '#27272a' : preset,
            }}
            title={preset}
          />
        ))}
      </div>
    </div>
  );
};
