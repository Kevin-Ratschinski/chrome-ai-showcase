import { log } from "../../logger";
import { isMockTest, streamFromString } from "../../util";

type StreamChunk = string;
type TranslatorAdapter = {
  kind: "real" | "mock";
  translate(text: string, options?: TranslatorTranslateOptions): Promise<string>;
  translateStreaming(text: string, options?: TranslatorTranslateOptions): AsyncIterable<StreamChunk>;
};

export async function getTranslatorAdapter(options: TranslatorCreateCoreOptions): Promise<TranslatorAdapter> {
  if (Translator && !isMockTest()) {
    try {
      const availability = await Translator.availability(options);
      if (availability !== "unavailable") {
        const translator = await Translator.create(options);
        return {
          kind: "real",
          translate: (text: string, translateOptions?: TranslatorTranslateOptions) => translator.translate(text, translateOptions),
          async *translateStreaming(text: string, translateOptions?: TranslatorTranslateOptions) {
            const stream = translator.translateStreaming(text, translateOptions);
            // @ts-expect-error stream
            for await (const chunk of stream) {
              yield String(chunk);
            }
          },
        };
      }
    } catch {
      log("Error creating translator");
    }
  }
  return {
    kind: "mock",
    translate: async (text: string) => `«${text}» [${options.sourceLanguage}→${options.targetLanguage} MOCK]`,
    translateStreaming: async function* (text: string) {
      yield* streamFromString(`«${text}» [MOCK ${options.sourceLanguage}→${options.targetLanguage}]`);
    },
  };
}
