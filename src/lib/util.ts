export const cn = (...cls: (string | false | undefined | null)[]) => cls.filter(Boolean).join(" ");

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function* streamFromString(text: string, delay = 20) {
  for (const ch of text) {
    await sleep(delay);
    yield ch;
  }
}

export function isMockTest(): boolean {
  return String(import.meta.env.VITE_MOCK_TEST) === "true";
}
