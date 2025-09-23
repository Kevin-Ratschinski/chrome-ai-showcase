import { log } from "../../logger";
import { isMockTest, streamFromString } from "../../util";

export type PromptChunk = string;
export type PromptAdapter = {
  kind: "real" | "mock";
  prompt(text: LanguageModelPrompt, options?: LanguageModelPromptOptions): Promise<string>;
  promptStreaming(text: LanguageModelPrompt, options?: LanguageModelPromptOptions): AsyncIterable<PromptChunk>;
};

export async function getPromptAdapter(): Promise<PromptAdapter> {
  if (LanguageModel && !isMockTest()) {
    try {
      const available = await LanguageModel.availability();
      if (available !== "unavailable") {
        const lm = await LanguageModel.create({
          expectedOutputs: [
            {
              type: "text",
              languages: ["en"],
            },
          ],
        });
        return {
          kind: "real",
          async prompt(text, options) {
            return await lm.prompt(text, options);
          },
          async *promptStreaming(text, options) {
            const stream = lm.promptStreaming(text, options);
            // @ts-expect-error stream
            for await (const chunk of stream) {
              yield String(chunk);
            }
          },
        };
      }
    } catch {
      log("Error get prompt adapter");
    }
  }

  // MOCK
  return {
    kind: "mock",
    async prompt(text) {
      return `MOCK: ${text.slice(0, 160)} …`;
    },
    async *promptStreaming(text) {
      yield* streamFromString(`MOCK(stream): ${text}`);
    },
  };
}
