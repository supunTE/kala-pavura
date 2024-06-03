export type EditorContentPosition = {
  top: number;
  left: number;
  display: 'block' | 'none';
};

export const defaultMenuPosition: EditorContentPosition = {
  top: 0,
  left: 0,
  display: 'none',
};
