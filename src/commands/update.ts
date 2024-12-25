import { CLIOptions } from "../types"
import { updateURL } from "../request"
import { checkExpiry, isAlphabetNumeric } from "../utils"

/**
 * Update a short link
 * @param {CLIOptions} options - The options to be used in the command
 */
export const updateCommand = async (options: CLIOptions) => {
    if (!isAlphabetNumeric(options.sid)) {
        return console.error("Invalid short ID, verify the structure of the link")
    }
    if (!checkExpiry(options.expiry)) {
        return console.error("Invalid expiry date, verify the structure of the date")
    }
    const { sid, expiry } = options
    console.log(await updateURL({ sid, expiry }))
}
