#! /usr/bin/env node

import "dotenv/config"
import { Command } from "commander"
import { configureOutput, errorColor } from "./utils"
import { shortenerCommand, getCommand, deleteCommand, updateCommand } from "./commands/index"

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
    .action(shortenerCommand)

/**
 * Get  the information about a short link
 */
program
    .command("get")
    .description("Get all the information about a short link")
    .option("-s, --sid <sid>", "The short ID of the URL")
    .action(getCommand)

/**
 * Delete a short link
 */
program
    .command("delete")
    .description("Delete the current link")
    .option("-s, --sid <SID>", "The short ID of the URL")
    .action(deleteCommand)

/**
 * Update a short link
 */
program
    .command("update")
    .description("Update the current link")
    .option("-s, --sid <sid>", "The short ID of the URL")
    .option("-e, --expiry <expiry>", "set an expiry date for the link", "never")
    .action(updateCommand)

/**
 * Show help after an error
 */
program
    .showHelpAfterError(errorColor("You can execute (shortify --help) for additional information"))
    .configureOutput(configureOutput)

/**
 * Parse the command line arguments
 */
program.parseAsync(process.argv)
