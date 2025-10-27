import { log } from "../../logger";
import { isMockTest, streamFromString } from "../../util";

export type WriterAdapter = {
  kind: "real" | "mock";
  write(input: string, options?: WriterWriteOptions): Promise<string>;
  writeStreaming(
    input: string,
    options?: WriterWriteOptions,
  ): AsyncIterable<string>;
};

export async function getWriterAdapter(
  options?: WriterCreateOptions,
): Promise<WriterAdapter> {
  if (Writer && !isMockTest()) {
    try {
      const available = await Writer.availability();
      if (available !== "unavailable") {
        const writer = await Writer.create(options);
        return {
          kind: "real",
          async write(input, options) {
            return await writer.write(input, options);
          },
          async *writeStreaming(input, options) {
            const stream = writer.writeStreaming(input, options);
            // @ts-expect-error stream
            for await (const chunk of stream) {
              yield String(chunk);
            }
          },
        };
      }
    } catch {
      log("Error get writer adapter");
    }
  }

  // MOCK
  return {
    kind: "mock",
    async write(text) {
      return `MOCK: ${text.slice(0, 160)} …`;
    },
    async *writeStreaming(text) {
      yield* streamFromString(`MOCK(stream): ${text}`);
    },
  };
}
