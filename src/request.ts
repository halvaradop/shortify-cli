import type { ErrorRequest, ShortenLink, ShortenLinkAPI, ShortenOptions, StatisticsLinkAPI, StatisticsLink } from "./types"
import { mappingResponse, removeEmptyProperties, shortenLinkInit, statisticsLinkInit } from "./utils"

const SHORTENER_API_KEY = process.env.SHORTENER_API_KEY

/**
 * Configuration of the headers for the request to the API
 */
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${SHORTENER_API_KEY}`,
}

/**
 * Shorten a link and return the new link information.
 * @param source The link to be shortened
 */
export const shortenerUrl = async (source: string, options: ShortenOptions): Promise<ShortenLink | ErrorRequest> => {
    const fields = removeEmptyProperties(options)
    try {
        const request = await fetch("https://api.t.ly/api/v1/link/shorten", {
            method: "POST",
            headers,
            body: JSON.stringify({
                long_url: source,
                ...fields,
            }),
        })
        const response = (await request.json()) as ShortenLinkAPI
        return mappingResponse(response, shortenLinkInit)
    } catch (error) {
        return { message: "An error has occurred" }
    }
}

/**
 *  Gets the statistics of a previously created shortened link.
 *
 * @param source The shortened link from which the statistics are to be obtained
 */
export const getStats = async (source: string): Promise<StatisticsLink | ErrorRequest> => {
    try {
        const request = await fetch(`https://api.t.ly/api/v1/link/stats?short_url=${source}`, {
            method: "GET",
            headers,
        })
        const response = (await request.json()) as StatisticsLinkAPI
        return mappingResponse(response, statisticsLinkInit)
    } catch (error) {
        return { message: "An error has occurred" }
    }
}

/**
 * Remove a URL from the user's history
 *
 * @param source The URL to be removed
 * @returns A message to notify that the URL was deleted.
 */
export const removeUrl = async (source: string): Promise<string> => {
    try {
        await fetch("https://api.t.ly/api/v1/link", {
            method: "DELETE",
            headers,
            body: JSON.stringify({
                short_url: source,
            }),
        })
        return "The link has been successfully removed"
    } catch (error) {
        return "An error has occurred"
    }
}
