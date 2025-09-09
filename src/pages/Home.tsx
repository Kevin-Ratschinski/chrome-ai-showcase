import { Card } from "../components/ui/Card";
import { useAppStore } from "../state/store";

interface Items {
  id: string;
  label: string;
  disabled: boolean;
  children: React.ReactNode;
}

export default function Home() {
  const availability = useAppStore((state) => state.availability);

  const items: Items[] = [
    { id: "text", label: "Text (Prompt API)", disabled: availability.languageModel === "unavailable", children: undefined },
    { id: "summary", label: "Summarizer", disabled: availability.summarizer === "unavailable", children: undefined },
    { id: "translate", label: "Übersetzung", disabled: availability.translator === "unavailable", children: undefined },
    { id: "vision", label: "Vision", disabled: availability.languageModel === "unavailable", children: undefined },
    {
      id: "writing",
      label: "Writer/Rewriter",
      disabled: availability.writer === "unavailable" && availability.rewriter === "unavailable",
      children: undefined,
    },
  ];

  return (
    <Card title="Chrome AI Showcase">
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        {availability.mockMode && (
          <span className="inline-block mr-2 px-2 py-1 text-xs rounded bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-200">
            MOCK MODE active (no built-in AI available)
          </span>
        )}
        Availability: LM: {availability.languageModel}, Summarizer: {availability.summarizer}, Translator: {availability.translator}, Language Detector:{" "}
        {availability.languageDetector}, Writer: {availability.writer}, Rewriter: {availability.rewriter}
      </p>
    </Card>
  );
}
