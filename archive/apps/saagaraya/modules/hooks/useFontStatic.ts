import { DisplayLanguage } from '@kala-pavura/models';

import { languageFonts } from '@/assets/fonts';

export function useFontStatic(language: DisplayLanguage) {
  const { primaryFont, secondaryFont } = languageFonts[language];
  return { primaryFont, secondaryFont };
}
