/**
 * Manages rate-limited execution of requests and their queuing.
 */
export class ConnectTimeout {
	public readonly promises: ((x: boolean) => unknown)[] = [];
	protected interval?: ReturnType<typeof setInterval> = undefined;
	public intervalTime: number;

	public constructor(intervalTime = 5000) {
		this.intervalTime = intervalTime;
	}

	public wait(): Promise<undefined | boolean> {
		return new Promise<boolean>((res) => {
			if (this.promises.length === 0) {
				this.interval = setInterval(() => {
					this.shift();
				}, this.intervalTime);
				res(true);
			}
			this.promises.push(res);
		});
	}

	public shift(): void {
		this.promises.shift()?.(true);
		if (this.promises.length === 0) {
			clearInterval(this.interval);
			this.interval = undefined;
		}
	}
}

/**
 * Manages rate-limited execution of requests and their queuing.
 */
export class ConnectQueue {
	private queue: ((() => unknown) | undefined)[] = [];
	private remaining = 0;
	protected interval?: ReturnType<typeof setInterval> = undefined;
	public intervalTime: number;
	public concurrency: number;

	public constructor(intervalTime = 5000, concurrency = 1) {
		this.intervalTime = intervalTime;
		this.concurrency = concurrency;

		this.remaining = concurrency;
	}

	public push(callback: () => unknown): unknown {
		if (this.remaining === 0) {
			return this.queue.push(callback);
		}
		this.remaining--;
		if (!this.interval) {
			this.startInterval();
		}

		if (this.queue.length < this.concurrency) {
			return callback();
		}
		return this.queue.push(callback);
	}

	public startInterval(): void {
		this.interval = setInterval(() => {
			let cb: (() => void) | undefined;
			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			while (this.queue.length > 0 && !(cb = this.queue.shift())) {
				//
			}
			if (cb) {
				return cb?.();
			}
			if (this.remaining < this.concurrency) {
				return this.remaining++;
			}
			if (this.queue.length === 0) {
				clearInterval(this.interval);
				this.interval = undefined;
			}
		}, this.intervalTime / this.concurrency);
	}
}
