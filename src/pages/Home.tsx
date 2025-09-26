import LanguageDetectionPlayground from "../components/LanguageDetectionPlayground";
import SummaryPlayground from "../components/SummaryPlayground";
import TextPlayground from "../components/TextPlayground";
import TranslationPlayground from "../components/TranslationPlayground";
import Card from "../components/ui/Card";
import type { Tab } from "../components/ui/Tabs";
import Tabs from "../components/ui/Tabs";
import { useAppStore } from "../state/store";

export default function Home() {
  const availability = useAppStore((state) => state.availability);

  const tabs: Tab[] = [
    { id: "text", label: "Prompt API", disabled: availability.languageModel === "unavailable", children: <TextPlayground /> },
    { id: "summary", label: "Summarizer", disabled: availability.summarizer === "unavailable", children: <SummaryPlayground /> },
    { id: "translate", label: "Translation", disabled: availability.translator === "unavailable", children: <TranslationPlayground /> },
    {
      id: "language-detection",
      label: "Language Detector",
      disabled: availability.languageDetector === "unavailable",
      children: <LanguageDetectionPlayground />,
    },
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
      <Tabs tabs={tabs} />
    </Card>
  );
}
