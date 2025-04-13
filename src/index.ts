#! /usr/bin/env node

import "dotenv/config"
import { Command } from "commander"
import { configureOutput } from "./utils.js"
import {
    shortenerCommand,
    getCommand,
    deleteCommand,
    updateCommand,
    loggerCommand,
    configCommand,
    error,
} from "./commands/index.js"

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
    .option("-e, --expiry <expiry>", "set an expiry date for the link", "12h")
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
 * Manage logger settings
 */
program
    .command("logger")
    .description("Manage and view logger settings")
    .option("-c, --config", "Display the current logger configuration")
    .option("-r, --reset", "Reset logger settings to default")
    .option("--colors", "Display logger output with colors")
    .option("--info <color>", "Set the color for info level logs")
    .option("--warn <color>", "Set the color for warning level logs")
    .option("--error [color]", "Set the color for error level logs")
    .action(loggerCommand)

/**
 * Manage application configuration
 */
program
    .command("config")
    .description("View and modify application configuration")
    .option("-c, --config", "Display the current application configuration")
    .option("--api-key <key>", "Set the API key for the application")
    .option("-r, --reset", "Reset application configuration to default")
    .action(configCommand)

/**
 * Show help after an error
 */
program
    .showHelpAfterError(!error("You can execute (shortify --help) for additional information"))
    .configureOutput(configureOutput)

/**
 * Parse the command line arguments
 */
program.parseAsync(process.argv)
