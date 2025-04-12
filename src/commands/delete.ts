import type { CLIOptions } from "../types.js"
import { deleteURL } from "../request.js"
import { isAlphabetNumeric } from "../utils.js"
import { info, error } from "./logger.js"

/**
 * Delete a short link
 *
 * @param {CLIOptions} options - The options to be used in the command
 */
export const deleteCommand = async (options: Pick<CLIOptions, "sid">) => {
    if (!isAlphabetNumeric(options.sid) || !options) {
        error("Invalid short ID. Please verify the structure of the link and try again.")
        return
    }
    info(await deleteURL(options.sid))
}
