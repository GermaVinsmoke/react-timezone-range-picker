import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // DOM for React
    globals: true, // makes expect/it/describe global
    setupFiles: ["./src/test.setup.ts"],
  },
});
