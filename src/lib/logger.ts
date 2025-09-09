const DEV = import.meta.env.DEV;

export function log(...args: unknown[]) {
  if (DEV) console.log("[AI]", ...args);
}

export function metric(name: string, value: number, extra?: Record<string, unknown>) {
  if (DEV) console.log("[METRIC]", name, value, extra ?? {});
}
