module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  overrides: [
    {
      files: ["*.html", "**/*.html", "*.htm", "**/*.htm", "*.xml", "**/*.xml"],
      customSyntax: "postcss-html",
    },
    {
      files: ["*.md", "**/*.md"],
      customSyntax: "postcss-markdown",
    },
  ],
  ignoreFiles: [
    // https://github.com/stylelint/stylelint/blob/2015d0d74d/lib/standalone.js#L23
    // "**/node_modules/**",
    "**/__tests__/**",
    "**/test/**",
    "**/.history/**",
    "**/.husky/**",
    "**/*.min.*/**",
    "**/CHANGELOG.md/**",
    "**/dist/**",
    "**/LICENSE/**/",
    "**/output/**",
    "**/coverage/**",
    "**/public/**",
    "**/temp/**",
    "**/packages-lock.json/**",
    "**/pnpm-lock.yaml/**",
    "**/yarn.lock/**",
    "**/__snapshots__/**",
    "**/vite.config.ts/**",
    "**/jest.config.ts/**",
    "**/*.yaml",
    "**/*.yml",
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
    "**/*.json",
  ],

};
