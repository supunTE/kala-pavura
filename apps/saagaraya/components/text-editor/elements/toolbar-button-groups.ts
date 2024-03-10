import {
  Paragraph,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextHOne,
  TextHThree,
  TextHTwo,
  TextItalic,
  TextStrikethrough,
  TextUnderline,
} from '@phosphor-icons/react';
import { Editor } from '@tiptap/react';

import {
  AlignButtonAction,
  FormatButtonAction,
  HeadingButtonAction,
  ToolBarAction,
} from '../models';

export class TextEditorControls {
  constructor(private editor: Editor) {}

  get textFormattingButtons(): ToolBarAction<FormatButtonAction>[] {
    return [
      {
        icon: TextB,
        action: {
          name: 'bold',
        },
        onClick: () => this.editor.chain().focus().toggleBold().run(),
      },
      {
        icon: TextItalic,
        action: {
          name: 'italic',
        },
        onClick: () => this.editor.chain().focus().toggleItalic().run(),
      },
      {
        icon: TextStrikethrough,
        action: {
          name: 'strike',
        },
        onClick: () => this.editor.chain().focus().toggleStrike().run(),
      },
      {
        icon: TextUnderline,
        action: {
          name: 'underline',
        },
        onClick: () => this.editor.chain().focus().toggleUnderline().run(),
      },
    ];
  }

  get textAlignmentButtons(): ToolBarAction<AlignButtonAction>[] {
    return [
      {
        icon: TextAlignLeft,
        action: { attributes: { textAlign: 'left' } },
        onClick: () => this.editor.chain().focus().setTextAlign('left').run(),
      },
      {
        icon: TextAlignCenter,
        action: {
          attributes: {
            textAlign: 'center',
          },
        },
        onClick: () => this.editor.chain().focus().setTextAlign('center').run(),
      },
      {
        icon: TextAlignRight,
        action: {
          attributes: {
            textAlign: 'right',
          },
        },
        onClick: () => this.editor.chain().focus().setTextAlign('right').run(),
      },
      {
        icon: TextAlignJustify,
        action: {
          attributes: {
            textAlign: 'justify',
          },
        },
        onClick: () =>
          this.editor.chain().focus().setTextAlign('justify').run(),
      },
    ];
  }

  get textHeadingButtons(): ToolBarAction<HeadingButtonAction>[] {
    return [
      {
        icon: TextHOne,
        action: {
          name: 'heading',
          attributes: { level: 1 },
        },
        onClick: () =>
          this.editor.chain().focus().setHeading({ level: 1 }).run(),
      },
      {
        icon: TextHTwo,
        action: {
          name: 'heading',
          attributes: { level: 2 },
        },
        onClick: () =>
          this.editor.chain().focus().setHeading({ level: 2 }).run(),
      },
      {
        icon: TextHThree,
        action: {
          name: 'heading',
          attributes: { level: 3 },
        },
        onClick: () =>
          this.editor.chain().focus().setHeading({ level: 3 }).run(),
      },
      {
        icon: Paragraph,
        action: {
          name: 'paragraph',
        },
        onClick: () => this.editor.chain().focus().setParagraph().run(),
      },
    ];
  }
}
