import { create } from "zustand";

type Availability = "available" | "unavailable" | "downloadable";

export type AvailabilityState = {
  languageModel: Availability;
  summarizer: Availability;
  translator: Availability;
  languageDetector: Availability;
  writer: Availability;
  rewriter: Availability;
  mockMode: boolean;
};

export type AppState = {
  availability: AvailabilityState;
  setAvailability: (availability: AvailabilityState) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  locale: "en" | "de";
  setLocale: (locale: "en" | "de") => void;
};

export const useAppStore = create<AppState>((set) => ({
  availability: {
    languageModel: "unavailable",
    summarizer: "unavailable",
    translator: "unavailable",
    languageDetector: "unavailable",
    writer: "unavailable",
    rewriter: "unavailable",
    mockMode: true,
  },
  setAvailability: (a) => set({ availability: a }),
  theme: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
  locale: "en",
  setLocale: (l) => set({ locale: l }),
}));
