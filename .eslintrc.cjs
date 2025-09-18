module.exports = {
  root: true,
  ignorePatterns: ["**/dist/**", "**/node_modules/**"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-refresh"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parserOptions: {
        // If you later enable type-aware rules, add:
        // project: ["./packages/*/tsconfig.json"],
        // tsconfigRootDir: __dirname,
      },
    },
  ],
};
