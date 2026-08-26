import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactTimezoneRangePicker",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "cjs"],
      cssFileName: "style",
    },
    rollupOptions: {
      // dependencies that shouldn’t be bundled
      external: [
        "react",
        "react-dom",
        "@mantine/core",
        "@mantine/dates",
        "@mantine/form",
        "@mantine/hooks",
      ],
    },
    cssCodeSplit: false, // combine all CSS into a single file
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
  },
});
