import type { CLIOptions } from "../types.js"
import { updateURL } from "../request.js"
import { checkExpiry, isAlphabetNumeric } from "../utils.js"
import { info, error } from "./logger.js"

/**
 * Update a short link
 *
 * @param {CLIOptions} options - The options to be used in the command
 */
export const updateCommand = async (options: CLIOptions) => {
    if (!isAlphabetNumeric(options.sid)) {
        error("Invalid short ID, verify the structure of the link")
        return
    }
    if (!checkExpiry(options.expiry)) {
        error("Invalid expiry date, verify the structure of the date")
        return
    }
    const { sid, expiry } = options
    info(await updateURL({ sid, expiry }))
}
