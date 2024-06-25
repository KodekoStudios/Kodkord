/**
 * Interface for a queue item in the Bucket.
 */
export interface QueueItem<T> {
	next: (cb: () => void, resolve: (data: T) => void, reject: (err: unknown) => void) => void;
	resolve: (data: T) => void;
	reject: (err: unknown) => void;
}

/**
 * Represents a bucket for managing rate limits and queuing requests.
 */
export class Bucket {
	private processingResetAfter?: NodeJS.Timeout | Timer | boolean;
	private processing?: NodeJS.Timeout | Timer | boolean;
	private queue: QueueItem<unknown>[];
	private remaining: number;
	private reset: number;
	private limit: number;

	public resetAfter: number;
	public last?: number;

	/**
	 * Creates an instance of the Bucket class.
	 * @param limit - The maximum number of requests allowed in the bucket.
	 */
	constructor(limit: number) {
		this.remaining = this.limit = limit;
		this.resetAfter = this.reset = 0;
		this.queue = [];
	}

	/**
	 * Processes the next request in the queue.
	 * @param override - Whether to override the current processing state.
	 */
	public process(override = false): void {
		if (!this.queue.length) {
			if (this.processing) {
				clearTimeout(this.processing as NodeJS.Timeout);
				this.processing = false;
			}
			return;
		}

		if (this.processing && !override) {
			return;
		}

		const now = Date.now();
		if (!this.reset || this.reset < now) {
			this.reset = now;
			this.remaining = this.limit;
		}

		this.last = now;
		if (this.remaining <= 0) {
			this.processing = setTimeout(
				() => {
					this.processing = false;
					this.process(true);
				},
				this.resetAfter ? 0.5 : Math.max(0, (this.reset || 0) - now) + 1,
			);
			return;
		}

		--this.remaining;
		this.processing = true;

		const shift = this.queue.shift() as QueueItem<unknown>;
		shift.next(
			() => {
				if (this.queue.length > 0) {
					this.process(true);
				} else {
					this.processing = false;
				}
			},
			shift.resolve,
			shift.reject,
		);
	}

	/**
	 * Adds a new request to the queue.
	 * @param func - The function to be added to the queue.
	 * @param unshift - Whether to add the function to the front of the queue.
	 */
	public push<T>(func: QueueItem<T>, unshift?: boolean): void {
		if (unshift) {
			this.queue.unshift(func as unknown as QueueItem<unknown>);
		} else {
			this.queue.push(func as unknown as QueueItem<unknown>);
		}
		this.process();
	}

	/**
	 * Triggers the reset after a specified delay.
	 */
	public triggerResetAfter(): void {
		if (!this.processingResetAfter && this.resetAfter) {
			this.processingResetAfter = setTimeout(() => {
				this.remaining++;
				this.processingResetAfter = undefined;
			}, this.resetAfter * 1.5);
		}
	}
}
