import { log } from "../lib/logger";
import { useAppStore } from "../state/store";

export default function Home() {
  const availability = useAppStore((state) => state.availability);
  log(availability);
  return <h1>Home</h1>;
}
