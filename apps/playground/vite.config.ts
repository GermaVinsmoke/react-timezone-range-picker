import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-timezone-range-picker": path.resolve(
        __dirname,
        "../../packages/ui/src"
      ),
    },
  },
  server: { port: 5173 },
});
