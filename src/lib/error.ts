export type AppError = {
  status: number;
  code: string;
  userMessage: string;
  debug?: unknown;
};

export function toAppError(err: unknown, fallback: string): AppError {
  if (err && typeof err === "object" && "name" in err && "message" in err) {
    const e = err as Error;
    return { status: 500, code: e.name ?? "Error", userMessage: fallback, debug: e.message };
  }
  return { status: 500, code: "UnknownError", userMessage: fallback, debug: err };
}
