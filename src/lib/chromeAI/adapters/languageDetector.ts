import { log } from "../../logger";
import { isMockTest } from "../../util";

type LanguageDetectorAdapter = {
  kind: "real" | "mock";
  detect(text: string): Promise<LanguageDetectionResult[]>;
};

export async function getLanguageDetectorAdapter(options?: LanguageDetectorCreateOptions): Promise<LanguageDetectorAdapter> {
  if (LanguageDetector && !isMockTest()) {
    try {
      const availability = await LanguageDetector.availability(options);
      if (availability !== "unavailable") {
        const detector = await LanguageDetector.create(options);
        return {
          kind: "real",
          detect: (text: string) => detector.detect(text),
        };
      }
    } catch {
      log("Error creating language detector");
    }
  }
  return {
    kind: "mock",
    detect: async (text: string) => {
      return [{ detectedLanguage: /[äöüß]/i.test(text) ? "de" : "en", confidence: 0.8 }];
    },
  };
}
