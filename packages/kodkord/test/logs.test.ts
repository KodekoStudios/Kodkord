import { describe, expect, it } from "bun:test";

import { Panic, Trace, Note, Warn } from "../src/common/log";

describe("Logs", () => {
	it("Should log a note", () => {
		const NOTE = new Note("Test", "Line 1", "Line 2", "Line 3");
		NOTE.note();
		expect(NOTE).toBeDefined();
	});

	it("Should debug a trace", () => {
		const TRACE = new Trace("Test", "Line 1", "Line 2", "Line 3");
		TRACE.trace();
		expect(TRACE).toBeDefined();
	});

	it("Should warn", () => {
		const WARN = new Warn("Test", "Line 1", "Line 2", "Line 3");
		WARN.warn();
		expect(WARN).toBeDefined();
	});

	it("Should panic", () => {
		const PANIC = new Panic("Test", "Line 1", "Line 2", "Line 3");
		PANIC.panic();
		expect(() => {
			throw PANIC.toError();
		}).toThrowError();
	});

	it("Should intercept a throw and panic", () => {
		try {
			throw new Error("Testing");
		} catch (error) {
			const PANIC = new Panic("Test", (error as Error).message);
			PANIC.panic();
			expect();
		}
	});
});
