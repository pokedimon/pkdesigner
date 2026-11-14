import React from 'react';
import { useEditor } from '../../context/useEditor.ts';
import type { ViewportDevice } from '../../types/editor.ts';

const VIEWPORTS: { id: ViewportDevice; label: string; icon: string }[] = [
  { id: 'desktop', label: 'Desktop (1280px)', icon: 'desktop_windows' },
  { id: 'tablet', label: 'Tablet (768px)', icon: 'tablet_mac' },
  { id: 'mobile', label: 'Mobile (375px)', icon: 'smartphone' },
  { id: 'fluid', label: 'Fluid (100%)', icon: 'aspect_ratio' },
];

export const Header: React.FC = () => {
  const {
    viewport,
    setViewport,
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    previewMode,
    togglePreviewMode,
    theme,
    toggleTheme,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useEditor();

  return (
    <header id="app-header" className="flex h-14 w-full items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 select-none z-30">
      {/* Brand & Workspace Title */}
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
          <span className="material-symbols-outlined text-[16px]">design_services</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight text-zinc-100">pkdesigner</span>
          <span className="rounded-full bg-zinc-800/80 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
            v0.1
          </span>
        </div>
      </div>

      {/* Middle: Viewport Switcher & Canvas Zoom */}
      <div className="flex items-center gap-2">
        {/* Device Switcher */}
        <div className="flex items-center rounded-full border border-zinc-800 bg-zinc-900/90 p-0.5">
          {VIEWPORTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setViewport(item.id)}
              title={item.label}
              className={`flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium transition-colors ${
                viewport === item.id
                  ? 'bg-zinc-800 text-indigo-400 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
              <span className="hidden sm:inline capitalize">{item.id}</span>
            </button>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

        {/* Zoom Controls */}
        <div className="flex items-center rounded-full border border-zinc-800 bg-zinc-900/90 p-0.5">
          <button
            type="button"
            onClick={zoomOut}
            title="Zoom out"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <span className="material-symbols-outlined text-[14px]">remove</span>
          </button>
          <button
            type="button"
            onClick={resetZoom}
            title="Reset zoom to 100%"
            className="px-2 text-xs font-mono font-medium text-zinc-300 hover:text-indigo-400"
          >
            {zoom}%
          </button>
          <button
            type="button"
            onClick={zoomIn}
            title="Zoom in"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
          </button>
        </div>
      </div>

      {/* Right Controls: History, Preview, Theme */}
      <div className="flex items-center gap-1.5">
        {/* Undo / Redo */}
        <div className="flex items-center rounded-full border border-zinc-800 bg-zinc-900/90 p-0.5">
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <span className="material-symbols-outlined text-[14px]">undo</span>
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <span className="material-symbols-outlined text-[14px]">redo</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

        {/* Preview Mode */}
        <button
          type="button"
          onClick={togglePreviewMode}
          title={previewMode ? 'Exit Preview' : 'Live Preview'}
          className={`flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors ${
            previewMode
              ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
              : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">
            {previewMode ? 'visibility' : 'visibility_off'}
          </span>
          <span className="hidden md:inline">{previewMode ? 'Previewing' : 'Preview'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </span>
        </button>
      </div>
    </header>
  );
};
