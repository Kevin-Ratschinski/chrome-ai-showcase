import { getLanguageDetectorAdapter } from "../../lib/chromeAI/adapters/languageDetector";
import { getTranslatorAdapter } from "../../lib/chromeAI/adapters/translator";

export async function translate(text: string, options: TranslatorCreateCoreOptions, translateOptions?: TranslatorTranslateOptions) {
  const translator = await getTranslatorAdapter(options);
  return translator.translate(text, translateOptions);
}

export async function detect(text: string) {
  const detector = await getLanguageDetectorAdapter();
  return detector.detect(text);
}
