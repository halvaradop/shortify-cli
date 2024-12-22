import type {
    ErrorRequest,
    ShortenURLAPIResponse,
    ShortenURLAPIOptions,
    DeleteURLAPIResponse,
    UpdateURLAPIOptions,
} from "./types"

/**
 * Make a GET request to the API
 *
 * @param {RequestInit} init The configuration object for the request
 * @returns {Promise<T>} The response from the API
 * @internal
 */
const getRequest = async <T extends object>(route: string, init: RequestInit = {}): Promise<T> => {
    try {
        const { headers: headersInit, ...spread } = init
        const signal = new AbortController().signal
        const response = await fetch(`https://api.manyapis.com//${route}`, {
            signal,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-api-key": process.env.SHORTENER_API_KEY!,
                ...headersInit,
            },
            ...spread,
        })
        const json = await response.json()
        return json as T
    } catch (error) {
        console.error(error)
        throw error
    }
}

/**
 * Shorten a link and return the new link information.
 *
 * @param {ShortenURLAPIOptions} options The options to configure the shortened link
 * @returns {Promise<string>} The shortened link or an error message
 */
export const shortenerURL = async (options: ShortenURLAPIOptions): Promise<ShortenURLAPIResponse | ErrorRequest> => {
    try {
        return await getRequest<ShortenURLAPIResponse>("v1-create-short-url", {
            method: "POST",
            body: JSON.stringify(options),
        })
    } catch (error) {
        return { message: "An error has occurred" }
    }
}

/**
 * Get the short version of a URL.
 *
 * @param {string} sid The short ID of the URL
 * @returns {Promise<ShortenURLAPIResponse | ErrorRequest>} The short URL or an error message
 */
export const getShortURL = async (sid: string): Promise<ShortenURLAPIResponse | ErrorRequest> => {
    try {
        return await getRequest<ShortenURLAPIResponse>(`v1-get-short-url?sid=${sid}`)
    } catch (error) {
        return { message: "An error has occurred" }
    }
}

/**
 * Remove a URL from the user's history
 *
 * @param {string} sid - The URL to be removed
 * @returns {Promise<DeleteURLAPIResponse | ErrorRequest>} A message to notify that the URL was deleted.
 */
export const deleteURL = async (sid: string): Promise<DeleteURLAPIResponse | ErrorRequest> => {
    try {
        return getRequest<DeleteURLAPIResponse>(`v1-delete-short-url?sid=${sid}`, {
            method: "POST",
        })
    } catch (error) {
        return { message: "An error has occurred" }
    }
}

/**
 * Update a URL with new information
 *
 * @param {UpdateURLAPIOptions} options The new information to update the URL
 * @returns {Promise<ShortenURLAPIResponse | ErrorRequest>} The updated URL or an error message
 */
export const updateURL = async (options: UpdateURLAPIOptions): Promise<ShortenURLAPIResponse | ErrorRequest> => {
    try {
        return getRequest<ShortenURLAPIResponse>(`v1-update-short-url`, {
            method: "PUT",
            body: JSON.stringify(options),
        })
    } catch (error) {
        return { message: "An error has occurred" }
    }
}
