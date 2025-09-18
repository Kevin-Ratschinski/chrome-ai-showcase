import { useState } from "react";
import { promptOnce } from "../features/text/api";
import CopyButton from "./helpers/CopyButton";
import Counter from "./helpers/Counter";
import Button from "./ui/Button";
import Card from "./ui/Card";
import TextArea from "./ui/TextArea";

const MAX = 4000;

export default function TextPlayground() {
  const [prompt, setPrompt] = useState("Write a Haiku");
  const [result, setResult] = useState("");

  async function runBatch() {
    if (prompt.length > MAX) return; // TODO notify
    setResult("");
    try {
      setResult(await promptOnce(prompt));
    } catch (e) {
      console.error(e);
      // TODO notify
    }
  }

  return (
    <div className="space-y-3">
      <TextArea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <Counter value={prompt} max={MAX} />
      <div className="flex gap-2">
        <Button onClick={runBatch}>Generate</Button>
        {/* TODO: Stream Button */}
        <CopyButton text={result} />
      </div>
      <Card title="Result">
        <pre className="whitespace-pre-wrap text-sm">{result || "—"}</pre>
      </Card>
    </div>
  );
}
