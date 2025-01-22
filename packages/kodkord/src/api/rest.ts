import { RouteBases } from "discord-api-types/v10";
import { Dictionary } from "@common/dictionary";
import { Panic } from "@common/log";
import { URL } from "node:url";

import { Bucket } from "./bucket";

/** HTTP methods used for RESTful requests. */
export type RequestMethod = "DELETE" | "PATCH" | "POST" | "GET" | "PUT";

/** Configuration settings for the `Rest` class. */
export interface RestSettings {
	/** Base URL for API requests. Defaults to Discord's API base URL. */
	baseURL?: string;

	/** Authorization token for the bot or application. */
	token: string;

	/** Type of authorization token, defaults to "Bot". */
	type?: "Bearer" | "Bot";

	/** User-Agent header to identify the client. */
	agent?: string;
}

/** Parameters for a REST API request. */
export interface APIRequestParameters {
	/** Request body as a JSON object. */
	body?: unknown;

	/** Query parameters to append to the request URL. */
	query?: Record<string, string>;

	/** Reason for the request, logged in Discord's audit log if applicable. */
	reason?: string;
}

/**
 * A class for managing RESTful interactions with the Discord API.
 *
 * The `Rest` class provides methods to send HTTP requests to Discord's REST API.
 * It ensures proper rate-limiting using buckets and handles request retries when necessary.
 */
export class Rest {
	/** Configuration settings for the REST client. */
	private settings: RestSettings;

	/** Buckets used for rate-limiting requests to specific API routes. */
	private buckets: Dictionary<string, Bucket>;

	/**
	 * Creates a new `Rest` instance.
	 *
	 * @param settings Configuration settings for the REST client.
	 */
	public constructor(settings: { baseURL?: string } & RestSettings) {
		this.settings = {
			...settings,
			baseURL: settings.baseURL || RouteBases.api
		};
		this.buckets = new Dictionary();
	}

	public async latency(route = "/users/@me"): Promise<number> {
		const START = Date.now();
		await this.get(route);
		return Date.now() - START;
	}

	/**
	 * Sends a DELETE request to the specified API route.
	 *
	 * @param route API route to send the request to.
	 * @param parameters Optional parameters for the request.
	 * @returns A promise resolving to the response of the request.
	 */
	public delete<Returns>(route: string, parameters?: APIRequestParameters): Promise<Returns> {
		return this.request<Returns>("DELETE", route, parameters);
	}

	/**
	 * Sends a PATCH request to the specified API route.
	 *
	 * @param route API route to send the request to.
	 * @param parameters Optional parameters for the request.
	 * @returns A promise resolving to the response of the request.
	 */
	public patch<Returns>(route: string, parameters?: APIRequestParameters): Promise<Returns> {
		return this.request<Returns>("PATCH", route, parameters);
	}

	/**
	 * Sends a POST request to the specified API route.
	 *
	 * @param route API route to send the request to.
	 * @param parameters Optional parameters for the request.
	 * @returns A promise resolving to the response of the request.
	 */
	public post<Returns>(route: string, parameters?: APIRequestParameters): Promise<Returns> {
		return this.request<Returns>("POST", route, parameters);
	}

	/**
	 * Sends a PUT request to the specified API route.
	 *
	 * @param route API route to send the request to.
	 * @param parameters Optional parameters for the request.
	 * @returns A promise resolving to the response of the request.
	 */
	public put<Returns>(route: string, parameters?: APIRequestParameters): Promise<Returns> {
		return this.request<Returns>("PUT", route, parameters);
	}

	/**
	 * Sends a GET request to the specified API route.
	 *
	 * @param route API route to send the request to.
	 * @param parameters Optional parameters for the request.
	 * @returns A promise resolving to the response of the request.
	 */
	public get<Returns>(route: string, parameters?: APIRequestParameters): Promise<Returns> {
		return this.request<Returns>("GET", route, parameters);
	}

	/**
	 * Sends a request to the Discord API.
	 *
	 * - Applies rate limits using buckets based on the API route.
	 * - Automatically constructs headers and appends query parameters if provided.
	 *
	 * @param method HTTP method for the request.
	 * @param route API route to send the request to.
	 * @param parameters Optional parameters for the request.
	 * @returns A promise resolving to the response of the request.
	 */
	public async request<Returns>(
		method: RequestMethod,
		route: string,
		parameters: APIRequestParameters = {}
	): Promise<Returns> {
		const url = new URL(`${this.settings.baseURL}${route}`);
		const BUCKET = this.getBucket(route);

		if (parameters.query) {
			url.search = new URLSearchParams(parameters.query).toString();
		}

		const REQUEST_OPTIONS: RequestInit = {
			method,
			headers: this.buildHeaders(parameters.reason),
			body: parameters.body
				? JSON.stringify(parameters.body)
				: undefined
		};

		return new Promise((resolve, reject) => {
			BUCKET.add(async (_, rejectBucket) => {
				try {
					const RESPONSE = await fetch(url.toString(), REQUEST_OPTIONS);

					if (!RESPONSE.ok) {
						const PANIC = new Panic("Rest", `Request failed with status: ${RESPONSE.status}`);
						PANIC.panic();
						rejectBucket(PANIC.toError());
						return;
					}

					BUCKET.remaining = Number(RESPONSE.headers.get("X-RateLimit-Remaining") ?? 1);
					BUCKET.limit = Number(RESPONSE.headers.get("X-RateLimit-Limit") ?? 1);
					BUCKET.reset = Number(RESPONSE.headers.get("X-RateLimit-Reset") ?? 1) | 0; // Evil Math.floor

					resolve(await RESPONSE.json());
				} catch (error) {
					const PANIC = new Panic("Rest", "Failed to execute request", (error as Error).message);
					PANIC.panic();
					rejectBucket(PANIC.toError());
				}
			}).catch(reject);
		});
	}

	/**
	 * Retrieves the rate-limiting bucket for the specified route.
	 *
	 * If no bucket exists for the route, a new one is created.
	 *
	 * @param route API route for which the bucket is required.
	 * @returns The bucket associated with the route.
	 */
	public getBucket(route: string): Bucket {
		if (!this.buckets.has(route)) {
			this.buckets.set(route, new Bucket());
		}

		return this.buckets.get(route)!;
	}

	/**
	 * Builds the headers for an API request.
	 *
	 * - Includes the authorization token, content type, and user agent.
	 * - Adds the audit log reason if provided.
	 *
	 * @param reason Optional reason for the request, used for audit logs.
	 * @returns An object representing the headers.
	 */
	private buildHeaders(reason?: string): Record<string, string> {
		const HEADERS: Record<string, string> = {
			Authorization: `${this.settings.type || "Bot"} ${this.settings.token}`,
			"User-Agent": this.settings.agent || "Kodkord (https://github.com/KodekoStudios)",
			"Content-Type": "application/json"
		};

		if (reason) {
			HEADERS["X-Audit-Log-Reason"] = reason;
		}

		return HEADERS;
	}
}
