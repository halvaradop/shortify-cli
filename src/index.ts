#! /usr/bin/env node

import "dotenv/config"
import { Command } from "commander"
import { shortenerURL, getShortURL, deleteURL, updateURL } from "./request"
import type { CLIOptions } from "./types"
import { checkExpiry, checkValidURL, errorColor, isAlphabetNumeric } from "./utils"

/**
 * Declare and initialize the program
 */
const program = new Command()

// prettier-ignore
program
    .name("shortify")
    .description("Shorten your favorite URL using the CLI.")
    .version("0.0.1")
    .usage("<url> [options]")

/**
 * Configuration of CLI options and arguments
 */
program
    .argument("<url>", "URL to shorten")
    .option("-e, --expiry <expiry>", "set an expiry date for the link", "never")
    .action(async (url: string, options: CLIOptions) => {
        if (!checkValidURL(url)) {
            program.error("Invalid URL, verify the structure of the link")
        }
        const isValidExpiry = checkExpiry(options.expiry)
        console.log(shortenerURL({ url, expiry: isValidExpiry ? options.expiry : "never" }))
    })

/**
 * Get  the information about a short link
 */
program
    .command("get")
    .description("Get all the information about a short link")
    .option("-s, --sid <sid>", "The short ID of the URL")
    .action(async (options: CLIOptions) => {
        if (!isAlphabetNumeric(options.sid)) {
            program.error("Invalid short ID, verify the structure of the link")
        }
        console.log(getShortURL(options.sid))
    })

/**
 * Delete a short link
 */
program
    .command("delete")
    .description("Delete the current link")
    .option("-s, --sid <SID>", "The short ID of the URL")
    .action(async (options: CLIOptions) => {
        if (!isAlphabetNumeric(options.sid)) {
            program.error("Invalid short ID, verify the structure of the link")
        }
        console.log(deleteURL(options.sid))
    })

/**
 * Update a short link
 */
program
    .command("update")
    .description("Update the current link")
    .option("-s, --sid <sid>", "The short ID of the URL")
    .option("-e, --expiry <expiry>", "set an expiry date for the link", "never")
    .action(async (options: CLIOptions) => {
        if (!isAlphabetNumeric(options.sid)) {
            program.error("Invalid short ID, verify the structure of the link")
        }
        const isValidExpiry = checkExpiry(options.expiry)
        console.log(updateURL({ sid: options.sid, expiry: isValidExpiry ? options.expiry : "never" }))
    })

/**
 * Show help after an error
 */
program.showHelpAfterError(errorColor("You can execute (shortify --help) for additional information")).configureOutput({
    writeErr: (error: string) => {
        process.stdout.write(`${errorColor("[ERROR]:")} ${error}`)
    },
    outputError: (str, write) => {
        write(errorColor(str))
    },
})

/**
 * Parse the command line arguments
 */
program.parseAsync(process.argv)
