import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "Hello World",
        expected: ["hello", "world"]
    },
    {
        input: "   Leading and trailing spaces   ",
        expected: ["leading", "and", "trailing", "spaces"]
    },
    {
        input: "Mixed CASE Input",
        expected: ["mixed", "case", "input"]
    },
    {
        input: "Multiple   Spaces",
        expected: ["multiple", "spaces"]
    },
    {
        input: "",
        expected: [""]
    }
])("cleanInput", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        expect(cleanInput(input)).toEqual(expected);
        const actual = cleanInput(input);
        expect(actual).toEqual(expected);
        expect(actual.length).toBe(expected.length);
        for (const i in expected) {
            expect(actual[i]).toBe(expected[i]);
        }
    });
});