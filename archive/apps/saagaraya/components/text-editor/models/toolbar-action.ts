import { Icon } from '@phosphor-icons/react';
import { Editor } from '@tiptap/react';

type ButtonActionName = string | undefined;
type ButtonActionAttributes<T extends object> = T | undefined;
type ButtonAction<
  NAMES extends ButtonActionName,
  ATTR extends ButtonActionAttributes<object>,
> = {
  name?: NAMES;
  attributes?: ATTR;
};

export type FormatButtonAction = ButtonAction<
  'bold' | 'italic' | 'underline' | 'strike',
  undefined
>;
export type AlignButtonAction = ButtonAction<
  undefined,
  { textAlign: 'left' | 'center' | 'right' | 'justify' }
>;

type HeadingButtonActionHeadingType = ButtonAction<
  'heading',
  {
    level: 1 | 2 | 3;
  }
>;
type HeadingButtonActionParagraphType = ButtonAction<'paragraph', undefined>;
export type HeadingButtonAction =
  | HeadingButtonActionHeadingType
  | HeadingButtonActionParagraphType;

type ButtonActions =
  | FormatButtonAction
  | AlignButtonAction
  | HeadingButtonAction;

export type ToolBarAction<T extends ButtonActions> = {
  icon?: Icon;
  iconText?: string;
  action?: T;
  isActive?: boolean;
  onClick: () => void;
};
export type ToolBarIconButtonProps = ToolBarAction<ButtonActions> & {
  editor?: Editor;
};

export type ToolBarActionsGroup = {
  toolBarButtons: ToolBarAction<ButtonActions>[];
};
export type ToolBarButtonGroupProps = ToolBarActionsGroup & {
  editor: Editor;
};
