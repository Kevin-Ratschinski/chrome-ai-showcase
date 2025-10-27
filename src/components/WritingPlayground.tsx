import { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import TextArea from "./ui/TextArea";
import { writeText, rewriteText } from "../features/writing/api";
import { useToast } from "./ui/Toast";

export default function WritingPlayground() {
  const [input, setInput] = useState("Please send a friendly email to support.");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"writer" | "rewriter">("writer");
  const { notify } = useToast();

  async function runWriting() {
    try {
      notify("Start Generation...");
      setOutput(mode === "writer" ? await writeText(input) : await rewriteText(input));
    } catch (e) {
      console.error(e);
      notify("Error during generation.");
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 text-sm">
        <button
          className={`px-3 py-1 rounded border ${
            mode === "writer" ? "bg-white text-slate-900" : "bg-slate-900 text-white"
          }`}
          onClick={() => setMode("writer")}
        >
          Writer
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            mode === "rewriter" ? "bg-white text-slate-900" : "bg-slate-900 text-white"
          }`}
          onClick={() => setMode("rewriter")}
        >
          Rewriter
        </button>
      </div>
      <TextArea value={input} onChange={(e) => setInput(e.target.value)} />
      <Button onClick={runWriting}>Generate</Button>
      <Card title="Output">
        <pre className="whitespace-pre-wrap text-sm">{output || "—"}</pre>
      </Card>
    </div>
  );
}
