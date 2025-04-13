import type { colors } from "./commands/logger.js"

export interface ErrorRequest {
    message: string
}

export interface CLIOptions {
    expiry: string
    sid: string
}

export interface ShortenURLAPIOptions {
    url: string
    expiry?: string
}

export interface ShortenURLAPIResponse {
    url: string
    shortUrl: string
    sid: string
    expiry: string
    expireAt: string
    createdAt: string
    updatedAt: string
}

export interface DeleteURLAPIResponse {
    isDeleted: boolean
}

export interface UpdateURLAPIOptions {
    sid: string
    expiry?: string
}

export interface LoggerOptions {
    info: string
    warn: string
    error: string
}

export interface LoggerCommandOptions {
    config: boolean
    reset: boolean
    colors: boolean
    info: keyof typeof colors
    warn: keyof typeof colors
    error: keyof typeof colors
}

export interface ConfigCommandOptions {
    reset: boolean
    apiKey: string
}

export interface ConfigOptions {
    apiKey: string
    logger: LoggerOptions
}

export interface Logger {
    info: (...message: any) => Logger
    warn: (...message: any) => Logger
    error: (...message: any) => Logger
}
