import Button from "../../components/ui/Button";

export default function CopyButton({ text }: { text: string }) {
  // TODO: notify
  return (
    <Button
      variant="ghost"
      onClick={() => {
        navigator.clipboard.writeText(text);
        //notify("Copied to clipboard!");
      }}
    >
      Copy
    </Button>
  );
}
