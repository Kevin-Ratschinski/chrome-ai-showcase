import { log } from "../../logger";

export type PromptChunk = string;
export type PromptAdapter = {
  kind: "real" | "mock";
  prompt(text: LanguageModelPrompt, options?: LanguageModelPromptOptions): Promise<string>;
  // TODO: implement streaming
  // promptStreaming(text: LanguageModelPrompt, options?: LanguageModelPromptOptions): ReadableStream<string>;
};

export async function getPromptAdapter(): Promise<PromptAdapter> {
  if (LanguageModel)
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
            if (options) return await lm.prompt(text, options);
            return await lm.prompt(text);
          },
        };
      }
    } catch {
      log("Error get prompt adapter");
    }
  // MOCK
  return {
    kind: "mock",
    async prompt(text) {
      return `MOCK: ${text.slice(0, 160)} …`;
    },
  };
}
