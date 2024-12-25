import { CLIOptions } from "../types"
import { shortenerURL } from "../request"
import { checkExpiry, checkValidURL } from "../utils"

/**
 * Shorten a URL
 * @param {string} url - The URL to be shortened
 * @param {CLIOptions} options - The options to be used in the command
 */
export const shortenerCommand = async (url: string, options: CLIOptions) => {
    if (!checkValidURL(url)) {
        return console.error("Invalid URL, verify the structure of the link")
    }
    if (!checkExpiry(options.expiry)) {
        return console.error("Invalid expiry date, verify the structure of the date")
    }
    const { expiry } = options
    console.log(await shortenerURL({ url, expiry }))
}
