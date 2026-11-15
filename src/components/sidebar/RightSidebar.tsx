import React from 'react';
import { useEditor } from '../../context/useEditor.ts';
import type { SupportedTag } from '../../types/editor.ts';
import { ColorPickerInput } from '../common/ColorPickerInput.tsx';

const SUPPORTED_TAGS: { value: SupportedTag; label: string }[] = [
  { value: 'div', label: 'div (Container)' },
  { value: 'section', label: 'section' },
  { value: 'header', label: 'header' },
  { value: 'footer', label: 'footer' },
  { value: 'article', label: 'article' },
  { value: 'h1', label: 'h1 (Heading 1)' },
  { value: 'h2', label: 'h2 (Heading 2)' },
  { value: 'h3', label: 'h3 (Heading 3)' },
  { value: 'p', label: 'p (Paragraph)' },
  { value: 'span', label: 'span' },
  { value: 'a', label: 'a (Link)' },
  { value: 'button', label: 'button' },
  { value: 'input', label: 'input' },
  { value: 'textarea', label: 'textarea' },
  { value: 'img', label: 'img (Image)' },
];

export const RightSidebar: React.FC = () => {
  const {
    selectedNode,
    updateElement,
    updateElementStyles,
    deleteElement,
    duplicateElement,
    elements,
  } = useEditor();

  if (!selectedNode) {
    return (
      <aside id="right-sidebar" className="flex h-full w-72 flex-col border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 text-xs select-none z-20 overflow-y-auto transition-colors">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
            <span className="material-symbols-outlined text-zinc-500 dark:text-zinc-400">tune</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">Inspector</span>
          </div>

          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4 text-center">
            <span className="material-symbols-outlined text-2xl text-zinc-400 dark:text-zinc-600 mb-2">
              touch_app
            </span>
            <p className="font-medium text-zinc-700 dark:text-zinc-300">No element selected</p>
            <p className="text-zinc-500 mt-1">
              Click any element on the canvas or from the Layers tree to inspect and adjust its properties.
            </p>
          </div>

          {/* Quick Shortcuts Guide */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Shortcuts
            </span>
            <div className="flex flex-col gap-1.5 text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Duplicate element</span>
                <span className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                  Ctrl+D
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Undo / Redo</span>
                <span className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                  Ctrl+Z / Ctrl+Y
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delete element</span>
                <span className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                  Delete / Backspace
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Deselect</span>
                <span className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                  Escape
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Edit text</span>
                <span className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
                  Double Click
                </span>
              </div>
            </div>
          </div>

          {/* Canvas Stats */}
          <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Canvas Overview
            </span>
            <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
              <span>Root nodes</span>
              <span className="font-mono text-zinc-800 dark:text-zinc-200">{elements.length}</span>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  const styles = selectedNode.styles;
  const isTextElement = ['h1', 'h2', 'h3', 'p', 'span', 'a', 'button'].includes(selectedNode.tag);

  return (
    <aside id="right-sidebar" className="flex h-full w-72 flex-col border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 select-none z-20 overflow-y-auto custom-scrollbar transition-colors">
      {/* Top Header: Tag, Name & Primary Actions */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-semibold">
            {selectedNode.tag}
          </span>
          <span className="truncate text-xs font-semibold text-zinc-800 dark:text-zinc-200" title={selectedNode.name}>
            {selectedNode.name}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => duplicateElement(selectedNode.id)}
            title="Duplicate element (Ctrl+D)"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">content_copy</span>
          </button>
          <button
            type="button"
            onClick={() => deleteElement(selectedNode.id)}
            title="Delete element"
            className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-4 text-xs">
        {/* Section 1: Identification & Tag Type */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Element
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Tag</label>
              <select
                value={selectedNode.tag}
                onChange={(e) => updateElement(selectedNode.id, { tag: e.target.value as SupportedTag })}
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
              >
                {SUPPORTED_TAGS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Label</label>
              <input
                type="text"
                value={selectedNode.name}
                onChange={(e) => updateElement(selectedNode.id, { name: e.target.value })}
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Text & Content (Contextual) */}
        {isTextElement && (
          <div className="flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Content
            </span>
            <textarea
              rows={2}
              value={selectedNode.textContent || ''}
              onChange={(e) => updateElement(selectedNode.id, { textContent: e.target.value })}
              placeholder="Enter text..."
              className="rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none resize-none"
            />
          </div>
        )}

        {/* Image source input */}
        {selectedNode.tag === 'img' && (
          <div className="flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Image Properties
            </span>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Image URL</label>
              <input
                type="text"
                value={selectedNode.attributes.src || ''}
                onChange={(e) =>
                  updateElement(selectedNode.id, {
                    attributes: { ...selectedNode.attributes, src: e.target.value },
                  })
                }
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Alt text</label>
              <input
                type="text"
                value={selectedNode.attributes.alt || ''}
                onChange={(e) =>
                  updateElement(selectedNode.id, {
                    attributes: { ...selectedNode.attributes, alt: e.target.value },
                  })
                }
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Section 3: Layout & Flow */}
        <div className="flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Layout
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Display</label>
              <select
                value={styles.display || 'block'}
                onChange={(e) => updateElementStyles(selectedNode.id, { display: e.target.value })}
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
              >
                <option value="block">Block</option>
                <option value="flex">Flex</option>
                <option value="inline-block">Inline-Block</option>
                <option value="inline">Inline</option>
              </select>
            </div>

            {styles.display === 'flex' && (
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Direction</label>
                <select
                  value={styles.flexDirection || 'row'}
                  onChange={(e) =>
                    updateElementStyles(selectedNode.id, {
                      flexDirection: e.target.value as 'row' | 'column',
                    })
                  }
                  className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                >
                  <option value="row">Row (Horizontal)</option>
                  <option value="column">Column (Vertical)</option>
                </select>
              </div>
            )}
          </div>

          {styles.display === 'flex' && (
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Align</label>
                <select
                  value={styles.alignItems || 'stretch'}
                  onChange={(e) =>
                    updateElementStyles(selectedNode.id, {
                      alignItems: e.target.value as 'flex-start' | 'center' | 'flex-end' | 'stretch',
                    })
                  }
                  className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                >
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                  <option value="stretch">Stretch</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Justify</label>
                <select
                  value={styles.justifyContent || 'flex-start'}
                  onChange={(e) =>
                    updateElementStyles(selectedNode.id, {
                      justifyContent: e.target.value as 'flex-start' | 'center' | 'flex-end' | 'space-between',
                    })
                  }
                  className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                >
                  <option value="flex-start">Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">End</option>
                  <option value="space-between">Space Between</option>
                </select>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Gap</label>
                <input
                  type="text"
                  value={styles.gap || ''}
                  onChange={(e) => updateElementStyles(selectedNode.id, { gap: e.target.value })}
                  placeholder="e.g. 12px, 1rem"
                  className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
                />
              </div>
            </div>
          )}
        </div>

        {/* Section 4: Dimensions & Box Model */}
        <div className="flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Dimensions & Spacing
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Width</label>
              <input
                type="text"
                value={styles.width || ''}
                onChange={(e) => updateElementStyles(selectedNode.id, { width: e.target.value })}
                placeholder="100%, 300px, auto"
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Height</label>
              <input
                type="text"
                value={styles.height || ''}
                onChange={(e) => updateElementStyles(selectedNode.id, { height: e.target.value })}
                placeholder="auto, 200px"
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Padding</label>
              <input
                type="text"
                value={styles.padding || ''}
                onChange={(e) => updateElementStyles(selectedNode.id, { padding: e.target.value })}
                placeholder="e.g. 16px, 12px 24px"
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Margin</label>
              <input
                type="text"
                value={styles.margin || ''}
                onChange={(e) => updateElementStyles(selectedNode.id, { margin: e.target.value })}
                placeholder="e.g. 0 0 16px 0"
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Typography (When applicable) */}
        {isTextElement && (
          <div className="flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Typography
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Font Size</label>
                <input
                  type="text"
                  value={styles.fontSize || ''}
                  onChange={(e) => updateElementStyles(selectedNode.id, { fontSize: e.target.value })}
                  placeholder="e.g. 16px, 24px"
                  className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Weight</label>
                <select
                  value={styles.fontWeight || '400'}
                  onChange={(e) => updateElementStyles(selectedNode.id, { fontWeight: e.target.value })}
                  className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
                >
                  <option value="400">Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semibold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
            </div>

            {/* Text Alignment */}
            <div className="flex flex-col gap-1 pt-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Alignment</label>
              <div className="grid grid-cols-4 gap-1 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 p-0.5">
                {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => updateElementStyles(selectedNode.id, { textAlign: align })}
                    className={`flex h-7 items-center justify-center rounded text-xs transition-colors ${
                      (styles.textAlign || 'left') === align
                        ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {align === 'left'
                        ? 'format_align_left'
                        : align === 'center'
                        ? 'format_align_center'
                        : align === 'right'
                        ? 'format_align_right'
                        : 'format_align_justify'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Color */}
            <div className="pt-2">
              <ColorPickerInput
                label="Text Color"
                value={styles.color}
                onChange={(val) => updateElementStyles(selectedNode.id, { color: val })}
              />
            </div>
          </div>
        )}

        {/* Section 6: Appearance (Colors, Borders & Radius) */}
        <div className="flex flex-col gap-3 border-t border-zinc-200 dark:border-zinc-800 pt-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Appearance
          </span>

          <ColorPickerInput
            label="Background"
            value={styles.backgroundColor}
            onChange={(val) => updateElementStyles(selectedNode.id, { backgroundColor: val })}
          />

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Radius</label>
              <input
                type="text"
                value={styles.borderRadius || ''}
                onChange={(e) => updateElementStyles(selectedNode.id, { borderRadius: e.target.value })}
                placeholder="e.g. 8px, 9999px"
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Border Width</label>
              <input
                type="text"
                value={styles.borderWidth || ''}
                onChange={(e) => updateElementStyles(selectedNode.id, { borderWidth: e.target.value })}
                placeholder="e.g. 1px, 2px"
                className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none font-mono"
              />
            </div>
          </div>

          <ColorPickerInput
            label="Border Color"
            value={styles.borderColor}
            onChange={(val) => updateElementStyles(selectedNode.id, { borderColor: val })}
          />

          {/* Border Style */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-zinc-500 dark:text-zinc-400">Border Style</label>
            <select
              value={styles.borderStyle || 'solid'}
              onChange={(e) =>
                updateElementStyles(selectedNode.id, {
                  borderStyle: e.target.value as 'solid' | 'dashed' | 'dotted' | 'none',
                })
              }
              className="h-8 rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 text-xs text-zinc-900 dark:text-zinc-200 focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="none">None</option>
            </select>
          </div>

          {/* Opacity */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
              <span>Opacity</span>
              <span className="font-mono">{Math.round((styles.opacity ? parseFloat(styles.opacity) : 1) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={styles.opacity || '1'}
              onChange={(e) => updateElementStyles(selectedNode.id, { opacity: e.target.value })}
              className="accent-indigo-500 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
