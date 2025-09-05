import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/chrome-ai-showcase/",
  build: {
    outDir: "docs",
  },
  plugins: [react()],
});
