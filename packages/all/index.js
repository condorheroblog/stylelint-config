const stylelintCSS = require("@condorhero/stylelint-config-css");

module.exports = {
  extends: [
    "@condorhero/stylelint-config-css",
    "@condorhero/stylelint-config-scss",
    "@condorhero/stylelint-config-jss",
    "@condorhero/stylelint-config-vue",
  ],
  ignoreFiles: [
    ...stylelintCSS.ignoreFiles,
  ],
};
