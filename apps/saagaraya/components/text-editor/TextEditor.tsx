'use client';

import { useEffect, useMemo, useState } from 'react';
import { EditorOptions } from '@tiptap/core';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Heading } from '@tiptap/extension-heading';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import cs from 'classnames';

import { ToolbarCoreButtonGroup, TransliteratorBox } from '@/components/atoms';
import { Select, SelectOption } from '@/components/select';
import { TransliterateText } from '@/modules/utils';

import { TextEditorControls } from './elements';
import { EditorFontKeys, editorFonts, editorFontsArray } from './models';
import {
  ToolBarButtonGroup,
  ToolBarColorPickerButton,
  ToolBarIconButton,
} from './molecules';

const textEditorOptions: Partial<EditorOptions> = {
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
    transformPastedHTML: (html) => {
      console.log('html', html);
      // Use a DOMParser to parse the pasted HTML
      const doc = new DOMParser().parseFromString(html, 'text/html');

      // Remove color-related styles
      doc.querySelectorAll('*[style]').forEach((element) => {
        const style = element.getAttribute('style');
        if (style) {
          // Remove only color-related styles
          element.setAttribute('style', style.replace(/color\s*:[^;]+;/gi, ''));
        }
      });

      // Serialize the modified HTML back to a string
      const modifiedHTML = new XMLSerializer().serializeToString(doc);
      console.log('modifiedHTML', modifiedHTML);
      return modifiedHTML;
    },
  },
};

const defaultMenuPosition = {
  top: 0,
  left: 0,
  display: 'none',
};

export const TextEditor = () => {
  const [selectedFontKey, setSelectedFontKey] = useState(
    EditorFontKeys.NotoSansSinhala,
  );
  const [menuPosition, setMenuPosition] = useState(defaultMenuPosition);
  const trnasliterateTextKey = 'text-editor';
  const [enableTransliteration, setEnableTransliteration] = useState(false);
  const editor = useEditor(textEditorOptions);

  const handleBeforeInput = (e: any) => {
    if (!editor || !enableTransliteration) return;
    e.preventDefault();

    switch (e.data) {
      case ' ': {
        const transliteratedText =
          TransliterateText.removeAndGetTransliteratedText(
            trnasliterateTextKey,
          );
        if (!editor) return;
        const transaction = editor.state.tr.insertText(
          transliteratedText ? transliteratedText + ' ' : ' ',
        );
        editor.view.dispatch(transaction);
        setMenuPosition(defaultMenuPosition);
        break;
      }
      default: {
        e.preventDefault();
        TransliterateText.storeTransliteratedText(trnasliterateTextKey, e.data);

        const pos = editor.view.coordsAtPos(editor.state.selection.head);
        setMenuPosition({
          top: pos.top + window.scrollY,
          left: pos.left + window.scrollX,
          display: 'block',
        });
        break;
      }
    }
  };

  const handleKeyDown = (e: any) => {
    if (!enableTransliteration) return;

    switch (e.key) {
      case 'Backspace': {
        const isThereTextToTransliterate =
          TransliterateText.isThereTextToTransliterate(trnasliterateTextKey);
        if (!isThereTextToTransliterate) return;
        e.preventDefault();
        TransliterateText.backspaceTransliteratedText(trnasliterateTextKey);
        break;
      }
      case 'Enter': {
        const transliteratedText =
          TransliterateText.removeAndGetTransliteratedText(
            trnasliterateTextKey,
          );
        if (!editor) return;
        const transaction = editor.state.tr.insertText(
          transliteratedText ? transliteratedText : '',
        );
        editor.view.dispatch(transaction);
        setMenuPosition(defaultMenuPosition);
        break;
      }
      case 'Escape': {
        setMenuPosition(defaultMenuPosition);
        TransliterateText.removeAndGetTransliteratedText(trnasliterateTextKey);
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    setMenuPosition(defaultMenuPosition);
    TransliterateText.removeAndGetTransliteratedText(trnasliterateTextKey);
  }, [enableTransliteration]);

  const editorControls = useMemo(() => {
    if (!editor) return null;
    return new TextEditorControls(editor);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={cs('flex h-screen flex-col')}>
      <div
        className={cs(
          'm-6 flex flex-wrap items-center gap-2 p-2',
          'rounded-2xl bg-gray-400/20 min-[1000px]:rounded-full',
          'z-10',
        )}>
        <div
          className="flex items-center gap-2"
          onClick={() => console.log('editor.getHTML()', editor.getHTML())}>
          Export
        </div>
        <ToolBarButtonGroup
          toolBarButtons={editorControls?.textFormattingButtons || []}
          editor={editor}
        />
        <ToolbarCoreButtonGroup>
          <ToolBarColorPickerButton
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
          className="max-w-60"
        />
        <ToolbarCoreButtonGroup>
          <ToolBarIconButton
            iconText="SIN ➡️ සිං"
            onClick={() => {
              setEnableTransliteration((prev) => !prev);
            }}
            isActive={enableTransliteration}
          />
        </ToolbarCoreButtonGroup>
      </div>
      {editor && (
        <div style={{ position: 'absolute', ...menuPosition }}>
          <TransliteratorBox id={trnasliterateTextKey} />
        </div>
      )}
      <EditorContent
        editor={editor}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        className={cs(
          'h-full overflow-hidden bg-neutral-200 dark:bg-neutral-800',
        )}
      />
    </div>
  );
};
