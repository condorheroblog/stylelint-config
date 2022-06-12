const stylelintCSS = require("@condorhero/stylelint-config-css");

module.exports = {
  extends: ["@condorhero/stylelint-config-css", "stylelint-config-standard-scss"],
  // overrides: [
  //   {
  //     files: ["**/*.scss", "**/*.sass"],
  //     customSyntax: "postcss-scss",
  //   },
  // ],
  ignoreFiles: [
    ...stylelintCSS.ignoreFiles,
  ],
};
