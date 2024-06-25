import { URL } from "node:url";
import { Dictionary } from "@common/dictionary";
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
	baseUrl?: string;
	token: string;
	type?: "Bearer" | "Bot";
	agent?: string;
	debug?: boolean;
}

/**
 * Options for making API requests.
 */
export interface ApiRequestOptions {
	body?: Record<string, object>;
	query?: Record<string, string>;
	reason?: string;
}

/**
 * Handles interactions with the Discord API.
 */
export class APIHandler {
	private options: ApiHandlerOptions;
	private baseUrl: string;
	private ratelimits: Dictionary<string, Bucket>;

	/**
	 * Creates an instance of APIHandler.
	 * @param options - Options for configuring the API handler.
	 */
	constructor(options: ApiHandlerOptions) {
		this.options = options;
		this.baseUrl = options.baseUrl || "https://discord.com/api/v10";
		this.ratelimits = new Dictionary(undefined, undefined, "Rate Limits");
	}

	/**
	 * Retrieves or creates a Bucket for the given route.
	 * @param route - The API route for which to get or create a Bucket.
	 * @returns - The Bucket instance associated with the route.
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
	 * Executes a request to the Discord API.
	 * @param method - The HTTP method for the request.
	 * @param route - The API route to request.
	 * @param [options={}] - Additional options for the request.
	 * @returns - The response data from the API.
	 */
	public async request<T>(
		method: RequestMethod,
		route: string,
		options: ApiRequestOptions = {},
	): Promise<T> {
		const url = new URL(`${this.baseUrl}${route}`);
		if (options.query) {
			url.search = new URLSearchParams(options.query).toString();
		}

		const headers: Record<string, string> = {
			Authorization: `${this.options.type || "Bot"} ${this.options.token}`,
			"User-Agent": this.options.agent || "Akord (https://github.com/Akord)",
			"Content-Type": "application/json",
		};

		if (options.reason) {
			headers["X-Audit-Log-Reason"] = options.reason;
		}

		const requestOptions: RequestInit = {
			method,
			headers,
		};

		if (options.body) {
			requestOptions.body = JSON.stringify(options.body);
		}

		const bucket = this.getOrCreateBucket(route);
		await bucket.triggerResetAfter(); // Ensure rate limit reset before processing

		return new Promise((resolve, reject) => {
			bucket.push({
				next: (cb, _res, rej) => {
					fetch(url.toString(), requestOptions)
						.then((response) => {
							if (!response.ok) {
								rej(`Discord API request failed with status ${response.status}`);
							}
							return response.json();
						})
						.then((data) => {
							cb();
							resolve(data);
						})
						.catch((error) => {
							rej(`Failed to execute Discord API request: ${error.message}`);
						});
				},
				resolve,
				reject,
			});
		});
	}

	/**
	 * Sends a GET request to the Discord API.
	 * @param route - The API route to request.
	 * @param [options={}] - Additional options for the request.
	 * @returns - The response data from the API.
	 */
	public async get<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Get, route, options);
	}

	/**
	 * Sends a POST request to the Discord API.
	 * @param route - The API route to request.
	 * @param [options={}] - Additional options for the request.
	 * @returns - The response data from the API.
	 */
	public async post<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Post, route, options);
	}

	/**
	 * Sends a PATCH request to the Discord API.
	 * @param route - The API route to request.
	 * @param [options={}] - Additional options for the request.
	 * @returns - The response data from the API.
	 */
	public async patch<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Patch, route, options);
	}

	/**
	 * Sends a PUT request to the Discord API.
	 * @param route - The API route to request.
	 * @param [options={}] - Additional options for the request.
	 * @returns - The response data from the API.
	 */
	public async put<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Put, route, options);
	}

	/**
	 * Sends a DELETE request to the Discord API.
	 * @param route - The API route to request.
	 * @param [options={}] - Additional options for the request.
	 * @returns - The response data from the API.
	 */
	public async delete<T>(route: string, options?: ApiRequestOptions): Promise<T> {
		return this.request(RequestMethod.Delete, route, options);
	}
}
