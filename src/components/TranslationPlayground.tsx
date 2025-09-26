import { useState } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import TextArea from "./ui/TextArea";
import { useToast } from "./ui/Toast";
import { translate } from "../features/translate/api";

const languages = ["de", "en", "es", "fr", "it", "ja"];

export default function TranslationPlayground() {
  const [text, setText] = useState("Hello World");
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("de");
  const [result, setResult] = useState("");
  const { notify } = useToast();

  async function runTranslation() {
    setResult("");
    try {
      notify("Start Generation...");
      setResult(await translate(text, { sourceLanguage: source, targetLanguage: target }));
    } catch (e) {
      console.error(e);
      notify("Error during generation.");
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs">Source</label>
          <select className="w-full border rounded p-2 dark:bg-slate-900 dark:text-white" value={source} onChange={(e) => setSource(e.target.value)}>
            {languages.map((language) => (
              <option key={language}>{language}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs">Target</label>
          <select className="w-full border rounded p-2 dark:bg-slate-900 dark:text-white" value={target} onChange={(e) => setTarget(e.target.value)}>
            {languages.map((language) => (
              <option key={language}>{language}</option>
            ))}
          </select>
        </div>
      </div>
      <TextArea value={text} onChange={(e) => setText(e.target.value)} />
      <div className="flex gap-2">
        <Button onClick={runTranslation}>Translate</Button>
      </div>
      <Card title="Translation">
        <pre className="whitespace-pre-wrap text-sm">{result || "—"}</pre>
      </Card>
    </div>
  );
}
