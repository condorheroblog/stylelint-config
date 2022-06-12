import { readFileSync } from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../../";

const config = { ...basicConfig, ignoreFiles: [] };
const validMarkdownPath = join(__dirname, "./valid.md");
const invalidMarkdownPath = join(__dirname, "./invalid.md");
const validMarkdown = readFileSync(validMarkdownPath, "utf-8");
const invalidMarkdown = readFileSync(invalidMarkdownPath, "utf-8");

describe("flags no warnings in Markdown with valid css", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: validMarkdownPath,
    });
  });

  test("did not error", () => {
    return result.then(data => expect(data.errored).toBeFalsy());
  });

  test("flags no warnings", () => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(0));
  });
});

describe("flags warnings in Markdown with invalid css", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      config,
      files: invalidMarkdownPath,
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
    return result.then(data => expect(data.results[0].warnings[0].line).toBe(4));
  });

  test("correct column number", () => {
    return result.then(data => expect(data.results[0].warnings[0].column).toBe(33));
  });
});

describe("markdown pieces to be tested", () => {
  test("markdown.html", () => {
    return expect(validMarkdown).toMatchSnapshot();
  });

  test("markdown.html", () => {
    return expect(invalidMarkdown).toMatchSnapshot();
  });
});
