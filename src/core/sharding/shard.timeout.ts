/**
 * Manages rate-limited execution of requests and their queuing.
 */
export class ConnectTimeout {
	readonly promises: ((x: boolean) => unknown)[] = [];
	protected interval?: ReturnType<typeof setInterval> = undefined;
	intervalTime: number;

	constructor(intervalTime = 5000) {
		this.intervalTime = intervalTime;
	}

	wait() {
		return new Promise<boolean>((res) => {
			if (!this.promises.length) {
				this.interval = setInterval(() => {
					this.shift();
				}, this.intervalTime);
				res(true);
			}
			this.promises.push(res);
		});
	}

	shift() {
		this.promises.shift()?.(true);
		if (!this.promises.length) {
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
	intervalTime: number;
	concurrency: number;

	constructor(intervalTime = 5000, concurrency = 1) {
		this.intervalTime = intervalTime;
		this.concurrency = concurrency;

		this.remaining = concurrency;
	}

	push(callback: () => unknown) {
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

	startInterval() {
		this.interval = setInterval(() => {
			let cb: (() => void) | undefined;
			// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
			while (this.queue.length && !(cb = this.queue.shift())) {
				//
			}
			if (cb) {
				return cb?.();
			}
			if (this.remaining < this.concurrency) {
				return this.remaining++;
			}
			if (!this.queue.length) {
				clearInterval(this.interval);
				this.interval = undefined;
			}
		}, this.intervalTime / this.concurrency);
	}
}
