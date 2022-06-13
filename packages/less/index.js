const stylelintCSS = require("@condorhero/stylelint-config-css");

module.exports = {
  extends: ["@condorhero/stylelint-config-css", "stylelint-config-recommended-less"],
  overrides: [
    {
      files: ["**/*.less"],
      customSyntax: "postcss-less",
    },
  ],
  ignoreFiles: [
    ...stylelintCSS.ignoreFiles,
  ],
};
