import path from "path"
import { existsSync, readFileSync, writeFileSync } from "fs"
import { fileURLToPath } from "url"
import { info, warn, error } from "./logger.js"
import type { ConfigCommandOptions, ConfigOptions } from "../types.js"

/**
 * Path to the configuration file.
 * This file is used to store the API key and other configuration settings.
 */
export const configPath = path.join(fileURLToPath(import.meta.url), "../../config.json")

/**
 * Default configuration options.
 * This is used when the configuration file does not exist or is empty.
 */
export const defaultConfig: ConfigOptions = {
    apiKey: "",
    logger: {
        info: "\u001b[34m",
        warn: "\u001b[33m",
        error: "\u001b[31m",
    },
}

/**
 * Read the configuration file and return the configuration options.
 * If the file does not exist or is empty, return the default configuration options.
 *
 * @returns {ConfigOptions} The configuration options.
 */
export const readConfig = (): ConfigOptions => {
    try {
        return JSON.parse(readFileSync(configPath, "utf-8"))
    } catch (e) {
        error("Error reading config file:", e)
        return defaultConfig as ConfigOptions
    }
}

/**
 * Write the configuration options to the configuration file.
 *
 * @param {ConfigOptions} config - The configuration options to write.
 */
export const writeConfig = async (config: Partial<ConfigOptions>) => {
    try {
        const defaultConfig = readConfig()
        const newConfig = { ...defaultConfig, ...config }
        writeFileSync(configPath, JSON.stringify(newConfig, null, 2))
        info("Config file updated successfully.")
    } catch (e) {
        error("Error writing config file:", e)
    }
}

/**
 * Create the configuration file with default values.
 * If the file already exists, it will not be overwritten unless the force parameter is set to true.
 *
 * @param {boolean} force - Whether to overwrite the existing configuration file.
 */
const createConfig = async (force: boolean = false) => {
    const config = configPath
    if (!existsSync(config) || force) {
        if (force) {
            warn("Resetting config file to default values.")
        } else {
            info("Creating config file with default values.")
        }
        writeConfig(defaultConfig)
    } else {
        warn("The config file already exists. Use --reset to overwrite.")
    }
}

/**
 * Command to configure the application.
 * This command allows the user to view, edit, or reset the configuration options.
 *
 * @param {ConfigCommandOptions} options - The command line options.
 */
export const configCommand = async (options: ConfigCommandOptions) => {
    if (!Object.keys(options).length) {
        info("Configuration:", readConfig())
        return
    }
    if (options.reset) {
        createConfig(true)
        return
    }
    if (options.apiKey) {
        writeConfig({ apiKey: options.apiKey })
        info("API key updated successfully.")
    }
}
