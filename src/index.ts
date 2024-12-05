#! /usr/bin/env node

import "dotenv/config"
import { Command } from "commander"
import { getStats, removeUrl, shortenerUrl } from "./request"
import type { CLIOptions } from "./types"
import { checkValidDomain, checkValidUrl, errorColor, isAlphabetNumeric, isNumber } from "./utils"

/**
 * Declare and initialize the program
 */
const program = new Command()

// prettier-ignore
program
	.name("shortify")
	.description("Shorten your favorite URL using the CLI.")
	.version("0.0.1")
	.usage("<source-url> [options]")

/**
 * Configuration of CLI options and arguments
 */
program
    .argument("<source-url>", "URL to shorten")
    .option("-s, --stats", "show the statistics for a URL")
    .option("-u, --update", "update the current link")
    .option("-r, --remove", "remove the current link")
    .option("-d, --domain <domain>", "specify a custom domain")
    .option("-v, --views", "show the views of a short link")
    .option("-l, --long", "show the long version of a link")
    .option("-c, --create", "create a shortened link", true)
    .option("-i, --short-id <short-id>", "specify a custom identifier for the link")
    .option("--desc <description>", "add a description associated with the link")
    .option("--expire-views <views>", "set a limit on the number of views before the link expires")
    .action(async (source: string, options: CLIOptions) => {
        if (!checkValidUrl(source)) {
            program.error("Invalid URL, verify the structure of the link")
        }
        if (options.create && !options.stats) {
            if (options.domain && !checkValidDomain(options.domain)) {
                program.error("Invalid domain. Verify the structure of the link")
            }
            if (options.expireViews && !isNumber(options.expireViews)) {
                program.error("Invalid expire views argument. The input must be a number.")
            }
            if (options.shortId && !isAlphabetNumeric(options.shortId)) {
                program.error("Invalid short ID. Verify the structure of the short ID.")
            }
            const shortened = await shortenerUrl(source, {
                domain: options.domain,
                short_id: options.shortId,
                description: options.description,
                expire_at_views: parseInt(options.expireViews),
            })
            console.log(shortened)
        }
        if (options.stats) {
            const statistics = await getStats(source)
            console.log(statistics)
        } else if (options.remove) {
            const remove = await removeUrl(source)
            console.log(remove)
        }
    })
    .showHelpAfterError(errorColor("You can execute (shortify --help) for additional information"))
    .configureOutput({
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
