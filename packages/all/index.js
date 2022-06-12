const stylelintCSS = require("@condorhero/stylelint-config-css");

module.exports = {
  extends: [
    "@condorhero/stylelint-config-css",
    "@condorhero/stylelint-config-jss",
    "@condorhero/stylelint-config-scss",
    "@condorhero/stylelint-config-less",
  ],
  ignoreFiles: [
    ...stylelintCSS.ignoreFiles,
  ],
};
