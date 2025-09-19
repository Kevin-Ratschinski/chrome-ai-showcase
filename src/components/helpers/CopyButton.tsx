import Button from "../../components/ui/Button";
import { useToast } from "../ui/Toast";

export default function CopyButton({ text }: { text: string }) {
  const { notify } = useToast();

  return (
    <Button
      variant="ghost"
      onClick={() => {
        navigator.clipboard.writeText(text);
        notify("Copied to clipboard!");
      }}
    >
      Copy
    </Button>
  );
}
