import { readFileSync } from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../..";

const config = { ...basicConfig, ignoreFiles: [] };
const validateLessPath = join(__dirname, "./index.less");
const validateLess = readFileSync(validateLessPath, "utf-8");

describe("validate LESS", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: validateLessPath,
      configBasedir: __dirname,
    });
  });

  test("did not error", () => {
    return result.then(data => expect(data.errored).toBeFalsy());
  });

  test("flags no warnings", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(0));
  });
});

describe("LESS pieces to be tested", () => {
  test("index.less", () => {
    return expect(validateLess).toMatchSnapshot();
  });
});
