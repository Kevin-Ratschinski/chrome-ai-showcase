import { getWriterAdapter } from "../../lib/chromeAI/adapters/writer";
import { getRewriterAdapter } from "../../lib/chromeAI/adapters/rewriter";

export async function writeText(input: string) {
  const writer = await getWriterAdapter();
  return writer.write(input);
}

export async function rewriteText(input: string) {
  const rewriter = await getRewriterAdapter();
  return rewriter.rewrite(input);
}
