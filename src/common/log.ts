export abstract class Loggable {
	protected readonly level: string;
	protected readonly header: { value: string; codes: ANSICodes[] };
	protected readonly lines: string[];

	public constructor(level: string, header: string, ...messages: string[]) {
		this.level = level;
		this.header = { value: header, codes: [] };
		this.lines = messages;
	}

	public note(): void {
		console.log(this.format());
	}

	public trace(): void {
		console.debug(this.format());
	}

	public warn(): void {
		console.warn(this.format());
	}

	public panic(): void {
		console.error(this.format());
	}

	public format(): string {
		const DATE = new Date();
		const TIME = `${DATE.toLocaleDateString()} ${DATE.toLocaleTimeString()}`;
		const HEADER = ` Kodkord > ${this.level} > ${this.header.value} `;
		const SEPARATOR = "-".repeat(
			Math.max(0, Math.round(process.stdout.columns / 1.5) - HEADER.length - TIME.length),
		);

		return `\n${stylize(HEADER, ...this.header.codes)} ${stylize(SEPARATOR, ANSICodes.Dim)} ${stylize(TIME, ANSICodes.Dim)}\n${this.formatLines()}`;
	}

	public formatLines(): string {
		return stylize(
			this.lines.map((line) => line.replace(/(\n?)(.+)/g, "$1 | $2")).join("\n"),
			ANSICodes.Dim,
		);
	}
}

export class Note extends Loggable {
	public constructor(header: string, ...messages: string[]) {
		super("Note", header, ...messages);
		this.header.codes = [ANSICodes.BgBlue];
	}
}

export class Warn extends Loggable {
	public constructor(header: string, ...messages: string[]) {
		super("Warning", header, ...messages);
		this.header.codes = [ANSICodes.BgYellow];
	}
}

export class Trace extends Loggable {
	public constructor(header: string, ...messages: string[]) {
		super("Trace", header, ...messages);
		this.header.codes = [ANSICodes.BgMagenta];
	}
}

// This is an Error but I can't name it that because of the built-in Error class.
export class Panic extends Loggable {
	public constructor(header: string, ...messages: string[]) {
		super("Panic", header, ...messages);
		this.header.codes = [ANSICodes.BgRed];
	}

	public toError(): Error {
		return new Error(this.lines.join("\n"));
	}
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: No one needs to undestand this.
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

export function ansi(...codes: ANSICodes[]): `\u001B[${string}m` {
	return `\x1b[${codes.join(";")}m` as const;
}

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
	BgBrightWhite = 107,
}
