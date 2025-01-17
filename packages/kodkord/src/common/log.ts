/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-mixed-enums */
/* eslint-disable @stylistic/no-extra-parens */

/**
 * Provides a lightweight, extensible logging mechanism with customizable formatting.
 *
 * The `Loggable` class is designed to be extended and used for temporary logging purposes,
 * avoiding the memory overhead of persistent logger instances. Each instance is created
 * when needed and goes out of scope once used, improving performance.
 *
 * @abstract
 */
export abstract class Loggable {
	/** The logging level (e.g., "WARN", "ERROR"). */
	protected readonly level: string;

	/** The header details of the log, including the header value and ANSI codes for styling. */
	protected readonly header: {
		value: string;
		codes: ANSICodes[];
	};

	/** The lines of the log message. */
	protected readonly lines: string[];

	/**
	 * Creates a new `Loggable` instance.
	 *
	 * @param level The log level used to identify the type of log
	 * @param header The header of the log, typically a title or identifier
	 * @param messages Additional lines or content for the log
	 */
	public constructor(level: string, header: string, ...messages: string[]) {
		this.level = level;
		this.header = {
			value: header,
			codes: []
		};
		this.lines = messages;
	}

	/** Logs the message to the console as a standard note. */
	public note(): void {
		console.log(this.format());
	}

	/** Logs the message to the console with a debug level. */
	public trace(): void {
		console.debug(this.format());
	}

	/** Logs the message to the console as a warning. */
	public warn(): void {
		console.warn(this.format());
	}

	/** Logs the message to the console as an error. */
	public panic(): void {
		console.error(this.format());
	}

	/**
	 * Formats the log into a styled string suitable for console output.
	 *
	 * The format includes the log header, timestamp, and a separator.
	 * @returns A formatted log string
	 */
	public format(): string {
		const DATE = new Date();
		const TIME = `${DATE.toLocaleDateString()} ${DATE.toLocaleTimeString()}`;
		const HEADER = ` Kodkord > ${this.level} > ${this.header.value} `;
		const SEPARATOR = "-".repeat(
			Math.max(0, Math.round(process.stdout.columns / 1.5) - HEADER.length - TIME.length)
		);

		return `\n${stylize(HEADER, ...this.header.codes)} ${stylize(SEPARATOR, ANSICodes.Dim)} ${stylize(TIME, ANSICodes.Dim)}\n${this.formatLines()}`;
	}

	/**
	 * Formats the individual lines of the log with a consistent style.
	 *
	 * Each line is prefixed with a vertical bar (`|`) for clarity.
	 * @returns A formatted string containing all log lines
	 */
	public formatLines(): string {
		return stylize(
			this.lines.map((line) => line.replace(/(\n?)(.+)/g, "$1 | $2")).join("\n"),
			ANSICodes.Dim
		);
	}
}

/**
 * A log entry with a predefined "Note" level and blue background styling.
 */
export class Note extends Loggable {
	/**
	 * Creates a new `Note` log entry.
	 *
	 * @param header The header of the log, typically a title or identifier.
	 * @param messages Additional lines or content for the log.
	 */
	public constructor(header: string, ...messages: string[]) {
		super("Note", header, ...messages);
		this.header.codes = [ANSICodes.BgBlue];
	}
}

/**
 * A log entry with a predefined "Warning" level and yellow background styling.
 */
export class Warn extends Loggable {
	/**
	 * Creates a new `Warn` log entry.
	 *
	 * @param header The header of the log, typically a title or identifier
	 * @param messages Additional lines or content for the log
	 */
	public constructor(header: string, ...messages: string[]) {
		super("Warning", header, ...messages);
		this.header.codes = [ANSICodes.BgYellow];
	}
}

/**
 * A log entry with a predefined "Trace" level and magenta background styling.
 */
export class Trace extends Loggable {
	/**
	 * Creates a new `Trace` log entry.
	 *
	 * @param header The header of the log, typically a title or identifier
	 * @param messages Additional lines or content for the log
	 */
	public constructor(header: string, ...messages: string[]) {
		super("Trace", header, ...messages);
		this.header.codes = [ANSICodes.BgMagenta];
	}
}

/**
 * A log entry with a predefined "Panic" level and red background styling.
 *
 * The `Panic` log entry includes an additional method for converting the log
 * into an `Error` object, useful for throwing or further handling.
 */
// This is an Error but I can't name it that because of the built-in Error class.
export class Panic extends Loggable {
	/**
	 * Creates a new `Panic` log entry.
	 *
	 * @param header The header of the log, typically a title or identifier
	 * @param messages Additional lines or content for the log
	 */
	public constructor(header: string, ...messages: string[]) {
		super("Panic", header, ...messages);
		this.header.codes = [ANSICodes.BgRed];
	}

	/**
	 * Converts the log entry into an `Error` object.
	 *
	 * The resulting `Error` will contain the concatenated lines of the log as its message.
	 *
	 * @returns An `Error` object representing the log entry
	 */
	public toError(): Error {
		return new Error(this.lines.join("\n"));
	}
}

/**
 * Stylizes the given string by applying the specified ANSI codes.
 *
 * The function resets specific styles automatically, such as text color, background color,
 * or other text formatting, based on the provided ANSI codes.
 *
 * @param input The string to be stylized.
 * @param codes ANSI codes to apply to the string.
 * @returns The stylized string with the applied ANSI codes.
 */
export function stylize(input: string, ...codes: ANSICodes[]): string {
	const RESET = new Set<ANSICodes>();

	for (const CODE of codes) {
		const IS_NUMBER = typeof CODE === "number";

		if (
			(IS_NUMBER && ((CODE >= 30 && CODE <= 37) || (CODE >= 90 && CODE <= 97))) ||
			CODE === ANSICodes.RGBColor ||
			CODE === ANSICodes.BITColor
		) {
			RESET.add(ANSICodes.ResetColor);
		} else if (
			(IS_NUMBER && ((CODE >= 40 && CODE <= 47) || (CODE >= 100 && CODE <= 107))) ||
			CODE === ANSICodes.RGBBackground ||
			CODE === ANSICodes.BITBackground
		) {
			RESET.add(ANSICodes.ResetBgColor);
		} else if (CODE in ANSICodes && !ANSICodes[CODE].startsWith("Reset")) {
			RESET.add(ANSICodes[`Reset${ANSICodes[CODE]}` as keyof typeof ANSICodes] as ANSICodes);
		}
	}

	return ansi(...codes) + input + ansi(...Array.from(RESET));
}

/**
 * Generates an ANSI escape sequence for the provided ANSI codes.
 *
 * This function returns a valid ANSI escape sequence that can be used
 * to style text in a terminal.
 *
 * @param codes ANSI codes to include in the escape sequence.
 * @returns The ANSI escape sequence as a string.
 */
export function ansi(...codes: ANSICodes[]): `\u001B[${string}m` {
	return `\x1b[${codes.join(";")}m` as const;
}

/**
 * Enum representing various ANSI escape codes for styling text and backgrounds.
 *
 * Includes codes for text styles, text colors, and background colors.
 * Reset codes are also provided to clear specific styles.
 */
export enum ANSICodes {
	// Reset
	ResetAll = 0,
	ResetBold = 22,
	ResetItalic = 23,
	ResetUnderline = 24,
	ResetBlik = 25,
	ResetInverse = 27,
	ResetHidden = 28,
	ResetStrikethrough = 29,
	ResetColor = 39,
	ResetBgColor = 49,

	// Text Styles
	Bold = 1,
	Dim = 2,
	Italic = 3,
	Underline = 4,
	Blink = 5,
	Inverse = 7,
	Hidden = 8,
	Strikethrough = 9,

	// Text Colors
	RGBColor = "38;2",
	BITColor = "38;5",
	RGBBackground = "48;2",
	BITBackground = "48;5",

	// Text Colors
	Black = 30,
	Red = 31,
	Green = 32,
	Yellow = 33,
	Blue = 34,
	Magenta = 35,
	Cyan = 36,
	White = 37,

	// Bright Text Colors
	BrightBlack = 90,
	BrightRed = 91,
	BrightGreen = 92,
	BrightYellow = 93,
	BrightBlue = 94,
	BrightMagenta = 95,
	BrightCyan = 96,
	BrightWhite = 97,

	// Background Colors
	BgBlack = 40,
	BgRed = 41,
	BgGreen = 42,
	BgYellow = 43,
	BgBlue = 44,
	BgMagenta = 45,
	BgCyan = 46,
	BgWhite = 47,

	// Bright Background Colors
	BgBrightBlack = 100,
	BgBrightRed = 101,
	BgBrightGreen = 102,
	BgBrightYellow = 103,
	BgBrightBlue = 104,
	BgBrightMagenta = 105,
	BgBrightCyan = 106,
	BgBrightWhite = 107
}
