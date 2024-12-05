import type { ShortenLink, StatisticsLink } from "./types"

/**
 * Check if the URL received is a valid URL or it throws an error
 * to notify that the URL passed is not valid.
 *
 * @param url  link to be verified
 * @returns {true} whether the URL is valid
 */
export const checkValidUrl = (url: string): boolean => {
    return new RegExp("^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$", "i").test(
        url,
    )
}

/**
 * Paints a message with a red color in the output terminal
 * using ANSI escape codes.
 *
 * @param str The message to be printed in red
 * @returns The colored message as a string
 */
export const errorColor = (str: string) => {
    return `\x1b[31m${str}\x1b[0m`
}

/**
 * Transform the structure of an object received from the API
 * and map it to a new object with the values.
 *
 * @param from The response received from the API.
 * @param to The structure expected to be transformed.
 * @returns An object of type 'to' with the values received from the API.
 */
export const mappingResponse = <From extends Record<string, any>, To extends Record<string, any>>(from: From, to: To): To => {
    return Object.keys(from).reduce((previous, key) => {
        const entryKey = underscoreToUppercase(key)
        if (entryKey in to) {
            const isObject = typeof from[key] === "object" && from[key]
            return {
                ...previous,
                [entryKey]: isObject ? mappingResponse(from[key], to[entryKey]) : from[key],
            }
        }
        return previous
    }, {} as To)
}

/**
 * Receives a string with underscores and changes the next character to uppercase.
 *
 * @param str The string to be transformed to UpperCamelCase.
 * @returns The transformed string.
 */
const underscoreToUppercase = (str: string): string => {
    return str
        .split("_")
        .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
        .join("")
}

/**
 * Object used to initialize the mapping object.
 */
export const statisticsLinkInit: StatisticsLink = {
    clicks: 0,
    uniqueClicks: 0,
    data: {
        createdAt: "",
        longUrl: "",
        shortUrl: "",
        description: "",
    },
}

/**
 * Removes properties with empty values from an object to clean it up. It verifies if
 * the values are:
 *  - an empty string
 *  - null
 *  - undefined
 *  - an empty array
 *  - an empty object
 *
 * @param entry An object to clean up by removing empty properties.
 * @returns The cleaned object.
 */
export const removeEmptyProperties = <T extends Record<string, any>>(entry: T) => {
    for (const key in entry) {
        const pairValue = entry[key]
        const isArray = Array.isArray(pairValue)
        const isObject = pairValue && typeof pairValue === "object" && !isArray
        if (!pairValue || pairValue === "" || (isArray && !pairValue.length) || (isObject && !Object.keys(pairValue).length)) {
            delete entry[key]
        }
    }
    return entry
}

/**
 * Checks if the domain name is valid.
 *
 * @param domain - The domain name to be verified.
 * @returns true if the domain name is valid, false otherwise.
 */
export const checkValidDomain = (domain: string): boolean => {
    return new RegExp("^([a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,}$").test(domain)
}

/**
 * Checks if a sequence of characters is a number.
 *
 * @param sequence - The sequence of characters to be verified.
 * @returns true if the sequence is a number, false otherwise.
 */
export const isNumber = (sequence: string): boolean => {
    return new RegExp("^[0-9]+$").test(sequence)
}

/**
 * Checks if a sequence of characters is alphanumeric.
 *
 * @param sequence - The sequence of characters to be verified.
 * @returns true if the sequence is alphanumeric, false otherwise.
 */
export const isAlphabetNumeric = (sequence: string): boolean => {
    return new RegExp("^[A-Za-z0-9-_]{1,}$").test(sequence)
}

export const shortenLinkInit: ShortenLink = {
    domain: "",
    createdAt: "",
    description: "",
    longUrl: "",
    shortId: "",
    shortUrl: "",
    updtedAt: "",
}
