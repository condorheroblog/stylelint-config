import { readFileSync } from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../..";

const config = { ...basicConfig, ignoreFiles: [] };
const validJsxPath = join(__dirname, "./Valid.tsx");
const invalidJsxPath = join(__dirname, "./Invalid.tsx");
const validJsx = readFileSync(validJsxPath, "utf-8");
const invalidJsx = readFileSync(invalidJsxPath, "utf-8");

describe("flags no warnings in JSX with valid css", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: validJsxPath,
      // fix: Error: Could not find "@condorhero/stylelint-config-css". Do you need a `configBasedir`?
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

describe("flags warnings in HTML with invalid css", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: invalidJsxPath,
      // fix: Error: Could not find "@condorhero/stylelint-config-css". Do you need a `configBasedir`?
      configBasedir: __dirname,
    });
  });

  test("did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("flags 3 warning", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(3));
  });

  test("correct warning text", () => {
    return result.then(data =>
      expect(data.results[0].warnings[1].text).toBe(
        "Unexpected empty line (no-empty-first-line)",
      ),
    );
  });

  test("correct rule flagged", () => {
    return result.then(data =>
      expect(data.results[0].warnings[1].rule).toBe("no-empty-first-line"),
    );
  });

  test("correct severity flagged", () => {
    return result.then(data => expect(data.results[0].warnings[1].severity).toBe("error"));
  });

  test("correct line number", () => {
    return result.then(data => expect(data.results[0].warnings[1].line).toBe(3));
  });

  test("correct column number", () => {
    return result.then(data => expect(data.results[0].warnings[1].column).toBe(25));
  });
});

describe("jss pieces to be tested", () => {
  test("valid.tsx", () => {
    return expect(validJsx).toMatchSnapshot();
  });

  test("invalid.tsx", () => {
    return expect(invalidJsx).toMatchSnapshot();
  });
});
