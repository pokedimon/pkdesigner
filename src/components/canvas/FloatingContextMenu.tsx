import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useEditor } from '../../context/useEditor.ts';

export const FloatingContextMenu: React.FC = () => {
  const {
    selectedNode,
    previewMode,
    duplicateElement,
    deleteElement,
    zoom,
    viewport,
  } = useEditor();

  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const menuEl = menuRef.current;
    if (!menuEl) return;

    if (!selectedNode || previewMode) {
      menuEl.style.display = 'none';
      return;
    }

    const targetEl = document.getElementById(`canvas-${selectedNode.id}`);
    if (!targetEl) {
      menuEl.style.display = 'none';
      return;
    }

    const targetRect = targetEl.getBoundingClientRect();
    const menuRect = menuEl.getBoundingClientRect();

    const leftPanel = document.getElementById('left-sidebar');
    const rightPanel = document.getElementById('right-sidebar');
    const headerEl = document.getElementById('app-header');

    // Screen boundary limits
    const minX = (leftPanel ? leftPanel.getBoundingClientRect().right : 256) + 8;
    const maxX = (rightPanel ? rightPanel.getBoundingClientRect().left : window.innerWidth - 288) - 8;
    const minY = (headerEl ? headerEl.getBoundingClientRect().bottom : 56) + 8;
    const maxY = window.innerHeight - 8;

    // Check if target element is completely out of visible viewport
    if (
      targetRect.bottom < minY ||
      targetRect.top > maxY ||
      targetRect.right < minX ||
      targetRect.left > maxX
    ) {
      menuEl.style.display = 'none';
      return;
    }

    // Default positioning: directly above target element
    let x = targetRect.left;
    let y = targetRect.top - menuRect.height - 6;

    // If menu hides under top header or off-screen, place below target or clamp
    if (y < minY) {
      if (targetRect.bottom + menuRect.height + 6 <= maxY) {
        y = targetRect.bottom + 6;
      } else {
        y = minY;
      }
    }

    // If menu hides under left sidebar, nudge it right so it fits fully on screen
    if (x < minX) {
      x = minX;
    }

    // If menu hides under right sidebar, nudge it left so it fits fully on screen
    if (x + menuRect.width > maxX) {
      x = maxX - menuRect.width;
    }

    // Safety clamp in case of very narrow available width
    if (x < minX) {
      x = minX;
    }

    menuEl.style.display = 'flex';
    menuEl.style.top = `${y}px`;
    menuEl.style.left = `${x}px`;
  }, [selectedNode, previewMode]);

  // Keep position updated on scroll (capture phase), resize, and state changes
  useEffect(() => {
    updatePosition();

    const handleScrollOrResize = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [updatePosition, zoom, viewport]);

  if (!selectedNode || previewMode) {
    return null;
  }

  return createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        zIndex: 50,
      }}
      className="hidden items-center gap-1.5 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-lg shadow-indigo-950/40 border border-indigo-400/30 select-none pointer-events-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="font-mono lowercase tracking-tight">&lt;{selectedNode.tag.toLowerCase()}&gt;</span>
      <span className="text-indigo-200">|</span>
      <span className="truncate max-w-[120px]">{selectedNode.name}</span>
      <div className="flex items-center ml-1 border-l border-indigo-400/40 pl-1 gap-0.5">
        <button
          type="button"
          onClick={() => duplicateElement(selectedNode.id)}
          title="Duplicate"
          className="flex h-4 w-4 items-center justify-center hover:text-indigo-100 rounded-full"
        >
          <span className="material-symbols-outlined text-[11px]">content_copy</span>
        </button>
        <button
          type="button"
          onClick={() => deleteElement(selectedNode.id)}
          title="Delete"
          className="flex h-4 w-4 items-center justify-center hover:text-red-200 rounded-full"
        >
          <span className="material-symbols-outlined text-[11px]">delete</span>
        </button>
      </div>
    </div>,
    document.body,
  );
};
