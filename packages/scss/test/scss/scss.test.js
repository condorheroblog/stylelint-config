import fs from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../..";
const config = { ...basicConfig, ignoreFiles: [] };

const validateScss = fs.readFileSync(join(__dirname, "./index.scss"), "utf-8");

describe("validate SCSS", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      code: validateScss,
      config,
      configBasedir: __dirname,
    });
  });

  test("did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("flags 2 warning", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(2));
  });

  test("correct warning text", () => {
    return result.then(data =>
      expect(data.results[0].warnings[0].text).toBe(
        "Expected variable to be kebab-case",
      ),
    );
  });

  test("correct rule flagged", () => {
    return result.then(data =>
      expect(data.results[0].warnings[0].rule).toBe("scss/dollar-variable-pattern"),
    );
  });

  test("correct severity flagged", () => {
    return result.then(data => expect(data.results[0].warnings[0].severity).toBe("error"));
  });

  test("correct line number", () => {
    return result.then(data => expect(data.results[0].warnings[0].line).toBe(3));
  });

  test("correct column number", () => {
    return result.then(data => expect(data.results[0].warnings[0].column).toBe(1));
  });
});

describe("SCSS pieces to be tested", () => {
  test("index.scss", () => {
    return expect(validateScss).toMatchSnapshot();
  });
});
