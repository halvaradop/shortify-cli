import { OutputConfiguration } from "commander"
import { colors } from "./commands/logger.js"

/**
 * Check if the URL received is a valid URL or it throws an error
 * to notify that the URL passed is not valid.
 *
 * @param {string} url  link to be verified
 * @returns {boolean} whether the URL is valid
 */
export const checkValidURL = (url: string): boolean => {
    return new RegExp("^(https?:\\/\\/)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$", "i").test(
        url,
    )
}

/**
 * Checks if the domain name is valid.
 *
 * @param {string} domain - The domain name to be verified.
 * @returns {boolean} true if the domain name is valid, false otherwise.
 */
export const checkValidDomain = (domain: string): boolean => {
    return new RegExp("^([a-z0-9]+(-[a-z0-9]+)*.)+[a-z]{2,}$").test(domain)
}

/**
 * Checks if a sequence of characters is a number.
 *
 * @param {string} sequence - The sequence of characters to be verified.
 * @returns {boolean} true if the sequence is a number, false otherwise.
 */
export const isNumber = (sequence: string): boolean => {
    return new RegExp("^[0-9]+$").test(sequence)
}

/**
 * Checks if a sequence of characters is alphanumeric.
 *
 * @param {string} sequence - The sequence of characters to be verified.
 * @returns {boolean} true if the sequence is alphanumeric, false otherwise.
 */
export const isAlphabetNumeric = (sequence: string): boolean => {
    return new RegExp("^[A-Za-z0-9]+$").test(sequence)
}

/**
 * Checks if the expiry is valid.
 *
 * @param {string} expiry - The expiry to be verified.
 * @returns {boolean} true if the expiry is valid, false otherwise.
 */
export const checkExpiry = (expiry: string): boolean => {
    return new RegExp("^([0-9]+[dh])$").test(expiry)
}

export const configureOutput: OutputConfiguration = {
    writeErr: (error: string) => {
        process.stdout.write(`${colors.red} [ERROR]: ${error}`)
    },
    outputError: (str, write) => {
        write(`${colors.red}${str}`)
    },
}
