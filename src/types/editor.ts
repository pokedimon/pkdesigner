export type SupportedTag =
  | 'div'
  | 'section'
  | 'header'
  | 'footer'
  | 'article'
  | 'main'
  | 'nav'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'p'
  | 'span'
  | 'a'
  | 'button'
  | 'input'
  | 'textarea'
  | 'img';

export interface ElementStyles {
  display?: string;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  flexWrap?: 'nowrap' | 'wrap';
  gap?: string;

  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;

  padding?: string;
  margin?: string;

  color?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;

  backgroundColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted';

  boxShadow?: string;
  opacity?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  cursor?: string;
}

export interface ElementNode {
  id: string;
  tag: SupportedTag;
  name: string;
  textContent?: string;
  attributes: Record<string, string>;
  styles: ElementStyles;
  children?: ElementNode[];
  isLocked?: boolean;
  isHidden?: boolean;
}

export type ViewportDevice = 'desktop' | 'tablet' | 'mobile' | 'fluid';

export interface ViewportConfig {
  id: ViewportDevice;
  label: string;
  width: number | string;
  height: number | string;
  icon: string;
}

export type ActiveSidebarTab = 'elements' | 'layers';
