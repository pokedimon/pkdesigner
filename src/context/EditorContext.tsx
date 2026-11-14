import React, { useState, useCallback, useEffect } from 'react';
import type { ElementNode, ElementStyles, ViewportDevice } from '../types/editor.ts';
import { INITIAL_ELEMENTS } from '../utils/initialElements.ts';
import {
  findNodeById,
  updateNodeInTree,
  deleteNodeFromTree,
  insertNodeIntoTree,
  duplicateNodeInTree,
} from '../utils/treeUtils.ts';
import { EditorContext } from './useEditor.ts';

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [elements, setElements] = useState<ElementNode[]>(INITIAL_ELEMENTS);
  const [selectedId, setSelectedId] = useState<string | null>('hero_heading');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [zoom, setZoom] = useState<number>(100);
  const [viewport, setViewport] = useState<ViewportDevice>('desktop');
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  // History stack for undo and redo
  const [history, setHistory] = useState<ElementNode[][]>([INITIAL_ELEMENTS]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Synchronizes document class with theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Push new state into the history stack
  const pushHistory = useCallback((nextElements: ElementNode[]) => {
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, nextElements];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const addElement = useCallback((node: ElementNode, parentId?: string | null) => {
    setElements((prev) => {
      const next = insertNodeIntoTree(prev, node, parentId);
      pushHistory(next);
      return next;
    });
    setSelectedId(node.id);
  }, [pushHistory]);

  const updateElement = useCallback((id: string, updates: Partial<ElementNode>) => {
    setElements((prev) => {
      const next = updateNodeInTree(prev, id, (node) => ({
        ...node,
        ...updates,
      }));
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const updateElementStyles = useCallback((id: string, styleUpdates: Partial<ElementStyles>) => {
    setElements((prev) => {
      const next = updateNodeInTree(prev, id, (node) => ({
        ...node,
        styles: {
          ...node.styles,
          ...styleUpdates,
        },
      }));
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const deleteElement = useCallback((id: string) => {
    setElements((prev) => {
      const next = deleteNodeFromTree(prev, id);
      pushHistory(next);
      return next;
    });
    if (selectedId === id) {
      setSelectedId(null);
    }
  }, [selectedId, pushHistory]);

  const duplicateElement = useCallback((id: string) => {
    setElements((prev) => {
      const next = duplicateNodeInTree(prev, id);
      pushHistory(next);
      return next;
    });
  }, [pushHistory]);

  const selectElement = useCallback((id: string | null) => {
    setSelectedId(id);
  }, []);

  const setHoveredElement = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 10, 200));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 10, 50));
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(100);
  }, []);

  const togglePreviewMode = useCallback(() => {
    setPreviewMode((prev) => !prev);
    if (!previewMode) {
      setSelectedId(null);
    }
  }, [previewMode]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const nextIndex = historyIndex - 1;
      setHistoryIndex(nextIndex);
      setElements(history[nextIndex]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setElements(history[nextIndex]);
    }
  }, [history, historyIndex]);

  // Global keyboard shortcuts for undo, redo, and element deletion
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when actively typing in an input or textarea
      if (
        ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          redo();
        } else {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedId) {
          e.preventDefault();
          deleteElement(selectedId);
        }
      } else if (e.key === 'Escape') {
        setSelectedId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedId, deleteElement]);

  const selectedNode = selectedId ? findNodeById(elements, selectedId) : null;

  return (
    <EditorContext.Provider
      value={{
        elements,
        selectedId,
        hoveredId,
        selectedNode,
        theme,
        zoom,
        viewport,
        previewMode,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        addElement,
        updateElement,
        updateElementStyles,
        deleteElement,
        duplicateElement,
        selectElement,
        setHoveredElement,
        toggleTheme,
        zoomIn,
        zoomOut,
        resetZoom,
        setViewport,
        togglePreviewMode,
        undo,
        redo,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
