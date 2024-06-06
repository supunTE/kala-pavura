import { TransliterateText } from './transliterate-text';

jest.mock('sinhala-unicode-coverter', () => ({
  singlishToUnicode: jest.fn((text) => `unicode_${text}`),
}));

describe('TransliterateText', () => {
  beforeEach(() => {
    // Clear all stored transliterated texts before each test
    TransliterateText['textsToTransliterate'].clear();
  });

  it('should store and append transliterated text correctly', () => {
    TransliterateText.storeTransliteratedText('1', 'Hello');
    expect(TransliterateText.getNonTransliteratedText('1')).toBe('Hello');

    TransliterateText.storeTransliteratedText('1', ' World');
    expect(TransliterateText.getNonTransliteratedText('1')).toBe('Hello World');

    TransliterateText.storeTransliteratedText('1', '!');
    expect(TransliterateText.getNonTransliteratedText('1')).toBe(
      'Hello World!',
    );
  });

  it('should return the transliterated text correctly', () => {
    TransliterateText.storeTransliteratedText('1', 'Hello');
    expect(TransliterateText.getTransliteratedText('1')).toBe('unicode_Hello');
  });

  it('should backspace the transliterated text correctly', () => {
    TransliterateText.storeTransliteratedText('1', 'Hello');
    TransliterateText.backspaceTransliteratedText('1');
    expect(TransliterateText.getNonTransliteratedText('1')).toBe('Hell');

    TransliterateText.backspaceTransliteratedText('1');
    TransliterateText.backspaceTransliteratedText('1');
    TransliterateText.backspaceTransliteratedText('1');
    TransliterateText.backspaceTransliteratedText('1');
    expect(TransliterateText.getNonTransliteratedText('1')).toBeUndefined();
  });

  it('should check if there is text to transliterate', () => {
    expect(TransliterateText.isThereTextToTransliterate('1')).toBe(false);

    TransliterateText.storeTransliteratedText('1', 'Hello');
    expect(TransliterateText.isThereTextToTransliterate('1')).toBe(true);
  });

  it('should remove and get transliterated text correctly', () => {
    TransliterateText.storeTransliteratedText('1', 'Hello');
    expect(TransliterateText.removeAndGetTransliteratedText('1')).toBe(
      'unicode_Hello',
    );
    expect(TransliterateText.getNonTransliteratedText('1')).toBeUndefined();
  });

  it('should remove transliterated text correctly', () => {
    TransliterateText.storeTransliteratedText('1', 'Hello');
    TransliterateText.removeTransliteratedText('1');
    expect(TransliterateText.getNonTransliteratedText('1')).toBeUndefined();
  });
});
