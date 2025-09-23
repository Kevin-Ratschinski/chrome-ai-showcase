import { log } from "../../logger";
import { isMockTest, streamFromString } from "../../util";

type StreamChunk = string;
type SummarizerAdapter = {
  kind: "real" | "mock";
  summarize(text: string, options?: SummarizerCreateOptions): Promise<string>;
  summarizeStreaming(text: string, options?: SummarizerCreateOptions): AsyncIterable<StreamChunk>;
};

export async function getSummarizerAdapter(options: SummarizerCreateOptions): Promise<SummarizerAdapter> {
  if (Summarizer && !isMockTest()) {
    try {
      const availability = await Summarizer.availability();
      if (availability !== "unavailable") {
        const summarizer = await Summarizer.create(options);
        return {
          kind: "real",
          summarize: (text: string) => summarizer.summarize(text, options),
          async *summarizeStreaming(text, options) {
            const stream = summarizer.summarizeStreaming(text, options);
            // @ts-expect-error stream
            for await (const chunk of stream) {
              yield String(chunk);
            }
          },
        };
      }
    } catch {
      log("Error creating summarizer");
    }
  }
  return {
    kind: "mock",
    summarize: async (text: string) => `• ${text.split(/\s+/).slice(0, 12).join(" ")}…\n• (${text.length} Characters)`,
    summarizeStreaming: async function* (text: string) {
      yield* streamFromString(`• MOCK: ${text.slice(0, 80)}…`);
    },
  };
}
