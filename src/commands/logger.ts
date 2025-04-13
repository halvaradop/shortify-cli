import { defaultConfig, readConfig, updateConfig } from "./config.js"
import type { Logger, LoggerCommandOptions, LoggerOptions } from "../types.js"

/**
 * Colors for the logger.
 * This is used to set the color of the logger output.
 * The colors are ANSI escape codes.
 * To see the list of available colors, use the --colors option.
 */
export const colors = {
    blue: "\u001b[34m",
    yellow: "\u001b[33m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
    white: "\u001b[37m",
    reset: "\u001b[0m",
    black: "\u001b[30m",
    brightRed: "\u001b[91m",
    brightGreen: "\u001b[92m",
    brightYellow: "\u001b[93m",
    brightBlue: "\u001b[94m",
    brightMagenta: "\u001b[95m",
    brightCyan: "\u001b[96m",
    brightWhite: "\u001b[97m",
}

/**
 * Default logger configuration.
 * This is used when the logger configuration is not set or is empty.
 */
export const defaultLogger: Logger = {
    info: (...message) => {
        console.log(colors.blue, ...message)
        return defaultLogger
    },
    warn: (...message) => {
        console.warn(colors.yellow, ...message)
        return defaultLogger
    },
    error: (...message) => {
        console.error(colors.red, ...message)
        return defaultLogger
    },
}

/**
 * Create a custom logger with the specified configuration.
 *
 * @param {LoggerOptions} config - The logger configuration options.
 * @returns {Logger} The custom logger.
 */
export const createCustomLogger = (config: LoggerOptions): Logger => {
    return {
        info: config?.info
            ? (...message) => {
                  console.log(config.info, ...message)
                  return createCustomLogger(config)
              }
            : defaultLogger.info,
        warn: config?.warn
            ? (...message) => {
                  console.warn(config.warn, ...message)
                  return createCustomLogger(config)
              }
            : defaultLogger.warn,
        error: config?.error
            ? (...message) => {
                  console.error(config.error, ...message)
                  return createCustomLogger(config)
              }
            : defaultLogger.error,
    }
}

/**
 * Create a logger instance based on the configuration.
 * If the configuration is not set or an error occurs, use the default logger.
 *
 * @returns {Logger} The logger instance.
 */
export const createLogger = (): Logger => {
    try {
        const { logger } = readConfig()
        return createCustomLogger(logger)
    } catch (error) {
        if (error instanceof Error) {
            defaultLogger.error("Error loading logger configuration:", error.message)
        }
        return defaultLogger
    }
}

/**
 * Update the logger color based on the specified logger type and new color. To see the list
 * of available colors, use the --colors option.
 *
 * @param {keyof LoggerOptions} logger - The logger type (info, warn, error).
 * @param {keyof typeof colors} newColor - The new color to set.
 */
export const updateLoggerColor = (logger: keyof LoggerOptions, newColor: keyof typeof colors) => {
    const color = Object.entries(colors).find(([key]) => newColor === key)?.[1]
    if (!color) {
        const loggerType = logger.charAt(0).toUpperCase() + logger.slice(1)
        error(`Invalid color for ${loggerType} logger`)
        return
    }
    updateConfig({
        logger: {
            ...defaultConfig.logger,
            [logger]: color,
        },
    })
    const loggerType = logger.charAt(0).toUpperCase() + logger.slice(1)
    info(`${loggerType} logger color updated`)
}

/**
 * create a logger instance
 */
export const logger = createLogger()
export const { info, warn, error } = logger

/**
 * Logger command options.
 * This is used to specify the options for the logger command.
 */
export const loggerCommand = (options: LoggerCommandOptions) => {
    if (!Object.keys(options).length) {
        error("The logger command requires at least one flag")
        return
    }
    if (options.config) {
        const { logger: configLogger } = readConfig()
        info("Logger configuration loaded:").info(JSON.stringify(configLogger, null, 2))
        return
    }
    if (options.reset) {
        info("Resetting logger configuration to default")
        updateConfig({
            logger: {
                info: colors.blue,
                warn: colors.yellow,
                error: colors.red,
            },
        })
        return
    }
    if (options.colors) {
        Object.entries(colors).forEach(([key, value]) => info(`${key}: ${value}This is a test message${colors.reset}`))
        return
    }
    if (options.info) {
        updateLoggerColor("info", options.info)
    }
    if (options.warn) {
        updateLoggerColor("warn", options.warn)
    }
    if (options.error) {
        updateLoggerColor("error", options.error)
    }
}
