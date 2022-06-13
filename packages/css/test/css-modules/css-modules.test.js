import { readFileSync } from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../..";
const config = { ...basicConfig, ignoreFiles: [] };

const cssModuleContent = readFileSync(join(__dirname, "./css-modules.css"), "utf-8");

describe("css-modules flags no warnings", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      code: cssModuleContent,
      config,
    });
  });

  test("css-modules did not error", () => {
    return result.then(data => expect(data.errored).toBeFalsy());
  });

  test("css-modules flags no warnings", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(0));
  });
});

describe("css-modules pieces to be tested", () => {
  test("css.module.css", () => {
    return expect(cssModuleContent).toMatchSnapshot();
  });
});
