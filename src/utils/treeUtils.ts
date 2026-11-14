import type { ElementNode } from '../types/editor.ts';
import { generateId } from './elementPresets.ts';

// Recursively searches for an element by ID
export function findNodeById(nodes: ElementNode[], id: string): ElementNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

// Finds the parent node and index of a target element
export function findParentAndIndex(
  nodes: ElementNode[],
  targetId: string,
  parent: ElementNode | null = null,
): { parent: ElementNode | null; index: number } | null {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === targetId) {
      return { parent, index: i };
    }
    if (nodes[i].children && nodes[i].children!.length > 0) {
      const res = findParentAndIndex(nodes[i].children!, targetId, nodes[i]);
      if (res) return res;
    }
  }
  return null;
}

// Deep clones a node and assigns fresh unique IDs to avoid conflicts
export function cloneNodeWithFreshIds(node: ElementNode): ElementNode {
  return {
    ...node,
    id: generateId(),
    name: `${node.name} (Copy)`,
    children: node.children ? node.children.map(cloneNodeWithFreshIds) : undefined,
  };
}

// Immutably updates a specific node in the tree
export function updateNodeInTree(
  nodes: ElementNode[],
  id: string,
  updater: (node: ElementNode) => ElementNode,
): ElementNode[] {
  return nodes.map((node) => {
    if (node.id === id) {
      return updater(node);
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: updateNodeInTree(node.children, id, updater),
      };
    }
    return node;
  });
}

// Immutably removes a node from anywhere in the tree
export function deleteNodeFromTree(nodes: ElementNode[], id: string): ElementNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => {
      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: deleteNodeFromTree(node.children, id),
        };
      }
      return node;
    });
}

// Inserts a new node into a parent container or at the root level
export function insertNodeIntoTree(
  nodes: ElementNode[],
  newNode: ElementNode,
  targetParentId?: string | null,
): ElementNode[] {
  if (!targetParentId) {
    return [...nodes, newNode];
  }

  return nodes.map((node) => {
    if (node.id === targetParentId) {
      const children = node.children || [];
      return {
        ...node,
        children: [...children, newNode],
      };
    }
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: insertNodeIntoTree(node.children, newNode, targetParentId),
      };
    }
    return node;
  });
}

// Duplicates a node right next to itself in its parent list
export function duplicateNodeInTree(nodes: ElementNode[], id: string): ElementNode[] {
  const result: ElementNode[] = [];

  for (const node of nodes) {
    result.push(node);
    if (node.id === id) {
      result.push(cloneNodeWithFreshIds(node));
    } else if (node.children && node.children.length > 0) {
      node.children = duplicateNodeInTree(node.children, id);
    }
  }

  return result;
}
