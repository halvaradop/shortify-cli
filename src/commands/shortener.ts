import type { CLIOptions } from "../types.js"
import { shortenerURL } from "../request.js"
import { checkExpiry, checkValidURL } from "../utils.js"
import { info, error } from "./logger.js"

/**
 * Shorten a URL
 *
 * @param {string} url - The URL to be shortened
 * @param {CLIOptions} options - The options to be used in the command
 */
export const shortenerCommand = async (url: string, options: Pick<CLIOptions, "expiry">) => {
    if (!checkValidURL(url)) {
        error("Invalid URL, verify the structure of the link")
        return
    }
    if (!checkExpiry(options.expiry)) {
        error("Invalid expiry date, verify the structure of the date")
        return
    }
    const { expiry } = options
    info(await shortenerURL({ url, expiry }))
}
