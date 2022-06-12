const stylelintCSS = require("@condorhero/stylelint-config-css");

module.exports = {
  extends: ["@condorhero/stylelint-config-css"],
  // auto merge extends overrides
  overrides: [
    {
      files: ["**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.js"],
      customSyntax: "@stylelint/postcss-css-in-js",
    },
  ],
  ignoreFiles: [
    ...stylelintCSS.ignoreFiles,
    // ignoreFiles > overrides files
    "!**/*.js",
    "!**/*.jsx",
    "!**/*.tsx",
    "!**/*.ts",
  ],
};
