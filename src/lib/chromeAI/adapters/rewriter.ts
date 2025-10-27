import { log } from "../../logger";
import { isMockTest, streamFromString } from "../../util";

export type RewriterAdapter = {
  kind: "real" | "mock";
  rewrite(input: string, options?: RewriterRewriteOptions): Promise<string>;
  rewriteStreaming(
    input: string,
    options?: RewriterRewriteOptions,
  ): AsyncIterable<string>;
};

export async function getRewriterAdapter(
  options?: RewriterCreateOptions,
): Promise<RewriterAdapter> {
  if (Rewriter && !isMockTest()) {
    try {
      const available = await Rewriter.availability();
      if (available !== "unavailable") {
        const rw = await Rewriter.create(options);
        return {
          kind: "real",
          async rewrite(input, options) {
            return await rw.rewrite(input, options);
          },
          async *rewriteStreaming(input, options) {
            const stream = rw.rewriteStreaming(input, options);
            // @ts-expect-error stream
            for await (const chunk of stream) {
              yield String(chunk);
            }
          },
        };
      }
    } catch {
      log("Error get rewriter adapter");
    }
  }

  // MOCK
  return {
    kind: "mock",
    async rewrite(text) {
      return `MOCK: ${text.slice(0, 160)} …`;
    },
    async *rewriteStreaming(text) {
      yield* streamFromString(`MOCK(stream): ${text}`);
    },
  };
}
