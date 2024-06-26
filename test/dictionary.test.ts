import { describe, it, expect } from "bun:test";
import { Dictionary } from "../src/common/dictionary";

describe("Dictionary", () => {
	it("should set and get values correctly", () => {
		const dict = new Dictionary<string, number>();
		dict.set("one", 1);
		dict.set("two", 2);

		expect(dict.get("one")).toBe(1);
		expect(dict.get("two")).toBe(2);
	});

	it("should respect the limit and log a warning when limit is reached", () => {
		const limit = 2;
		const dict = new Dictionary<string, number>(undefined, limit, "testDict");
		dict.set("one", 1);
		dict.set("two", 2);
		dict.set("three", 3);

		expect(dict.size).toBe(limit);
	});

	it("should correctly calculate the remaining capacity", () => {
		const dict = new Dictionary<string, number>(undefined, 3);
		dict.set("one", 1);
		dict.set("two", 2);

		expect(dict.remaining).toBe(1);
	});

	it("should initialize with iterable values correctly", () => {
		const iterable = [
			["one", 1],
			["two", 2],
		] as [string, number][];
		const dict = new Dictionary<string, number>(iterable);

		expect(dict.get("one")).toBe(1);
		expect(dict.get("two")).toBe(2);
	});

	it("should not exceed limit when initialized with an iterable", () => {
		const iterable = [
			["one", 1],
			["two", 2],
			["three", 3],
		] as [string, number][];
		const limit = 2;
		const dict = new Dictionary<string, number>(iterable, limit);

		expect(dict.size).toBe(limit);
	});

	it("should return correct remaining capacity when limit is not set", () => {
		const dict = new Dictionary<string, number>();
		dict.set("one", 1);
		dict.set("two", 2);

		expect(dict.remaining).toBe(Number.POSITIVE_INFINITY - dict.size);
	});

	it("should log a warning if trying to add items beyond the limit", () => {
		const dict = new Dictionary<string, number>(undefined, 1, "limitedDict");
		dict.set("one", 1);
		dict.set("two", 2);

		expect(dict.size).toBe(1);
	});
});
