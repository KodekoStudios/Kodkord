import { Warn } from "@common/log";

// Define Task<T> as an alias for a function that handles resolve/reject
export type Task<T> = (resolve: (value: T) => void, reject: (reason?: unknown) => void) => void;

export class Bucket {
	// State Properties
	private processing: boolean;
	private paused: boolean;

	// Rate limit properties
	public remaining: number; // Remaining requests in the current window
	public limit: number; // Max of requests per window
	public reset: number; // Timestamp when the rate limit resets

	private queue: Task<unknown>[];

	public constructor(limit = 1, reset: number = Date.now()) {
		this.processing = false;
		this.paused = false;
		this.remaining = limit;
		this.limit = limit;
		this.reset = reset;
		this.queue = [];
	}

	public async process(override = false): Promise<void> {
		if (this.queue.length === 0) {
			this.resetBucketState();
			return;
		}

		if (this.processing && !override) {
			return;
		}

		this.processing = true;

		while (this.queue.length > 0 && !this.paused) {
			// Check rate limit
			if (this.remaining <= 0) {
				const NOW = Date.now();
				if (NOW < this.reset) {
					const WAIT_TIME = this.reset - NOW;
					new Warn("Bucket", `Rate limit reached. Waiting ${WAIT_TIME}ms.`).warn();
					await new Promise((resolve) => setTimeout(resolve, WAIT_TIME));
				}
				this.resetBucketState(); // Reset the state after the rate limit resets
			}

			const TASK = this.queue.shift();
			if (TASK) {
				this.remaining--;
				await new Promise(TASK);
			}
		}

		this.processing = false;
	}

	public add<T>(task: Task<T>, at?: number): void {
		if (at !== undefined) {
			this.queue.splice(at, 0, task);
		} else {
			this.queue.push(task);
		}

		this.process();
	}

	public resetBucketState(): void {
		this.queue = [];
		this.processing = false;
		this.paused = false;
		this.remaining = this.limit;
		this.reset = Date.now();
	}

	public pause(): void {
		this.paused = true;
	}

	public resume(): void {
		this.paused = false;
		this.process();
	}
}
