import fs from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../../";
const config = { ...basicConfig, ignoreFiles: [] };

const validCss = fs.readFileSync(join(__dirname, "./valid.css"), "utf-8");
const invalidCss = fs.readFileSync(join(__dirname, "./invalid.css"), "utf-8");

describe("flags no warnings with valid css", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      code: validCss,
      config,
    });
  });

  test("did not error", () => {
    return result.then(data => expect(data.errored).toBeFalsy());
  });

  test("flags no warnings", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(0));
  });
});

describe("flags warnings with invalid css", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      code: invalidCss,
      config,
    });
  });

  test("did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("flags one warning", async() => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(11));
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
    return result.then(data => expect(data.results[0].warnings[0].line).toBe(1));
  });

  test("correct column number", () => {
    return result.then(data => expect(data.results[0].warnings[0].column).toBe(29));
  });
});
