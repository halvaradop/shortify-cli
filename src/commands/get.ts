import { CLIOptions } from "../types"
import { getShortURL } from "../request"
import { isAlphabetNumeric } from "../utils"

/**
 * Get  the information about a short link
 * @param {CLIOptions} options - The options to be used in the command
 */
export const getCommand = async (options: CLIOptions) => {
    if (!isAlphabetNumeric(options.sid) || !options.sid) {
        return console.error("Invalid short ID, verify the structure of the link")
    }
    console.log(await getShortURL(options.sid))
}
