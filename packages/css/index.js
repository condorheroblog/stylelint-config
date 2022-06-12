module.exports = {
  plugins: [
    "stylelint-selector-bem-pattern",
  ],
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
  rules: {
    "plugin/selector-bem-pattern": {
      preset: "bem",
      utilitySelectors: /^\.[util|u]-[a-z]+$/,
      ignoreSelectors: "\\b(svg|path)\\b",
    },
    "selector-class-pattern": [
      "^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$",
      {
        // TODO: custom formatters(https://stylelint.io/developer-guide/formatters/)
        // message(prop, value) {
        //   return "https://github.com/AndyOGo/stylelint-declaration-strict-value/issues/142";
        // },
      },
    ],
  },
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
