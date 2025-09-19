import { useState } from "react";
import { promptOnce, promptStream } from "../features/text/api";
import CopyButton from "./helpers/CopyButton";
import Counter from "./helpers/Counter";
import Button from "./ui/Button";
import Card from "./ui/Card";
import TextArea from "./ui/TextArea";
import { useToast } from "./ui/Toast";

const MAX = 4000;

export default function TextPlayground() {
  const [prompt, setPrompt] = useState("Write a Haiku");
  const [result, setResult] = useState("");
  const [streaming, setStreaming] = useState(false);
  const { notify } = useToast();

  async function runBatch() {
    if (prompt.length > MAX) return notify("Prompt too long!");
    setStreaming(false);
    setResult("");
    try {
      notify("Start Generation...");
      setResult(await promptOnce(prompt));
    } catch (e) {
      console.error(e);
      notify("Error during generation.");
    }
  }
  async function runStreaming() {
    if (prompt.length > MAX) return notify("Prompt too long!");
    setStreaming(true);
    setResult("");
    try {
      notify("Start Generation...");
      for await (const chunk of promptStream(prompt)) {
        setResult((s) => s + chunk);
      }
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="space-y-3">
      <TextArea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <Counter value={prompt} max={MAX} />
      <div className="flex gap-2">
        <Button onClick={runBatch}>Generate</Button>
        <Button variant="secondary" onClick={runStreaming}>
          Streaming
        </Button>
        <CopyButton text={result} />
      </div>
      <Card title="Result">
        <pre className="whitespace-pre-wrap text-sm">{result || "—"}</pre>
        {streaming && <div className="text-xs text-slate-500 mt-2">Streaming…</div>}
      </Card>
    </div>
  );
}
