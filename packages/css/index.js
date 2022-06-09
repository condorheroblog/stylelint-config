module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  overrides: [
    {
      files: ["*.html", "**/*.html", "*.htm", "**/*.htm"],
      customSyntax: "postcss-html",
    },
    {
      files: ["*.md", "**/*.md"],
      customSyntax: "postcss-markdown",
    },
  ],
  ignoreFiles: [
    "node_modules",
    "vite.config.ts",
    "jest.config.ts",
    ".history",
    ".husky",
    ".vscode",
    "coverage",
    "dist",
    "*.min.*",
    "output",
    "public",
    "temp",
    "__snapshots__",
    "__tests__",
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
  ],

};
