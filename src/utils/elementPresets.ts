import type { ElementNode, SupportedTag } from '../types/editor.ts';

// Generates lightweight random IDs without external dependencies
export function generateId(): string {
  return 'node_' + Math.random().toString(36).substring(2, 9);
}

export interface ElementTemplate {
  category: 'Layout' | 'Typography' | 'Controls' | 'Media';
  title: string;
  tag: SupportedTag;
  icon: string;
  createNode: () => ElementNode;
}

export const ELEMENT_PRESETS: ElementTemplate[] = [
  // Layout
  {
    category: 'Layout',
    title: 'Container',
    tag: 'div',
    icon: 'crop_square',
    createNode: () => ({
      id: generateId(),
      tag: 'div',
      name: 'Container',
      attributes: {},
      styles: {
        display: 'block',
        width: '100%',
        minHeight: '80px',
        padding: '16px',
        backgroundColor: 'transparent',
        borderColor: '#3f3f46',
        borderWidth: '1px',
        borderStyle: 'dashed',
        borderRadius: '6px',
      },
      children: [],
    }),
  },
  {
    category: 'Layout',
    title: 'Card',
    tag: 'div',
    icon: 'featured_play_list',
    createNode: () => ({
      id: generateId(),
      tag: 'div',
      name: 'Card',
      attributes: {},
      styles: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        padding: '24px',
        backgroundColor: '#18181b',
        borderRadius: '12px',
        borderWidth: '1px',
        borderColor: '#27272a',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      children: [
        {
          id: generateId(),
          tag: 'h3',
          name: 'Card Title',
          textContent: 'Card Title',
          attributes: {},
          styles: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#fafafa',
            margin: '0',
          },
        },
        {
          id: generateId(),
          tag: 'p',
          name: 'Card Description',
          textContent: 'This is a modular card container ready for your content and actions.',
          attributes: {},
          styles: {
            fontSize: '14px',
            color: '#a1a1aa',
            lineHeight: '1.5',
            margin: '0',
          },
        },
      ],
    }),
  },
  {
    category: 'Layout',
    title: 'Flex Row',
    tag: 'div',
    icon: 'view_column',
    createNode: () => ({
      id: generateId(),
      tag: 'div',
      name: 'Flex Row',
      attributes: {},
      styles: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        width: '100%',
        padding: '16px',
        minHeight: '60px',
        backgroundColor: 'transparent',
        borderWidth: '1px',
        borderStyle: 'dashed',
        borderColor: '#3f3f46',
        borderRadius: '6px',
      },
      children: [],
    }),
  },
  {
    category: 'Layout',
    title: 'Section',
    tag: 'section',
    icon: 'view_agenda',
    createNode: () => ({
      id: generateId(),
      tag: 'section',
      name: 'Section',
      attributes: {},
      styles: {
        display: 'block',
        width: '100%',
        padding: '32px 24px',
        backgroundColor: 'transparent',
      },
      children: [],
    }),
  },

  // Typography
  {
    category: 'Typography',
    title: 'Heading 1',
    tag: 'h1',
    icon: 'format_h1',
    createNode: () => ({
      id: generateId(),
      tag: 'h1',
      name: 'Heading 1',
      textContent: 'Design Without Limits',
      attributes: {},
      styles: {
        fontSize: '36px',
        fontWeight: '700',
        color: '#f4f4f5',
        lineHeight: '1.2',
        margin: '0 0 12px 0',
      },
    }),
  },
  {
    category: 'Typography',
    title: 'Heading 2',
    tag: 'h2',
    icon: 'format_h2',
    createNode: () => ({
      id: generateId(),
      tag: 'h2',
      name: 'Heading 2',
      textContent: 'Section Header',
      attributes: {},
      styles: {
        fontSize: '28px',
        fontWeight: '600',
        color: '#e4e4e7',
        lineHeight: '1.3',
        margin: '0 0 8px 0',
      },
    }),
  },
  {
    category: 'Typography',
    title: 'Paragraph',
    tag: 'p',
    icon: 'format_paragraph',
    createNode: () => ({
      id: generateId(),
      tag: 'p',
      name: 'Paragraph',
      textContent: 'Craft modern web applications with intuitive visual editing and full backend capability.',
      attributes: {},
      styles: {
        fontSize: '16px',
        fontWeight: '400',
        color: '#a1a1aa',
        lineHeight: '1.6',
        margin: '0 0 8px 0',
      },
    }),
  },
  {
    category: 'Typography',
    title: 'Text Link',
    tag: 'a',
    icon: 'link',
    createNode: () => ({
      id: generateId(),
      tag: 'a',
      name: 'Link',
      textContent: 'Explore components',
      attributes: { href: '#' },
      styles: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#6366f1',
        cursor: 'pointer',
      },
    }),
  },

  // Controls
  {
    category: 'Controls',
    title: 'Button (Primary)',
    tag: 'button',
    icon: 'smart_button',
    createNode: () => ({
      id: generateId(),
      tag: 'button',
      name: 'Primary Button',
      textContent: 'Get Started',
      attributes: { type: 'button' },
      styles: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        backgroundColor: '#4f46e5',
        borderRadius: '8px',
        borderWidth: '0px',
        cursor: 'pointer',
      },
    }),
  },
  {
    category: 'Controls',
    title: 'Button (Secondary)',
    tag: 'button',
    icon: 'radio_button_unchecked',
    createNode: () => ({
      id: generateId(),
      tag: 'button',
      name: 'Secondary Button',
      textContent: 'Learn More',
      attributes: { type: 'button' },
      styles: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#e4e4e7',
        backgroundColor: '#27272a',
        borderRadius: '8px',
        borderWidth: '1px',
        borderColor: '#3f3f46',
        cursor: 'pointer',
      },
    }),
  },
  {
    category: 'Controls',
    title: 'Text Input',
    tag: 'input',
    icon: 'edit_note',
    createNode: () => ({
      id: generateId(),
      tag: 'input',
      name: 'Input Field',
      attributes: { type: 'text', placeholder: 'Enter your email address...' },
      styles: {
        display: 'block',
        width: '100%',
        padding: '10px 14px',
        fontSize: '14px',
        color: '#fafafa',
        backgroundColor: '#18181b',
        borderRadius: '8px',
        borderWidth: '1px',
        borderColor: '#3f3f46',
      },
    }),
  },
  {
    category: 'Controls',
    title: 'Textarea',
    tag: 'textarea',
    icon: 'notes',
    createNode: () => ({
      id: generateId(),
      tag: 'textarea',
      name: 'Textarea',
      attributes: { placeholder: 'Write your message...', rows: '3' },
      styles: {
        display: 'block',
        width: '100%',
        padding: '10px 14px',
        fontSize: '14px',
        color: '#fafafa',
        backgroundColor: '#18181b',
        borderRadius: '8px',
        borderWidth: '1px',
        borderColor: '#3f3f46',
      },
    }),
  },

  // Media
  {
    category: 'Media',
    title: 'Image',
    tag: 'img',
    icon: 'image',
    createNode: () => ({
      id: generateId(),
      tag: 'img',
      name: 'Image',
      attributes: {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        alt: 'Abstract gradient artwork',
      },
      styles: {
        display: 'block',
        width: '100%',
        maxHeight: '260px',
        borderRadius: '10px',
        overflow: 'hidden',
      },
    }),
  },
];
