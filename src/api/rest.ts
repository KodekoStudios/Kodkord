import { URL } from "node:url";
import { Dictionary } from "@common/dictionary";
import { Panic } from "@common/log";
import { RouteBases } from "discord-api-types/v10";
import { Bucket } from "./bucket";

export type RequestMethod = "DELETE" | "PATCH" | "POST" | "GET" | "PUT";

export interface RestSettings {
	baseURL?: string;
	token: string;
	type?: "Bearer" | "Bot";
	agent?: string;
}

export interface APIRequestParameters {
	body?: Record<string, object>;
	query?: Record<string, string>;
	reason?: string;
}

// Representational State Transfer for Discord API.
export class Rest {
	private settings: RestSettings;
	private buckets: Dictionary<string, Bucket>;

	public constructor(settings: RestSettings & { baseURL?: string }) {
		this.settings = { ...settings, baseURL: settings.baseURL || RouteBases.api };
		this.buckets = new Dictionary();
	}

	public delete<T>(route: string, parameters?: APIRequestParameters): Promise<T> {
		return this.request<T>("DELETE", route, parameters);
	}

	public patch<T>(route: string, parameters?: APIRequestParameters): Promise<T> {
		return this.request<T>("PATCH", route, parameters);
	}

	public post<T>(route: string, parameters?: APIRequestParameters): Promise<T> {
		return this.request<T>("POST", route, parameters);
	}

	public put<T>(route: string, parameters?: APIRequestParameters): Promise<T> {
		return this.request<T>("PUT", route, parameters);
	}

	public get<T>(route: string, parameters?: APIRequestParameters): Promise<T> {
		return this.request<T>("GET", route, parameters);
	}

	public async request<T>(
		method: RequestMethod,
		route: string,
		parameters: APIRequestParameters = {},
	): Promise<T> {
		// biome-ignore lint/style/useNamingConvention: Can't use `URL` as a variable name.
		const url = new URL(`${this.settings.baseURL}${route}`);
		const BUCKET = this.getBucket(route);

		if (parameters.query) {
			url.search = new URLSearchParams(parameters.query).toString();
		}

		const REQUEST_OPTIONS: RequestInit = {
			method,
			headers: this.buildHeaders(parameters.reason),
			body: parameters.body ? JSON.stringify(parameters.body) : undefined,
		};

		return new Promise((resolve) => {
			BUCKET.add(async (_, reject) => {
				try {
					const RESPONSE = await fetch(url.toString(), REQUEST_OPTIONS);

					if (!RESPONSE.ok) {
						const PANIC = new Panic("Rest", `Request failed with status: ${RESPONSE.status}`);
						PANIC.panic();
						reject(PANIC.toError());
					}

					BUCKET.limit = Number(RESPONSE.headers.get("X-RateLimit-Limit")) || 1;
					BUCKET.remaining = Number(RESPONSE.headers.get("X-RateLimit-Remaining")) || 0;
					BUCKET.reset = Number(RESPONSE.headers.get("X-RateLimit-Reset")) || 0;

					resolve(await RESPONSE.json());
				} catch (error) {
					const PANIC = new Panic("Rest", "Failed to execute request", (error as Error).message);
					PANIC.panic();
					reject(PANIC.toError());
				}
			});
		});
	}

	public getBucket(route: string): Bucket {
		if (!this.buckets.has(route)) {
			this.buckets.set(route, new Bucket());
		}

		return this.buckets.get(route) as Bucket;
	}

	private buildHeaders(reason?: string): Record<string, string> {
		const HEADERS: Record<string, string> = {
			Authorization: `${this.settings.type || "Bot"} ${this.settings.token}`,
			"User-Agent": this.settings.agent || "Kodcord (https://github.com/KodekoStudios)",
			"Content-Type": "application/json",
		};

		if (reason) {
			HEADERS["X-Audit-Log-Reason"] = reason;
		}

		return HEADERS;
	}
}
