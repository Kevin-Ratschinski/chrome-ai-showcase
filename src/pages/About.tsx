import Card from "../components/ui/Card";

export default function About() {
  return (
    <Card title="About Chrome AI Showcase">
      <div className="space-y-3 text-sm">
        <p>
          This demo showcases Chrome's built-in AI. The app checks availability, monitors model downloads, supports streaming, and provides clear fallbacks.
        </p>
        <ul className="list-disc ml-6">
          <li>On-device, private – network only required for model download.</li>
          <li>If APIs are missing → mock adapters.</li>
          <li>Browser: Desktop Chrome 138+.</li>
        </ul>
        <p>Security: Do not enter any sensitive content.</p>
      </div>
    </Card>
  );
}
