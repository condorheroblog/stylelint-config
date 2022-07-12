import { readFileSync } from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../";

const config = { ...basicConfig, ignoreFiles: [] };
const validateCssPath = join(__dirname, "./index.css");
const validateScssPath = join(__dirname, "./index.scss");
const validateJssPath = join(__dirname, "./index.tsx");
const validateVuePath = join(__dirname, "./index.vue");
const validateCss = readFileSync(validateCssPath, "utf-8");
const validateScss = readFileSync(validateScssPath, "utf-8");
const validateJss = readFileSync(validateJssPath, "utf-8");

describe("validate CSS", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: validateCssPath,
      configBasedir: __dirname,
    });
  });

  test("CSS did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("CSS had 3 warning", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(1));
  });
});

describe("validate SCSS", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: validateScssPath,
      configBasedir: __dirname,
    });
  });

  test("SCSS did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("SCSS had 1 warning", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(1));
  });

  test("SCSS rule flagged", () => {
    return result.then(data =>
      expect(data.results[0].warnings[0].rule).toBe(
        "scss/dollar-variable-colon-space-after",
      ),
    );
  });
});

describe("validate css-in-js", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: validateJssPath,
      configBasedir: __dirname,
    });
  });

  test("css-in-js did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("css-in-js had 1 warning", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(1));
  });
});

describe("validate vue", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: validateVuePath,
      configBasedir: __dirname,
    });
  });

  test("vue did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("vue had 1 warning", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(2));
  });
});

describe("validate file snapshot", () => {
  test("index.css", () => {
    return expect(validateCss).toMatchSnapshot();
  });

  test("index.scss", () => {
    return expect(validateScss).toMatchSnapshot();
  });

  test("index.tsx", () => {
    return expect(validateJss).toMatchSnapshot();
  });

  test("index.vue", () => {
    return expect(validateVuePath).toMatchSnapshot();
  });
});
