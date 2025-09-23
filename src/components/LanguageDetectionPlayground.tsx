import { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import TextArea from "./ui/TextArea";
import { useToast } from "./ui/Toast";
import { detect } from "../features/translate/api";

export default function LanguageDetectionPlayground() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<LanguageDetectionResult[]>([]);
  const { notify } = useToast();

  async function runDetection() {
    setResult([]);
    try {
      notify("Start Generation...");
      setResult(await detect(text));
    } catch (e) {
      console.error(e);
      notify("Error during generation.");
    }
  }

  return (
    <div className="space-y-3">
      <TextArea value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex gap-2">
        <Button onClick={runDetection}>Detect Languages</Button>
      </div>
      <Card title="Detected Languages">
        <ul className="list-decimal ml-6 text-sm">
          {result.length > 0 ? (
            result.map(({ detectedLanguage, confidence }) => (
              <li key={detectedLanguage}>
                <span className="font-mono">{detectedLanguage}</span>: {((confidence || 0) * 100).toFixed(1)}% confidence
              </li>
            ))
          ) : (
            <li>—</li>
          )}
        </ul>
      </Card>
    </div>
  );
}
