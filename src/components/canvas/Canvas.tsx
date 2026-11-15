import React, { useRef } from 'react';
import { useEditor } from '../../context/useEditor.ts';
import { CanvasNode } from './CanvasNode.tsx';
import { FloatingContextMenu } from './FloatingContextMenu.tsx';

export const Canvas: React.FC = () => {
  const {
    elements,
    selectedId,
    selectElement,
    zoom,
    viewport,
    previewMode,
  } = useEditor();

  const containerRef = useRef<HTMLDivElement>(null);

  // Viewport width based on selected device preset
  const getViewportDimensions = () => {
    switch (viewport) {
      case 'mobile':
        return { width: '375px', minHeight: '667px', label: 'Mobile (375 × 667)' };
      case 'tablet':
        return { width: '768px', minHeight: '800px', label: 'Tablet (768 × 1024)' };
      case 'fluid':
        return { width: '100%', minHeight: '100%', label: 'Fluid (100%)' };
      case 'desktop':
      default:
        return { width: '1100px', minHeight: '750px', label: 'Desktop (1100 × 750)' };
    }
  };

  const currentDimensions = getViewportDimensions();

  const handleCanvasBackgroundClick = (e: React.MouseEvent) => {
    // Only deselect if clicked directly on the canvas background, not on an element
    if (e.target === e.currentTarget && selectedId) {
      selectElement(null);
    }
  };

  return (
    <main
      ref={containerRef}
      onClick={handleCanvasBackgroundClick}
      className="relative flex-1 overflow-auto p-8 flex items-start justify-center select-none bg-zinc-950 canvas-grid-dark"
    >
      {/* Zoom and Transform Container */}
      <div
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
          transition: 'transform 0.15s ease-out',
        }}
        className="flex flex-col items-center py-4"
        onClick={handleCanvasBackgroundClick}
      >
        {/* Device Viewport Header Pill */}
        {!previewMode && (
          <div className="mb-3 flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/90 px-3 py-1 text-[11px] font-medium text-zinc-400 shadow-sm">
            <span className="material-symbols-outlined text-[13px]">devices</span>
            <span>{currentDimensions.label}</span>
          </div>
        )}

        {/* The Artboard / Page Frame */}
        <div
          id="editor-artboard"
          onClick={handleCanvasBackgroundClick}
          style={{
            width: currentDimensions.width,
            minHeight: currentDimensions.minHeight,
          }}
          className="relative rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-100 transition-all shadow-2xl p-6 flex flex-col gap-4"
        >
          {elements.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-700/50 p-6 text-center text-zinc-500">
              <span className="material-symbols-outlined text-3xl mb-2 text-zinc-600">
                post_add
              </span>
              <p className="text-sm font-medium">Your canvas is blank</p>
              <p className="text-xs text-zinc-500 mt-1">
                Choose an element or component from the left sidebar to start building.
              </p>
            </div>
          ) : (
            elements.map((node) => <CanvasNode key={node.id} node={node} />)
          )}
        </div>
      </div>
      <FloatingContextMenu />
    </main>
  );
};
