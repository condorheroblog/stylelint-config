import { readFileSync } from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../../";

const config = { ...basicConfig, ignoreFiles: [] };
const validHtmlPath = join(__dirname, "./valid.html");
const invalidHtmlPath = join(__dirname, "./invalid.html");
const validHtml = readFileSync(validHtmlPath, "utf-8");
const invalidHtml = readFileSync(invalidHtmlPath, "utf-8");

describe("flags no warnings in HTML with valid css", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: validHtmlPath,
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
      files: invalidHtmlPath,
    });
  });

  test("did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("flags 12 warning", async() => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(12));
  });

  test("correct warning text", () => {
    return result.then(data =>
      expect(data.results[0].warnings[0].text).toBe(
        "Expected \"width\" to come before \"color\" (order/properties-order)",
      ),
    );
  });

  test("correct rule flagged", () => {
    return result.then(data =>
      expect(data.results[0].warnings[0].rule).toBe("order/properties-order"),
    );
  });

  test("correct severity flagged", () => {
    return result.then(data => expect(data.results[0].warnings[0].severity).toBe("error"));
  });

  test("correct line number", () => {
    return result.then(data => expect(data.results[0].warnings[0].line).toBe(9));
  });

  test("correct column number", () => {
    return result.then(data => expect(data.results[0].warnings[0].column).toBe(37));
  });
});

describe("HTML pieces to be tested", () => {
  test("valid.html", () => {
    return expect(validHtml).toMatchSnapshot();
  });

  test("invalid.html", () => {
    return expect(invalidHtml).toMatchSnapshot();
  });
});
