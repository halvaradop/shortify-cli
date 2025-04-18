import { updateURL } from "../request.js"
import { isExpiry, isAlphabetNumeric } from "../utils.js"
import { info, error } from "./logger.js"
import type { CLIOptions } from "../types.js"

/**
 * Update a short link
 *
 * @param {CLIOptions} options - The options to be used in the command
 */
export const updateCommand = async (options: CLIOptions) => {
    if (!isAlphabetNumeric(options.sid)) {
        error("Invalid short ID. Please verify the structure of the link and try again.")
        return
    }
    if (!isExpiry(options.expiry)) {
        error("Invalid expiry date. Please use a valid format (e.g., '7d', '1m', 'never').")
        return
    }
    const { sid, expiry } = options
    info(await updateURL({ sid, expiry }))
}
