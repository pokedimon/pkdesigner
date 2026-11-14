import React, { useState, useRef, useEffect } from 'react';
import { useEditor } from '../../context/useEditor.ts';
import type { ElementNode } from '../../types/editor.ts';

interface CanvasNodeProps {
  node: ElementNode;
}

export const CanvasNode: React.FC<CanvasNodeProps> = ({ node }) => {
  const {
    selectedId,
    hoveredId,
    selectElement,
    setHoveredElement,
    updateElement,
    previewMode,
  } = useEditor();

  const [isEditingText, setIsEditingText] = useState(false);
  const textInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isSelected = !previewMode && selectedId === node.id;
  const isHovered = !previewMode && hoveredId === node.id && !isSelected;

  useEffect(() => {
    if (isEditingText && textInputRef.current) {
      textInputRef.current.focus();
      textInputRef.current.select();
    }
  }, [isEditingText]);

  if (node.isHidden && !previewMode) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewMode) return;
    selectElement(node.id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewMode || node.isLocked) return;
    if (['h1', 'h2', 'h3', 'p', 'span', 'a', 'button'].includes(node.tag)) {
      setIsEditingText(true);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewMode) return;
    setHoveredElement(node.id);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hoveredId === node.id) {
      setHoveredElement(null);
    }
  };

  const handleTextCommit = (newText: string) => {
    updateElement(node.id, { textContent: newText });
    setIsEditingText(false);
  };

  // Convert node styles into React inline CSSProperties
  const inlineStyles: React.CSSProperties = {
    display: node.styles.display || (node.tag === 'span' || node.tag === 'a' ? 'inline' : 'block'),
    flexDirection: node.styles.flexDirection,
    justifyContent: node.styles.justifyContent,
    alignItems: node.styles.alignItems,
    flexWrap: node.styles.flexWrap,
    gap: node.styles.gap,

    width: node.styles.width,
    height: node.styles.height,
    minWidth: node.styles.minWidth,
    minHeight: node.styles.minHeight,
    maxWidth: node.styles.maxWidth,
    maxHeight: node.styles.maxHeight,

    padding: node.styles.padding,
    margin: node.styles.margin,

    color: node.styles.color,
    fontSize: node.styles.fontSize,
    fontWeight: node.styles.fontWeight,
    textAlign: node.styles.textAlign,
    lineHeight: node.styles.lineHeight,

    backgroundColor: node.styles.backgroundColor,
    borderRadius: node.styles.borderRadius,
    borderWidth: node.styles.borderWidth,
    borderColor: node.styles.borderColor,
    borderStyle: node.styles.borderStyle || 'solid',

    boxShadow: node.styles.boxShadow,
    opacity: node.styles.opacity ? parseFloat(node.styles.opacity) : undefined,
    overflow: node.styles.overflow,
    cursor: previewMode ? (node.tag === 'button' || node.tag === 'a' ? 'pointer' : 'default') : 'default',
  };

  // Render children or inner text
  const renderContent = () => {
    if (isEditingText) {
      return (
        <input
          ref={textInputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={node.textContent || ''}
          onChange={(e) => updateElement(node.id, { textContent: e.target.value })}
          onBlur={(e) => handleTextCommit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleTextCommit(e.currentTarget.value);
            } else if (e.key === 'Escape') {
              setIsEditingText(false);
            }
          }}
          className="w-full bg-indigo-950/80 text-inherit border border-indigo-500 rounded px-1.5 py-0.5 outline-none font-inherit text-inherit"
        />
      );
    }

    if (node.tag === 'img') {
      return null;
    }

    if (node.children && node.children.length > 0) {
      return node.children.map((child) => <CanvasNode key={child.id} node={child} />);
    }

    if (['div', 'section', 'header', 'footer', 'article', 'main', 'nav'].includes(node.tag)) {
      if (!previewMode) {
        return (
          <div className="flex h-14 w-full items-center justify-center rounded border border-dashed border-zinc-700/60 bg-zinc-900/30 text-[11px] text-zinc-500 font-mono select-none">
            Drop elements into &lt;{node.tag}&gt;
          </div>
        );
      }
      return null;
    }

    return node.textContent || '';
  };

  const elementProps: Record<string, unknown> = {
    id: `canvas-${node.id}`,
    onClick: handleClick,
    onDoubleClick: handleDoubleClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: inlineStyles,
    className: `relative transition-shadow transition-colors duration-75 ${
      isSelected
        ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-950 shadow-md'
        : isHovered
        ? 'outline outline-1 outline-indigo-400/80 outline-offset-1'
        : ''
    }`,
    ...node.attributes,
  };

  return React.createElement(node.tag, elementProps, renderContent());
};
