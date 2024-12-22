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
