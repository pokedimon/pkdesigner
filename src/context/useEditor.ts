import { createContext, useContext } from 'react';
import type { ElementNode, ElementStyles, ViewportDevice } from '../types/editor.ts';

export interface EditorContextType {
  elements: ElementNode[];
  selectedId: string | null;
  hoveredId: string | null;
  selectedNode: ElementNode | null;
  theme: 'dark' | 'light';
  zoom: number;
  viewport: ViewportDevice;
  previewMode: boolean;
  canUndo: boolean;
  canRedo: boolean;

  addElement: (node: ElementNode, parentId?: string | null) => void;
  updateElement: (id: string, updates: Partial<ElementNode>) => void;
  updateElementStyles: (id: string, styleUpdates: Partial<ElementStyles>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  setHoveredElement: (id: string | null) => void;
  toggleTheme: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  setViewport: (viewport: ViewportDevice) => void;
  togglePreviewMode: () => void;
  undo: () => void;
  redo: () => void;
}

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function useEditor(): EditorContextType {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}
