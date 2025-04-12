import type { CLIOptions } from "../types.js"
import { getShortURL } from "../request.js"
import { isAlphabetNumeric } from "../utils.js"
import { info, error } from "./logger.js"

/**
 * Get  the information about a short link
 *
 * @param {CLIOptions} options - The options to be used in the command
 */
export const getCommand = async (options: Pick<CLIOptions, "sid">) => {
    if (!isAlphabetNumeric(options.sid) || !options.sid) {
        error("Invalid short ID, verify the structure of the link")
        return
    }
    info(await getShortURL(options.sid))
}
