import type { AvailabilityState } from "../../state/store";

async function mapAvailability<T extends { availability: () => Promise<string> }>(ctor: T | undefined): Promise<"available" | "downloadable" | "unavailable"> {
  try {
    if (!ctor) return "unavailable";
    const status = await ctor.availability();
    return status === "available" || status === "downloadable" ? status : "unavailable";
  } catch {
    return "unavailable";
  }
}

function mapTranslatorAvailability(source: string, target: string) {
  return mapAvailability({
    availability: () => Translator.availability({ sourceLanguage: source, targetLanguage: target }),
  });
}

export async function detectAllCapabilities(): Promise<AvailabilityState> {
  const [lm, summ, tr, ld, writer, rewriter] = await Promise.all([
    mapAvailability(LanguageModel),
    mapAvailability(Summarizer),
    mapTranslatorAvailability("en", "de"),
    mapAvailability(LanguageDetector),
    mapAvailability(Writer),
    mapAvailability(Rewriter),
  ]);

  const mockMode = [lm, summ, tr, ld, writer, rewriter].every((s) => s === "unavailable");
  return { languageModel: lm, summarizer: summ, translator: tr, languageDetector: ld, writer, rewriter, mockMode };
}
