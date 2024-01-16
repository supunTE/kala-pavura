import { DisplayLanguage } from '@kala-pavura/models';

import { languageFonts } from '@/assets/fonts';

import { useUIStore } from '../services/store';

export function useFont(forceLanguage?: DisplayLanguage) {
  const displayLanguage = useUIStore((state) => state.displayLanguage);
  const language = forceLanguage || displayLanguage;
  const { primaryFont, secondaryFont } = languageFonts[language];
  return { primaryFont, secondaryFont };
}
