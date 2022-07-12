import fs from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../..";
const config = { ...basicConfig, ignoreFiles: [], customSyntax: "postcss-html" };

const invalidVue = fs.readFileSync(join(__dirname, "./invalid.vue"), "utf-8");

describe("validate Vue", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      code: invalidVue,
      config,
      configBasedir: __dirname,
    });
  });

  test("did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("flags 2 warning", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(5));
  });

  test("correct rule flagged", () => {
    return result.then(data =>
      expect(data.results[0].warnings[0].rule).toBe("selector-pseudo-class-no-unknown"),
    );
  });
});

describe("Vue pieces to be tested", () => {
  test("invalid.vue", () => {
    return expect(invalidVue).toMatchSnapshot();
  });
});
