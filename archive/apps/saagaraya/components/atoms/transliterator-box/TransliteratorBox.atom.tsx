'use client';

import { TransliterateText } from '@/modules/utils';

type TransliteratorBoxProps = {
  id: string;
};

export function TransliteratorBox({ id }: TransliteratorBoxProps) {
  const transliteratedText = TransliterateText.getTransliteratedText(id);
  const textToTransliterate = TransliterateText.getNonTransliteratedText(id);

  if (!transliteratedText) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <span className="text-neutral-800/60 dark:text-white/40">
        {textToTransliterate}
      </span>
      <span className="text-curious-blue-200 rounded-md bg-neutral-700 px-6 py-1">
        {transliteratedText}
      </span>
    </div>
  );
}
