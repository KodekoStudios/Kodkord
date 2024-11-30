/**
 * Interface for a queue item in the Bucket.
 *
 * @template T The type of the data being processed by the queue.
 */
export interface QueueItem<T> {
	/**
	 * Function that processes the next item in the queue.
	 *
	 * @param cb Callback function to be called after the current item is processed.
	 * @param resolve Function to resolve the current item and proceed with its result.
	 * @param reject Function to handle any errors during the processing.
	 */
	next: (cb: () => void, resolve: (data: T) => void, reject: (err: unknown) => void) => void;

	/**
	 * Function to resolve the current item with the provided data.
	 *
	 * @param data The resolved data for the current item.
	 */
	resolve: (data: T) => void;

	/**
	 * Function to reject the current item with an error.
	 *
	 * @param err The error that occurred while processing the current item.
	 */
	reject: (err: unknown) => void;
}

/**
 * Manages rate-limited execution of requests and their queuing.
 *
 * The Bucket class is responsible for processing requests with a rate limit, ensuring that
 * no more than a specified number of requests are processed in a given time window.
 */
export class Bucket {
	/**
	 * Timer for managing when to reset the rate limit after processing requests.
	 * If true, the reset is already in progress.
	 */
	// biome-ignore lint/correctness/noUndeclaredVariables: Timer is not declared in the NodeJS namespace cuz it's a Bun type.
	private processingResetAfter?: NodeJS.Timeout | Timer | boolean;

	/**
	 * Timer to control the current request processing state.
	 * If true, a request is currently being processed.
	 */
	// biome-ignore lint/correctness/noUndeclaredVariables: Same as above.
	private processing?: NodeJS.Timeout | Timer | boolean;

	/** Queue of pending requests waiting to be processed. */
	private queue: QueueItem<unknown>[];

	/** Number of remaining requests that can be processed before reaching the rate limit. */
	private remaining: number;

	/** The time (in milliseconds) when the request limit will be reset. */
	private reset: number;

	/** The maximum number of requests allowed within the current rate limit window. */
	private limit: number;

	/** Delay (in milliseconds) after which the request limit is reset. */
	public resetAfter: number;

	/** The timestamp (in milliseconds) of the last processed request. */
	public last?: number;

	/**
	 * Constructs a new instance of the Bucket class.
	 *
	 * @param limit The maximum number of requests allowed in a given rate limit window.
	 */
	constructor(limit: number) {
		this.remaining = this.limit = limit;
		this.resetAfter = this.reset = 0;
		this.queue = [];
	}

	/**
	 * Processes the next request in the queue if rate limits allow.
	 *
	 * This method handles the logic to process the next request in the queue while ensuring
	 * that rate limits are respected. If the rate limit is exceeded, it schedules the next
	 * available time to process pending requests.
	 *
	 * @param override Whether to force processing the next request, ignoring the current processing state.
	 */
	public process(override = false): void {
		// If no items are in the queue, clear the processing state and exit.
		if (this.queue.length === 0) {
			if (this.processing) {
				clearTimeout(this.processing as NodeJS.Timeout);
				this.processing = false;
			}
			return;
		}

		// If a process is already running and not overridden, exit.
		if (this.processing && !override) {
			return;
		}

		const now = Date.now();

		// Reset the limit if the reset time has passed.
		if (!this.reset || this.reset < now) {
			this.reset = now;
			this.remaining = this.limit;
		}

		this.last = now;

		// If no requests are remaining, schedule processing after a delay.
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

		this.remaining--;
		this.processing = true;

		// Process the next item in the queue.
		const shift = this.queue.shift() as QueueItem<unknown>;
		shift.next(
			() => {
				// If more items are in the queue, continue processing.
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
	 *
	 * Requests can either be added to the front or the back of the queue. If added to the front
	 * (`unshift` is true), the request will be processed before other pending requests.
	 *
	 * @param func The function representing the request to be added to the queue.
	 * @param unshift If true, the request is added to the front of the queue. Defaults to false.
	 *
	 * @template T The type of the data being processed by the request.
	 */
	public push<T>(func: QueueItem<T>, unshift?: boolean): void {
		unshift
			? this.queue.unshift(func as unknown as QueueItem<unknown>)
			: this.queue.push(func as unknown as QueueItem<unknown>);

		this.process();
	}

	/**
	 * Triggers a reset for the remaining requests after a delay.
	 *
	 * This method schedules a reset of the remaining request count after a specified delay,
	 * allowing the bucket to continue processing more requests.
	 */
	public scheduleRateLimitReset(): void {
		// Schedule a reset after `resetAfter` time has passed.
		if (!this.processingResetAfter && this.resetAfter) {
			this.processingResetAfter = setTimeout(() => this.resetRateLimit(), this.resetAfter * 1.5);
		}
	}

	/**
	 * Resets the rate limit by increasing the remaining request count.
	 *
	 * This method is called when the reset window has passed, allowing the bucket to accept
	 * new requests. It increments the remaining request count and clears any ongoing reset timer.
	 *
	 * @returns This method does not return a value.
	 */
	private resetRateLimit(): void {
		this.remaining++;
		this.processingResetAfter = undefined;
	}

	/**
	 * Splits an array into chunks of a specified size.
	 *
	 * @param array The array to be split.
	 * @param chunks The number of chunks to split the array into.
	 * @returns An array of chunks, each containing a subset of the original array.
	 */
	static chunk<T>(array: T[], chunks: number): T[][] {
		let index = 0;
		let resIndex = 0;
		const result = new Array<T[]>(Math.ceil(array.length / chunks));

		while (index < array.length) {
			// biome-ignore lint/suspicious/noAssignInExpressions: >:3
			result[resIndex] = array.slice(index, (index += chunks));
			resIndex++;
		}

		return result;
	}
}
