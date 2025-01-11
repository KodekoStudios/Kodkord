import { describe, expect, it } from "bun:test";
import { Dictionary } from "../src/common/dictionary";

describe("Dictionary", () => {
	it("should set and get values correctly", () => {
		const DICTIONARY = new Dictionary<string, number>();
		DICTIONARY.set("one", 1);
		DICTIONARY.set("two", 2);

		expect(DICTIONARY.get("one")).toBe(1);
		expect(DICTIONARY.get("two")).toBe(2);
	});

	it("should respect the limit and log a warning when limit is reached", () => {
		const LIMIT = 2;
		const DICTIONARY = new Dictionary<string, number>(undefined, LIMIT, "testDict");
		DICTIONARY.set("one", 1);
		DICTIONARY.set("two", 2);
		DICTIONARY.set("three", 3);

		expect(DICTIONARY.size).toBe(LIMIT);
	});

	it("should correctly calculate the remaining capacity", () => {
		const DICTIONARY = new Dictionary<string, number>(undefined, 3);
		DICTIONARY.set("one", 1);
		DICTIONARY.set("two", 2);

		expect(DICTIONARY.remaining).toBe(1);
	});

	it("should initialize with iterable values correctly", () => {
		const ITERABLE = [
			["one", 1],
			["two", 2],
		] as [string, number][];
		const DICTIONARY = new Dictionary<string, number>(ITERABLE);

		expect(DICTIONARY.get("one")).toBe(1);
		expect(DICTIONARY.get("two")).toBe(2);
	});

	it("should not exceed limit when initialized with an iterable", () => {
		const ITERABLE = [
			["one", 1],
			["two", 2],
			["three", 3],
		] as [string, number][];
		const LIMIT = 2;
		const DICTIONARY = new Dictionary<string, number>(ITERABLE, LIMIT);

		expect(DICTIONARY.size).toBe(LIMIT);
	});

	it("should return correct remaining capacity when limit is not set", () => {
		const DICTIONARY = new Dictionary<string, number>();
		DICTIONARY.set("one", 1);
		DICTIONARY.set("two", 2);

		expect(DICTIONARY.remaining).toBe(Number.POSITIVE_INFINITY - DICTIONARY.size);
	});

	it("should log a warning if trying to add items beyond the limit", () => {
		const DICTIONARY = new Dictionary<string, number>(undefined, 1, "limitedDict");
		DICTIONARY.set("one", 1);
		DICTIONARY.set("two", 2);

		expect(DICTIONARY.size).toBe(1);
	});
});
