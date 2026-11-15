import React, { useState } from 'react';
import { useEditor } from '../../context/useEditor.ts';
import type { ElementNode, ActiveSidebarTab } from '../../types/editor.ts';
import { ELEMENT_PRESETS, type ElementTemplate } from '../../utils/elementPresets.ts';

export const LeftSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveSidebarTab>('elements');
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});

  const {
    elements,
    selectedId,
    selectElement,
    addElement,
    deleteElement,
    updateElement,
    selectedNode,
  } = useEditor();

  const toggleCollapse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddPreset = (preset: ElementTemplate) => {
    const newNode = preset.createNode();
    // If a container node is currently selected, add inside it; otherwise append to root
    const canHaveChildren =
      selectedNode &&
      ['div', 'section', 'header', 'footer', 'article', 'main', 'nav'].includes(selectedNode.tag);

    if (canHaveChildren) {
      addElement(newNode, selectedNode.id);
    } else {
      addElement(newNode, null);
    }
  };

  const renderLayerNode = (node: ElementNode, depth = 0) => {
    const isSelected = selectedId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const isCollapsed = collapsedNodes[node.id];

    return (
      <div key={node.id} className="flex flex-col">
        <div
          onClick={() => selectElement(node.id)}
          style={{ paddingLeft: `${depth * 14 + 10}px` }}
          className={`group flex h-8 items-center justify-between pr-2 text-xs cursor-pointer select-none border-l-2 transition-colors ${
            isSelected
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 font-medium'
              : 'border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
          }`}
        >
          <div className="flex items-center gap-1.5 overflow-hidden">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => toggleCollapse(node.id, e)}
                className="flex h-4 w-4 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <span className="material-symbols-outlined text-[13px]">
                  {isCollapsed ? 'chevron_right' : 'expand_more'}
                </span>
              </button>
            ) : (
              <div className="w-4" />
            )}

            <span className="font-mono text-[10px] text-zinc-500 uppercase px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {node.tag}
            </span>

            <span className="truncate max-w-[110px]" title={node.name}>
              {node.name}
            </span>
          </div>

          {/* Quick Layer Controls */}
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updateElement(node.id, { isHidden: !node.isHidden });
              }}
              title={node.isHidden ? 'Show layer' : 'Hide layer'}
              className="flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[13px]">
                {node.isHidden ? 'visibility_off' : 'visibility'}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                updateElement(node.id, { isLocked: !node.isLocked });
              }}
              title={node.isLocked ? 'Unlock layer' : 'Lock layer'}
              className="flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[13px]">
                {node.isLocked ? 'lock' : 'lock_open'}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                deleteElement(node.id);
              }}
              title="Delete"
              className="flex h-5 w-5 items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <span className="material-symbols-outlined text-[13px]">delete</span>
            </button>
          </div>
        </div>

        {hasChildren && !isCollapsed && (
          <div className="flex flex-col">
            {node.children!.map((child) => renderLayerNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  // Group element presets by category
  const categories = ['Layout', 'Typography', 'Controls', 'Media'] as const;

  return (
    <aside id="left-sidebar" className="flex h-full w-64 flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 select-none z-20 transition-colors">
      {/* Sidebar Tabs */}
      <div className="flex h-11 w-full border-b border-zinc-200 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab('elements')}
          className={`flex flex-1 items-center justify-center gap-1.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'elements'
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-zinc-50 dark:bg-zinc-900/40'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/20'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">add_box</span>
          <span>Elements</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('layers')}
          className={`flex flex-1 items-center justify-center gap-1.5 text-xs font-medium border-b-2 transition-colors ${
            activeTab === 'layers'
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-zinc-50 dark:bg-zinc-900/40'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900/20'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">layers</span>
          <span>Layers</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 custom-scrollbar">
        {activeTab === 'elements' ? (
          <div className="flex flex-col gap-5">
            {/* Context target hint */}
            {selectedNode && (
              <div className="rounded-md border border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 p-2 text-[11px] text-indigo-700 dark:text-indigo-300">
                <span className="font-semibold">Target:</span> {selectedNode.name} (&lt;
                {selectedNode.tag}&gt;)
              </div>
            )}

            {categories.map((category) => {
              const presets = ELEMENT_PRESETS.filter((p) => p.category === category);
              return (
                <div key={category} className="flex flex-col gap-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {category}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                      <button
                        key={preset.title}
                        type="button"
                        onClick={() => handleAddPreset(preset)}
                        className="flex flex-col items-start gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/70 p-2.5 text-left hover:border-indigo-500/50 hover:bg-zinc-100 dark:hover:bg-zinc-850 hover:shadow-xs transition-all group"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <span className="material-symbols-outlined text-[15px]">
                            {preset.icon}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 mt-1">
                          {preset.title}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                          &lt;{preset.tag}&gt;
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-200 dark:border-zinc-800/80 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <span>Scene Elements ({elements.length})</span>
            </div>
            {elements.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
                Canvas is empty. Add elements from the palette.
              </div>
            ) : (
              elements.map((node) => renderLayerNode(node))
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
