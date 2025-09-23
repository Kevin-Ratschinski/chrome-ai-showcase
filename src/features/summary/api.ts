import { createSummarizer } from "../../lib/chromeAI/adapters/summarizer";
export async function summarize(text: string, options: SummarizerCreateOptions) {
  const summarizer = await createSummarizer(options);
  return summarizer.summarize(text);
}
