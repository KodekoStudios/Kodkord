import { URL } from "node:url";
import { Dictionary } from "@common/dictionary";
import { RouteBases } from "discord-api-types/v10";
import { Bucket } from "./bucket";

/**
 * Enum for HTTP request methods.
 */
export enum RequestMethod {
	Delete = "DELETE",
	Get = "GET",
	Patch = "PATCH",
	Post = "POST",
	Put = "PUT",
}

/**
 * Options for configuring the API handler.
 */
export interface ApiHandlerOptions {
	/** The base URL for the API. Defaults to Discord's API base URL. */
	baseURL?: string;

	/** The authentication token for API requests. */
	token: string;

	/** The type of token being used for authorization. */
	type?: "Bearer" | "Bot";

	/** Optional user agent string for requests. */
	agent?: string;

	/** Optional flag to enable debug logging. */
	debug?: boolean;
}

/**
 * Options for making API requests.
 */
export interface ApiRequestOptions {
	/** The body data to send with the request, if applicable. */
	body?: Record<string, object>;

	/** Query parameters to append to the request URL. */
	query?: Record<string, string>;

	/** Optional reason for audit logs when performing certain actions. */
	reason?: string;
}

/**
 * Handles interactions with the Discord API.
 *
 * This class provides methods for making requests to the Discord API while managing rate limits
 * and automatically handling authorization headers.
 */
export class APIHandler {
	/** Configuration options for the API handler. */
	private options: ApiHandlerOptions;

	/** The base URL for API requests. */
	private baseURL: string;

	/** A dictionary to manage rate limits for API routes. */
	private ratelimits: Dictionary<string, Bucket>;

	/**
	 * Constructs a new instance of the APIHandler class.
	 *
	 * @param options Options for configuring the API handler.
	 */
	public constructor(options: ApiHandlerOptions) {
		this.options = options;
		this.baseURL = options.baseURL || RouteBases.api;
		this.ratelimits = new Dictionary(undefined, undefined, "RATE LIMITS");
	}

	/**
	 * Retrieves or creates a Bucket for the given route.
	 *
	 * This method checks if a Bucket exists for the specified API route. If not, it creates a new
	 * Bucket with a specified rate limit.
	 *
	 * @param route The API route for which to get or create a Bucket.
	 * @returns The Bucket instance associated with the route.
	 */
	private getOrCreateBucket(route: string): Bucket {
		let bucket = this.ratelimits.get(route);
		if (!bucket) {
			bucket = new Bucket(1); // Example limit, replace with desired limit
			this.ratelimits.set(route, bucket);
		}
		return bucket;
	}

	/**
	 * Centralized method to build headers for API requests.
	 *
	 * This method constructs the headers required for making API requests, including
	 * authorization and optional audit log reasons.
	 *
	 * @param reason Optional reason for audit logs.
	 * @returns An object with all necessary headers.
	 */
	private buildHeaders(reason?: string): Record<string, string> {
		const HEADERS: Record<string, string> = {
			Authorization: `${this.options.type || "Bot"} ${this.options.token}`,
			"User-Agent": this.options.agent || "Kodcord (https://github.com/KodekoStudios)",
			"Content-Type": "application/json",
		};

		if (reason) {
			HEADERS["X-Audit-Log-Reason"] = reason;
		}

		return HEADERS;
	}

	/**
	 * Executes a request to the Discord API with improved error handling.
	 *
	 * This method makes a network request to the specified API route using the provided HTTP
	 * method and options. It manages rate limits and handles errors that may occur during
	 * the request.
	 *
	 * @param method The HTTP method for the request.
	 * @param route The API route to request.
	 * @param options Additional options for the request, including body and query parameters.
	 * @returns A promise that resolves to the response data from the API.
	 */
	public async request<T>(
		method: RequestMethod,
		route: string,
		options: ApiRequestOptions = {},
	): Promise<T> {
		// biome-ignore lint/style/useNamingConvention: I can't call this URL cuz URL is a class.
		const url = new URL(`${this.baseURL}${route}`);
		if (options.query) {
			url.search = new URLSearchParams(options.query).toString();
		}

		const HEADERS = this.buildHeaders(options.reason);
		const REQUEST_OPTIONS: RequestInit = { method, headers: HEADERS };

		if (options.body) {
			REQUEST_OPTIONS.body = JSON.stringify(options.body);
		}

		const BUCKET = this.getOrCreateBucket(route);
		await BUCKET.scheduleRateLimitReset(); // Ensure rate limit reset before processing

		return new Promise((resolve, reject) => {
			BUCKET.push({
				next: async (cb, _res, rej): Promise<void> => {
					try {
						const RESPONSE = await fetch(url.toString(), REQUEST_OPTIONS);
						if (!RESPONSE.ok) {
							rej(`Discord API request failed with status ${RESPONSE.status}`);
							return;
						}
						const DATA = await RESPONSE.json();
						cb();
						resolve(DATA);
					} catch (error) {
						rej(`Failed to execute Discord API request: ${(error as Error).message}`);
					}
				},
				resolve,
				reject,
			});
		});
	}

	/**
	 * Sends a GET request to the Discord API.
	 *
	 * This method is a convenience wrapper for making GET requests to the specified API route.
	 *
	 * @param route The API route to request.
	 * @param options Additional options for the request, including query parameters.
	 * @returns A promise that resolves to the response data from the API.
	 */
	public get<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Get, route, options);
	}

	/**
	 * Sends a POST request to the Discord API.
	 *
	 * This method is a convenience wrapper for making POST requests to the specified API route.
	 *
	 * @param route The API route to request.
	 * @param options Additional options for the request, including body data.
	 * @returns A promise that resolves to the response data from the API.
	 */
	public post<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Post, route, options);
	}

	/**
	 * Sends a PATCH request to the Discord API.
	 *
	 * This method is a convenience wrapper for making PATCH requests to the specified API route.
	 *
	 * @param route The API route to request.
	 * @param options Additional options for the request, including body data.
	 * @returns A promise that resolves to the response data from the API.
	 */
	public patch<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Patch, route, options);
	}

	/**
	 * Sends a PUT request to the Discord API.
	 *
	 * This method is a convenience wrapper for making PUT requests to the specified API route.
	 *
	 * @param route The API route to request.
	 * @param options Additional options for the request, including body data.
	 * @returns A promise that resolves to the response data from the API.
	 */
	public put<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Put, route, options);
	}

	/**
	 * Sends a DELETE request to the Discord API.
	 *
	 * This method is a convenience wrapper for making DELETE requests to the specified API route.
	 *
	 * @param route The API route to request.
	 * @param options Additional options for the request.
	 * @returns A promise that resolves to the response data from the API.
	 */
	public delete<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Delete, route, options);
	}
}
