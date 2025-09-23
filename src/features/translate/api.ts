import { getLanguageDetectorAdapter } from "../../lib/chromeAI/adapters/languageDetector";

export async function detect(text: string) {
  const detector = await getLanguageDetectorAdapter();
  return detector.detect(text);
}
