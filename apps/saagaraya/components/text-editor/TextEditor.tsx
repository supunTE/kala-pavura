'use client';

import { forwardRef, useCallback, useMemo } from 'react';
import { ColorPicker, Group, HoverCard } from '@mantine/core';
import { Palette } from '@phosphor-icons/react';
import { Color } from '@tiptap/extension-color';
import { Heading } from '@tiptap/extension-heading';
import { TextAlign } from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { EditorContent, mergeAttributes, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import cs from 'classnames';

import { TextEditorControls } from '@/components/text-editor/elements/toolbar-buttton-groups';

import {
  ColorPickerButtonProps,
  ToolBarActionButtonProps,
  ToolBarButtonGroupProps,
  ToolBarCoreButtonGroupProps,
  ToolBarCoreButtonProps,
} from './models';

export const TextEditor = () => {
  const editor = useEditor({
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
    ],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class: 'outline-none h-full overflow-auto p-4',
      },
    },
  });

  const editorControls = useMemo(() => {
    if (!editor) return null;
    return new TextEditorControls(editor);
  }, [editor]);

  const handleColorPick = useCallback(
    (value: string) => {
      editor?.chain().focus().setColor(value).run();
    },
    [editor],
  );

  if (!editor) return null;

  return (
    <div className={cs('flex flex-col h-screen')}>
      <div className={cs('flex gap-2 p-2 m-6', 'bg-gray-400/20 rounded-full')}>
        <ToolBarButtonGroup
          toolBarButtons={editorControls?.textFormattingButtons || []}
          editor={editor}
        />
        <ToolBarButtonGroup
          toolBarButtons={editorControls?.textAlignmentButtons || []}
          editor={editor}
        />
        <ToolBarButtonGroup
          toolBarButtons={editorControls?.textHeadingButtons || []}
          editor={editor}
        />
        <ColorPickerButton onPick={handleColorPick} />
      </div>
      <EditorContent
        editor={editor}
        className="h-full overflow-none bg-neutral-200 dark:bg-neutral-800"
      />
    </div>
  );
};

const ToolBarCoreButtonGroup = ({ children }: ToolBarCoreButtonGroupProps) => {
  return (
    <span
      className={cs(
        'inline-flex gap-2 p-2',
        'border border-gray-200/20',
        'rounded-full',
      )}>
      {children}
    </span>
  );
};

const ToolBarButtonGroup = ({
  toolBarButtons,
  editor,
}: ToolBarButtonGroupProps) => {
  return (
    <ToolBarCoreButtonGroup>
      {toolBarButtons.map((toolBarButton, index) => (
        <ToolBarActionButton key={index} editor={editor} {...toolBarButton} />
      ))}
    </ToolBarCoreButtonGroup>
  );
};

const ToolBarCoreButton = forwardRef<HTMLDivElement, ToolBarCoreButtonProps>(
  (props, ref) => {
    // HoverCard.Target will inject few other props to the element
    const { icon, onClick, isSelected, className, ...rest } = props;
    const Icon = icon;

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cs(
          'p-2 rounded-full hover:bg-white hover:text-neutral-900',
          'transition-colors duration-200',
          {
            'bg-gray-100/20': isSelected,
          },
          className,
        )}
        {...rest}>
        {<Icon size={16} />}
      </div>
    );
  },
);

ToolBarCoreButton.displayName = 'ToolBarCoreButton';

const ToolBarActionButton = ({
  icon,
  onClick,
  action,
  editor,
}: ToolBarActionButtonProps) => {
  let isActionActive = false;
  if (action.name)
    isActionActive = editor.isActive(action.name, action.attributes);
  else if (action.attributes)
    isActionActive = editor.isActive(action.attributes);

  return (
    <ToolBarCoreButton
      onClick={onClick}
      icon={icon}
      isSelected={isActionActive}
    />
  );
};

const ColorPickerButton = ({ onPick }: ColorPickerButtonProps) => {
  return (
    <Group justify="center">
      <HoverCard
        shadow="md"
        styles={{
          dropdown: {
            borderRadius: '20px',
          },
        }}>
        <HoverCard.Target>
          <ToolBarCoreButton icon={Palette} />
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <ColorPicker
            format="hex"
            size="xs"
            onChange={onPick}
            withPicker={false}
            swatches={[
              '#ffffff', // TODO: implement colors for light mode.
              '#868e96',
              '#fa5252',
              '#e64980',
              '#be4bdb',
              '#7950f2',
              '#4c6ef5',
              '#228be6',
              '#15aabf',
              '#12b886',
              '#40c057',
              '#82c91e',
              '#fab005',
              '#fd7e14',
            ]}
          />
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
};
