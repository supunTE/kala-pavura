import { DisplayLanguage } from './ui';

type NextFont = {
  className: string;
  style: {
    fontFamily: string;
    fontWeight?: number;
    fontStyle?: string;
  };
};

type FontStyle = {
  primaryFont: NextFont;
  secondaryFont: NextFont;
};

export type LanguageFonts = Record<DisplayLanguage, FontStyle>;
