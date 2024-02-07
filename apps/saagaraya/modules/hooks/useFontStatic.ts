import { DisplayLanguage } from '@kala-pavura/models';

import { languageFonts } from '@/assets/fonts';

export function useFontStatic(language: DisplayLanguage) {
  const { primaryFont, secondaryFont, styleFont1 } = languageFonts[language];
  return { primaryFont, secondaryFont, styleFont1 };
}
