import { useState } from "react";
import TextArea from "./ui/TextArea";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { summarize } from "../features/summary/api";
import { useToast } from "./ui/Toast";

export default function SummaryPlayground() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const { notify } = useToast();

  async function runSummarize() {
    setResult("");
    try {
      notify("Start Generation...");
      setResult(await summarize(text, { type: "key-points", format: "markdown" }));
    } catch (e) {
      console.error(e);
      notify("Error during generation.");
    }
  }

  return (
    <div className="space-y-3">
      <TextArea value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex gap-2">
        <Button onClick={runSummarize}>Summarize Text</Button>
      </div>
      <Card title="Summary">
        <pre className="whitespace-pre-wrap text-sm">{result || "—"}</pre>
      </Card>
    </div>
  );
}
