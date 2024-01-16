import { DisplayLanguage } from '@kala-pavura/models';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export interface UIStore {
  displayLanguage: DisplayLanguage;
}

export const useUIStore = create(
  devtools<UIStore>((set, get) => ({
    displayLanguage: DisplayLanguage.Sinhala,
    setDisplayLanguage: (language: DisplayLanguage) => {
      set({ displayLanguage: language });
    },
    switchDisplayLanguage: (language: DisplayLanguage) => {
      const currentLanguage = get().displayLanguage;
      if (currentLanguage !== language) {
        set({ displayLanguage: language });
      }
    },
  })),
);
