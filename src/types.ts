import type { ToSnakeCase } from "./utility-types"

export interface ExpiredLink {
    expireAtDatetime: Date
    expireAtViews: number
}

export interface LinkClickStatistics {
    clicks: number
    uniqueClicks: number
}

export interface LinkCreationInfo {
    createdAt: string
    updtedAt: string
}

export interface LinkExtraMetadata {
    tags: number[]
    pixels: number[]
}

export interface LinkAccess {
    publicStats: boolean
}

export interface BaseLink {
    longUrl: string
    shortUrl: string
    shortId: string
    domain: string
    description: string
}

export interface ShortenLink extends BaseLink, LinkCreationInfo {}

export interface ErrorRequest {
    message: string
}

export interface StatisticsLink extends LinkClickStatistics {
    data: Omit<BaseLink, "shortId" | "domain"> & Pick<LinkCreationInfo, "createdAt">
}

export interface CLIOptions {
    stats: boolean
    update: boolean
    remove: boolean
    domain: string
    views: boolean
    long: boolean
    create: boolean
    description: string
    shortId: string
    expireViews: string
}

export interface ShortenLinkAPI extends ToSnakeCase<ShortenLink> {}

export interface StatisticsLinkAPI extends ToSnakeCase<StatisticsLink> {}

export interface ShortenOptions
    extends ToSnakeCase<Pick<BaseLink, "shortId" | "domain" | "description">>,
        ToSnakeCase<Pick<ExpiredLink, "expireAtViews">> {}
