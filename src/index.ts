#! /usr/bin/env node

import "dotenv/config"
import { Command } from "commander"
import { configureOutput, errorColor } from "./utils.js"
import { shortenerCommand, getCommand, deleteCommand, updateCommand, loggerCommand, configCommand } from "./commands/index.js"

/**
 * Declare and initialize the program
 */
const program = new Command()

// prettier-ignore
program
    .name("shortify")
    .description("Shorten your favorite URL using the CLI.")
    .version("0.1.0")
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
 * Show the current logger level
 */
program
    .command("logger")
    .description("Show the current logger level")
    .option("-c, --config", "Show the current logger level")
    .option("-r, --reset", "Reset the current logger level")
    .option("--colors", "Show the current logger level with colors")
    .option("--info <color>", "Set the info color logger")
    .option("--warn <color>", "Set the warn color logger")
    .option("--error [color]", "Set the error color logger")
    .action(loggerCommand)

/**
 * Show the current configuration
 */
program
    .command("config")
    .description("Show the current configuration")
    .option("-c, --config", "Show the current configuration")
    .option("--api-key <key>", "Set the API key")
    .option("-r, --reset", "Reset the current configuration")
    .action(configCommand)

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
