const stylelintCSS = require("@condorhero/stylelint-config-css");

module.exports = {
  extends: ["@condorhero/stylelint-config-css", "stylelint-config-recommended-vue"],
  ignoreFiles: [
    ...stylelintCSS.ignoreFiles,
  ],
};
