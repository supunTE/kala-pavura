import { singlishToUnicode } from 'sinhala-unicode-coverter';

export class TransliterateText {
  private static textsToTransliterate: Map<string, string> = new Map();

  public static storeTransliteratedText(id: string, text: string) {
    const existingText = this.textsToTransliterate.get(id);
    if (existingText) {
      text = existingText + text;
      this.textsToTransliterate.set(id, text);
    } else this.textsToTransliterate.set(id, text);
  }

  public static getTransliteratedText(id: string) {
    const text = this.textsToTransliterate.get(id);
    if (!text) return;
    return singlishToUnicode(text);
  }

  public static backspaceTransliteratedText(id: string) {
    const text = this.textsToTransliterate.get(id);
    if (!text) return;
    const newText = text.slice(0, -1);
    if (newText === '') return this.textsToTransliterate.delete(id);
    this.textsToTransliterate.set(id, newText);
  }

  public static isThereTextToTransliterate(id: string) {
    return this.textsToTransliterate.has(id);
  }

  public static getNonTransliteratedText(id: string) {
    return this.textsToTransliterate.get(id);
  }

  public static removeAndGetTransliteratedText(id: string) {
    const text = this.textsToTransliterate.get(id);
    this.textsToTransliterate.delete(id);
    if (!text) return;
    return singlishToUnicode(text);
  }
}
