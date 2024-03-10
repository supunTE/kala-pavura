import { FormEvent } from 'react';
import { Editor } from '@tiptap/react';

import {
  defaultMenuPosition,
  EditorContentPosition,
} from '@/components/text-editor/models';
import { TransliterateText } from '@/modules/utils';

export type BeforeInputEvent = FormEvent<HTMLDivElement> & {
  data: undefined | string;
};

type transliterateHandlersBeforeInputParams = {
  editor: Editor;
  setMenuPosition: (position: EditorContentPosition) => void;
};

export function transliterateHandlersBeforeInput(
  e: BeforeInputEvent,
  key: string,
  { editor, setMenuPosition }: transliterateHandlersBeforeInputParams,
) {
  switch (e.data) {
    case ' ': {
      const transliteratedText =
        TransliterateText.removeAndGetTransliteratedText(key);
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
      if (e.data) TransliterateText.storeTransliteratedText(key, e.data);

      const pos = editor.view.coordsAtPos(editor.state.selection.head);
      setMenuPosition({
        top: pos.top + window.scrollY,
        left: pos.left + window.scrollX,
        display: 'block',
      });
      break;
    }
  }
}

export function transliterateHandlersOnKeyDown(
  e: any,
  key: string,
  { editor, setMenuPosition }: transliterateHandlersBeforeInputParams,
) {
  switch (e.key) {
    case 'Backspace': {
      const isThereTextToTransliterate =
        TransliterateText.isThereTextToTransliterate(key);
      if (!isThereTextToTransliterate) return;
      e.preventDefault();
      TransliterateText.backspaceTransliteratedText(key);
      break;
    }
    case 'Enter': {
      e.preventDefault();

      const transliteratedText =
        TransliterateText.removeAndGetTransliteratedText(key);
      const transaction = editor.state.tr.insertText(
        transliteratedText ? transliteratedText : '',
      );
      editor.view.dispatch(transaction);
      setMenuPosition(defaultMenuPosition);
      break;
    }
    case 'Escape': {
      setMenuPosition(defaultMenuPosition);
      TransliterateText.removeAndGetTransliteratedText(key);
      break;
    }
    default: {
      break;
    }
  }
}
