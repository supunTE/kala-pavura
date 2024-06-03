import { DisplayLanguage, NextFont } from '@kala-pavura/models';

import {
  gemunu_libre,
  noto_sans_sinhala,
  noto_serif_sinhala,
  yaldevi,
} from '@/assets/fonts';

export enum EditorFontKeys {
  NotoSansSinhala = 'noto_sans_sinhala',
  NotoSerifSinhala = 'noto_serif_sinhala',
  Yaldevi = 'yaldevi',
  GemunuLibre = 'gemunu_libre',
}

type EditorFontData = {
  language: DisplayLanguage;
  font: NextFont;
  displayName: string;
};

export type EditorFont = Record<EditorFontKeys, EditorFontData>;

export const editorFonts: EditorFont = {
  [EditorFontKeys.NotoSansSinhala]: {
    language: DisplayLanguage.Sinhala,
    font: noto_sans_sinhala,
    displayName: 'නොටෝ සෑන්ස්',
  },
  [EditorFontKeys.NotoSerifSinhala]: {
    language: DisplayLanguage.Sinhala,
    font: noto_serif_sinhala,
    displayName: 'නොටෝ සෙරිෆ්',
  },
  [EditorFontKeys.Yaldevi]: {
    language: DisplayLanguage.Sinhala,
    font: yaldevi,
    displayName: 'යාල්දේවි',
  },
  [EditorFontKeys.GemunuLibre]: {
    language: DisplayLanguage.Sinhala,
    font: gemunu_libre,
    displayName: 'ගැමුණු ලිබ්රේ',
  },
};

export const editorFontsArray = Object.entries(editorFonts);
