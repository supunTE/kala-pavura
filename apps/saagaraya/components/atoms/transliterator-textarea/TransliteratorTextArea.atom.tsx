'use client';

import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Textarea, TextareaProps } from '@mantine/core';
import { X } from '@phosphor-icons/react';
import cs from 'classnames';
import { nanoid } from 'nanoid';

import { DisplayLanguage } from '@kala-pavura/models';

import { useFontStatic } from '@/modules/hooks';
import { TransliterateText } from '@/modules/utils';

type TransliteratorTextAreaProps = TextareaProps & {
  enableTransliteration: boolean;
};

export function TransliteratorTextArea({
  enableTransliteration,
  placeholder,
  error,
  onChange,
  ...props
}: TransliteratorTextAreaProps) {
  const { primaryFont: primarySinhalaFont } = useFontStatic(
    DisplayLanguage.Sinhala,
  );

  const [localEnable, setLocalEnable] = useState(enableTransliteration);

  const id = useMemo(() => nanoid(), []);
  const [transliteratedText, setTransliteratedText] = useState('');
  const [textToTransliterate, setTextToTransliterate] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    return () => {
      console.log('unmounting');
      TransliterateText.removeTransliteratedText(id);
    };
  }, []);

  const handleKeyDown = (e: any) => {
    if (!localEnable) return;

    const isThereTextToTransliterate =
      TransliterateText.isThereTextToTransliterate(id);

    const selectionStart = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;

    console.log('key', e.key, selectionStart, selectionEnd);
    switch (e.key) {
      case 'Backspace': {
        console.log('backspace', isThereTextToTransliterate);
        if (selectionStart !== selectionEnd) {
          // If some text is selected, remove the selected text
          const newText =
            text.slice(0, selectionStart) + text.slice(selectionEnd);
          setText(newText);
          mockGlobalOnChangeEvent(newText, e);
        } else if (isThereTextToTransliterate) {
          TransliterateText.backspaceTransliteratedText(id);
        } else {
          setText((prev) => {
            const text =
              prev.slice(0, selectionStart - 1) +
              prev.slice(selectionStart, prev.length);
            mockGlobalOnChangeEvent(text, e);
            return text;
          });
          setTimeout(() => {
            e.target.setSelectionRange(selectionStart - 1, selectionStart - 1);
          }, 0);
        }
        break;
      }
      case 'Enter':
      case 'Tab':
      case ' ': {
        if (e.key == '') {
          console.log('space');
        }
        const value = TransliterateText.removeAndGetTransliteratedText(id);
        if (!value) return;
        setText((prev) => {
          const text = prev + value;
          mockGlobalOnChangeEvent(text, e);
          return text;
        });
        break;
      }
    }

    setTransliteratedText(TransliterateText.getTransliteratedText(id) ?? '');
    setTextToTransliterate(
      TransliterateText.getNonTransliteratedText(id) ?? '',
    );
  };

  const handleChange = (e: any) => {
    if (!localEnable) {
      console.log('not enabled', e.target.value);
      setText(e.target.value);
      return mockGlobalOnChangeEvent(e.target.value, e);
    }

    const totalLength = text.length + transliteratedText.length;
    if (props.maxLength && totalLength >= props.maxLength) return;

    const value = e.nativeEvent.data;
    console.log('value', value);
    if (value) {
      if (value === ' ') {
        setText((prev) => {
          const text = prev + ' ';
          mockGlobalOnChangeEvent(text, e);
          return text;
        });
      } else {
        TransliterateText.storeTransliteratedText(id, value);
      }
    }

    setTransliteratedText(TransliterateText.getTransliteratedText(id) ?? '');
    setTextToTransliterate(
      TransliterateText.getNonTransliteratedText(id) ?? '',
    );
  };

  const mockGlobalOnChangeEvent = (
    text: string,
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!onChange) return;

    const mockEvent = {
      ...e,
      target: {
        ...e.target,
        value: text,
      },
    };
    onChange(mockEvent);
  };

  const totalLength = text.length + transliteratedText.length;

  return (
    <div className="flex w-full flex-col overflow-hidden">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 bottom-2 z-20 flex w-full items-center px-[0.75rem] text-sm">
          {textToTransliterate && (
            <span className="text-sm text-neutral-500">
              {textToTransliterate}
            </span>
          )}
        </div>
        <Textarea
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={text}
          {...props}
          radius="none"
          placeholder={textToTransliterate ? '' : placeholder}
          classNames={{
            input: 'rounded-t-md',
          }}
        />
      </div>
      <div className="flex justify-between rounded-b-md bg-white px-2 py-1 dark:bg-neutral-600">
        <span className="flex flex-col text-neutral-800 dark:text-neutral-200">
          <span className="flex flex-row-reverse items-center gap-1 text-sm">
            {props.maxLength && totalLength >= props.maxLength && (
              <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white dark:bg-red-600">
                උපරිම
              </span>
            )}
            {transliteratedText}
          </span>
        </span>

        <span
          className={cs(
            'flex cursor-pointer select-none items-center text-xs',
            {
              'text-blue-700 dark:text-blue-200': localEnable,
              'text-neutral-500 dark:text-neutral-300': !localEnable,
            },
          )}
          onClick={() => setLocalEnable((prev) => !prev)}>
          {!localEnable && (
            <X
              size={16}
              weight="bold"
              className="text-red-700 dark:text-red-400"
            />
          )}
          A➤
          <span className={cs(primarySinhalaFont.className, 'text-sm')}>අ</span>
        </span>
      </div>

      {error && <div className="mt-2 text-xs text-red-500">{error}</div>}
    </div>
  );
}
