import { describe, expect, test } from "vitest"
import { isValidURL, isNumber, isAlphabetNumeric, isExpiry } from "../src/utils"

describe("Check valid expression regulars", () => {
    describe("Check a URL", () => {
        const testCases = [
            {
                input: "https://www.google.com",
                expected: true,
            },
            {
                input: "http://www.google.com",
                expected: true,
            },
            {
                input: "https://google.com",
                expected: true,
            },
            {
                input: "https://google.com",
                expected: true,
            },
            {
                input: "https://google.com/test",
                expected: true,
            },
            {
                input: "https://google.com/test?query=1",
                expected: true,
            },
            {
                input: "https://google.com/test#hash",
                expected: true,
            },
            {
                input: "ftp://google.com",
                expected: false,
            },
            {
                input: "https://google",
                expected: false,
            },
            {
                input: "google.com",
                expected: false,
            },
            {
                input: "http://",
                expected: false,
            },
            {
                input: "https://",
                expected: false,
            },
        ]
        testCases.forEach(({ input, expected }) => {
            test(`should return ${expected} for ${input}`, () => {
                expect(isValidURL(input)).toBe(expected)
            })
        })
    })

    describe("Check a number", () => {
        const testCases = [
            {
                input: "1234567890",
                expected: true,
            },
            {
                input: "1234567890a",
                expected: false,
            },
            {
                input: "1234567890.5",
                expected: false,
            },
            {
                input: "1234567890-",
                expected: false,
            },
        ]
        testCases.forEach(({ input, expected }) => {
            test(`should return ${expected} for ${input}`, () => {
                expect(isNumber(input)).toBe(expected)
            })
        })
    })

    describe("Check an alphanumeric", () => {
        const testCases = [
            {
                input: "1234567890",
                expected: true,
            },
            {
                input: "1234567890a",
                expected: true,
            },
            {
                input: "1234567890.5",
                expected: false,
            },
            {
                input: "1234567890-",
                expected: false,
            },
        ]
        testCases.forEach(({ input, expected }) => {
            test(`should return ${expected} for ${input}`, () => {
                expect(isAlphabetNumeric(input)).toBe(expected)
            })
        })
    })

    describe("Check an expiry", () => {
        const testCases = [
            {
                input: "1d",
                expected: true,
            },
            {
                input: "1h",
                expected: true,
            },
            {
                input: "1d1h",
                expected: false,
            },
            {
                input: "1d1h1m",
                expected: false,
            },
            {
                input: "1d1h1m1s",
                expected: false,
            },
        ]
        testCases.forEach(({ input, expected }) => {
            test(`should return ${expected} for ${input}`, () => {
                expect(isExpiry(input)).toBe(expected)
            })
        })
    })
})
