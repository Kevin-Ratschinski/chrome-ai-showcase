import { getPromptAdapter } from "../../lib/chromeAI/adapters/prompt";

export async function promptOnce(text: string, options?: LanguageModelPromptOptions) {
  const adapter = await getPromptAdapter();
  return adapter.prompt(text, options);
}
