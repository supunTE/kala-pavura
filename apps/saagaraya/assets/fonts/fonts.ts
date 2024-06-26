import {
  Gemunu_Libre,
  Noto_Sans_Sinhala,
  Noto_Serif_Sinhala,
  Poppins,
  Source_Serif_4,
  Yaldevi,
} from 'next/font/google';

import { DisplayLanguage, LanguageFonts } from '@kala-pavura/models';

export const noto_serif_sinhala = Noto_Serif_Sinhala({
  subsets: ['sinhala'],
  display: 'swap',
  weight: ['200', '400', '700'],
});

export const noto_sans_sinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  display: 'swap',
  weight: ['400', '600'],
});

export const yaldevi = Yaldevi({
  subsets: ['sinhala'],
  display: 'swap',
  weight: ['400', '700'],
});

export const gemunu_libre = Gemunu_Libre({
  subsets: ['sinhala'],
  display: 'swap',
  weight: ['400', '700'],
});

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
});

export const source_serif4 = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export const languageFonts: LanguageFonts = {
  [DisplayLanguage.Sinhala]: {
    primaryFont: noto_sans_sinhala,
    secondaryFont: noto_serif_sinhala,
  },
  [DisplayLanguage.English]: {
    primaryFont: poppins,
    secondaryFont: source_serif4,
  },
  [DisplayLanguage.Tamil]: {
    primaryFont: poppins,
    secondaryFont: source_serif4,
  },
};
