import { getSummarizerAdapter } from "../../lib/chromeAI/adapters/summarizer";
export async function summarize(text: string, options: SummarizerCreateOptions) {
  const summarizer = await getSummarizerAdapter(options);
  return summarizer.summarize(text);
}
