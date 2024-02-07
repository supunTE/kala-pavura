'use client';

import { useMemo, useState } from 'react';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Heading } from '@tiptap/extension-heading';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import cs from 'classnames';

import { ToolbarCoreButtonGroup } from '@/components/atoms';
import { Select, SelectOption } from '@/components/select';

import { TextEditorControls } from './elements';
import { EditorFontKeys, editorFonts, editorFontsArray } from './models';
import { ColorPickerButton, ToolBarButtonGroup } from './molecules';

const textEditorOptions = {
  extensions: [
    StarterKit.configure({
      heading: false,
      codeBlock: false,
      blockquote: false,
      bulletList: false,
    }),
    Underline,
    TextStyle,
    Heading.extend({
      levels: [1, 2, 3],
      renderHTML({ node, HTMLAttributes }) {
        const level = this.options.levels.includes(node.attrs.level)
          ? node.attrs.level
          : this.options.levels[0];
        const classes: { [index: number]: string } = {
          1: 'text-4xl',
          2: 'text-2xl',
          3: 'text-xl',
        };
        return [
          `h${level}`,
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
            class: `${classes[level]}`,
          }),
          0,
        ];
      },
    }).configure({ levels: [1, 2, 3] }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Color.configure({
      types: ['textStyle'],
    }),
    FontFamily.configure({
      types: ['textStyle'],
    }),
  ],
  content: '<p>ඔබේ කතාව මෙතැනින් පටන් ගන්න... ✒️️</p>',
  editorProps: {
    attributes: {
      class: 'outline-none h-full overflow-auto p-4',
    },
  },
};

export const TextEditor = () => {
  const [selectedFontKey, setSelectedFontKey] = useState(
    EditorFontKeys.NotoSansSinhala,
  );

  const editor = useEditor(textEditorOptions);

  const editorControls = useMemo(() => {
    if (!editor) return null;
    return new TextEditorControls(editor);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={cs('flex flex-col h-screen')}>
      <div
        className={cs(
          'flex items-center gap-2 p-2 m-6',
          'bg-gray-400/20 rounded-full',
          'z-10',
        )}>
        <ToolBarButtonGroup
          toolBarButtons={editorControls?.textFormattingButtons || []}
          editor={editor}
        />
        <ToolbarCoreButtonGroup>
          <ColorPickerButton
            onPick={(value) => {
              editor?.chain().focus().setColor(value).run();
            }}
          />
        </ToolbarCoreButtonGroup>
        <ToolBarButtonGroup
          toolBarButtons={editorControls?.textAlignmentButtons || []}
          editor={editor}
        />
        <ToolBarButtonGroup
          toolBarButtons={editorControls?.textHeadingButtons || []}
          editor={editor}
        />
        <Select
          data={
            editorFontsArray.map(([key, editorFont]) => ({
              value: key,
              label: editorFont.displayName,
              className: editorFont.font.className,
            })) as SelectOption[]
          }
          onChange={(key: EditorFontKeys) => {
            setSelectedFontKey(key);

            const fontFamily = editorFonts[key].font.style.fontFamily.replace(
              /['"]+/g,
              '',
            );
            if (!fontFamily) return;
            editor.chain().focus().setFontFamily(fontFamily).run();
          }}
          selected={selectedFontKey}
          className="max-w-40"
        />
      </div>
      <EditorContent
        editor={editor}
        className={cs(
          'h-full overflow-none bg-neutral-200 dark:bg-neutral-800',
        )}
      />
    </div>
  );
};
