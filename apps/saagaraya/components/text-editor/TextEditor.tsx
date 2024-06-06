'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@mantine/core';
import { useClickOutside, useLocalStorage } from '@mantine/hooks';
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

import { DisplayLanguage } from '@kala-pavura/models';
import { ContentTypes } from '@kala-pavura/models';
import { Logger } from '@kala-pavura/services';

import { ToolbarCoreButtonGroup, TransliteratorBox } from '@/components/atoms';
import { Select, SelectOption } from '@/components/select';
import {
  BeforeInputEvent,
  transliterateHandlersBeforeInput,
  transliterateHandlersOnKeyDown,
} from '@/components/text-editor/helpers/editor-transliterate-handlers';
import { AUTO_LOCAL_SAVE_INTERVAL } from '@/constants/text-editor';
import { useFontStatic } from '@/modules/hooks';
import { TransliterateText } from '@/modules/utils';

import { TextEditorControls } from './elements';
import {
  defaultMenuPosition,
  EditorContentPosition,
  EditorFontKeys,
  editorFonts,
  editorFontsArray,
} from './models';
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
        const classes: {
          [index: number]: string;
        } = {
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
    }).configure({
      levels: [1, 2, 3],
    }),
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

type TextEditorProps = {
  contentType: Exclude<ContentTypes, ContentTypes.Story>;
};

export const TextEditor = ({ contentType }: TextEditorProps) => {
  const { secondaryFont } = useFontStatic(DisplayLanguage.Sinhala);

  const [selectedFontKey, setSelectedFontKey] = useState(
    EditorFontKeys.NotoSansSinhala,
  );

  const [menuPosition, setMenuPosition] =
    useState<EditorContentPosition>(defaultMenuPosition);
  const textEditorTrnasliterateKey = 'text-editor';
  const [enableTransliteration, setEnableTransliteration] = useState(false);
  const [contentTitleValue, setContentTitleValue] = useState('');
  const [isEditingContentTitle, setIsEditingContentTitle] = useState(false);

  const contentTitleInputRef = useClickOutside(() =>
    setIsEditingContentTitle(false),
  );

  useEffect(() => {
    if (isEditingContentTitle) {
      contentTitleInputRef.current?.focus();
    }
  }, [isEditingContentTitle]);

  const editor = useEditor(textEditorOptions);

  const [editorContentLastLocalSaveAt, setEditorContentLastLocalSaveAt] =
    useState<Date | null>(null);
  const [editorContentLocalStorage, setEditorContentLocalStorage] =
    useLocalStorage<string | null>({
      key: 'editor-content',
      defaultValue: null,
    });

  const logger = new Logger(`Text editor - [${contentType}]`);

  useEffect(() => {
    // If there's content in local storage, set it to the editor
    if (editorContentLocalStorage) {
      logger.log('Setting editor content from local storage');
      editor?.commands.setContent(editorContentLocalStorage);
    }

    // Save content to local storage for each 1 minute
    const interval = setInterval(() => {
      if (!editor) return;
      setEditorContentLocalStorage(editor.getHTML());
      const currentTimestamp = new Date();
      setEditorContentLastLocalSaveAt(currentTimestamp);
      logger.log('Editor content saved to local storage', {
        currentTimestamp,
      });
    }, AUTO_LOCAL_SAVE_INTERVAL);

    return () => clearInterval(interval);
  }, [editor]);

  const handleBeforeInput = (e: BeforeInputEvent) => {
    if (!editor || !enableTransliteration) return;
    e.preventDefault();

    transliterateHandlersBeforeInput(e, textEditorTrnasliterateKey, {
      editor,
      setMenuPosition,
    });
  };

  const handleKeyDown = (e: any) => {
    if (!editor || !enableTransliteration) return;

    transliterateHandlersOnKeyDown(e, textEditorTrnasliterateKey, {
      editor,
      setMenuPosition,
    });
  };

  useEffect(() => {
    setMenuPosition(defaultMenuPosition);
    TransliterateText.removeTransliteratedText(textEditorTrnasliterateKey);
  }, [enableTransliteration]);

  const editorControls = useMemo(() => {
    if (!editor) return null;
    return new TextEditorControls(editor);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className={cs('flex h-screen flex-col gap-4 bg-neutral-900/80 p-4')}>
      <div
        className={cs('pb-0 text-2xl', secondaryFont.className, {
          'text-neutral-300 dark:text-neutral-500': !contentTitleValue,
        })}>
        <div
          className={cs('flex items-center gap-4', {
            hidden: isEditingContentTitle,
            'inline-block': !isEditingContentTitle,
          })}>
          <span
            className={cs(
              'rounded-xl border border-neutral-200 p-2 px-4 dark:border-neutral-600',
              'focus:ring-curious-blue-400 outline-0 focus:ring-2',
            )}
            onClick={() => {
              setIsEditingContentTitle(true);
            }}>
            {contentTitleValue || 'නිර්නාමික නිර්මාණය'}
          </span>
          <Button
            variant="filled"
            size="sm"
            radius="xl"
            disabled={contentTitleValue == ''}>
            පළ කරන්න
          </Button>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {editorContentLastLocalSaveAt
              ? `අවසන් අභ්‍යන්තර සුරැකුම ${editorContentLastLocalSaveAt.toLocaleTimeString()} දී ය.`
              : 'අභ්‍යන්තරව සුරැකුම් කොට නොමැත.'}
          </span>
        </div>

        <input
          type="text"
          value={contentTitleValue}
          onChange={(e) => setContentTitleValue(e.target.value)}
          className={cs(
            'focus:ring-curious-blue-400 rounded-xl border border-neutral-200 p-2 px-4',
            'outline-0 focus:ring-2 dark:border-neutral-600',
            {
              hidden: !isEditingContentTitle,
              inline: isEditingContentTitle,
            },
          )}
          onBlur={() => setIsEditingContentTitle(false)}
          ref={contentTitleInputRef}
        />
      </div>
      <div
        className={cs(
          'flex flex-wrap items-center gap-2 p-2',
          'rounded-full bg-gray-400/20',
          'z-10',
        )}>
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
        <div
          style={{
            position: 'absolute',
            ...menuPosition,
          }}>
          <TransliteratorBox id={textEditorTrnasliterateKey} />
        </div>
      )}
      <EditorContent
        editor={editor}
        onBeforeInput={handleBeforeInput}
        onKeyDown={handleKeyDown}
        className={cs(
          'h-full w-full max-w-full overflow-hidden rounded-lg border border-neutral-600 bg-neutral-200 p-4 dark:bg-neutral-800',
        )}
      />
    </div>
  );
};
