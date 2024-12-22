import { CLIOptions } from "../types"
import { deleteURL } from "../request"
import { isAlphabetNumeric } from "../utils"

/**
 * Delete a short link
 * @param {CLIOptions} options - The options to be used in the command
 */
export const deleteCommand = async (options: CLIOptions) => {
    if (!isAlphabetNumeric(options.sid) || !options) {
        return console.error("Invalid short ID, verify the structure of the link")
    }
    console.log(deleteURL(options.sid))
}
