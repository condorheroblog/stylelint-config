import fs from "node:fs";
import { join } from "node:path";
import stylelint from "stylelint";
import { beforeEach, describe, expect, test } from "vitest";

import basicConfig from "../../";

const config = { ...basicConfig, ignoreFiles: [] };
const validBem = fs.readFileSync(join(__dirname, "./validBem.css"), "utf-8");
const invalidBem = fs.readFileSync(join(__dirname, "./invalidBem.css"), "utf-8");

describe("flags no warnings with valid bem css", () => {
  let result;

  beforeEach(() => {
    result = stylelint.lint({
      code: validBem,
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
      code: invalidBem,
      config,
    });
  });

  test("did error", () => {
    return result.then(data => expect(data.errored).toBeTruthy());
  });

  test("flags 67 warning", async() => {
    return result.then(data => expect(data.results[0].warnings).toHaveLength(67));
  });

  test("correct warning text", () => {
    return result.then(data =>
      expect(data.results[0].warnings[0].text).toBe(
        "Invalid utility selector \".util-sizeFill\" (plugin/selector-bem-pattern)",
      ),
    );
  });

  test("correct rule flagged", () => {
    return result.then(data =>
      expect(data.results[0].warnings[0].rule).toBe("plugin/selector-bem-pattern"),
    );
  });
});

describe("BEM pieces to be tested", () => {
  test("valid.css", () => {
    return expect(validBem).toMatchSnapshot();
  });

  test("invalid.css", () => {
    return expect(invalidBem).toMatchSnapshot();
  });
});
