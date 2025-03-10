const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export function parseLines(input: string): string {
	return input
		.split(/\n/g)
		.map((s) => `<div class="line-parsed"><span>${s}</span></div>`)
		.join("<tr/>");
}

export function emmetParser(
	tag: string,
	input: string,
	props?: Record<string, string>,
) {
	return `<${tag} ${props ? `${Object.entries(props).map((p) => `${p[0]}="${p[1]}"`)}` : ""}>${input}</${tag}>`;
}

export function parseMinutesNSeconds(input: number): string {
	if (input > 9) return String(input);
	return `0${input}`;
}

const EmmetTag = "span";
const EmmetClass = "timestamp";

export function parseTime(input: string): string {
	return input.replaceAll(
		/<t:([0-9]+)(:[A-Za-z]|:)?>/g,
		(
			_,
			timestamp: string,
			style: ":t" | ":T" | ":d" | ":D" | ":f" | ":F" | ":R" | string,
		) => {
			const date = new Date(Number(timestamp) * 1000);
			switch (style) {
				case ":t":
					return emmetParser(
						EmmetTag,
						`${date.getHours()}:${parseMinutesNSeconds(date.getMinutes())}`,
						{
							class: EmmetClass,
						},
					);
				case ":T":
					return emmetParser(
						EmmetTag,
						`${date.getHours()}:${parseMinutesNSeconds(date.getMinutes())}:${parseMinutesNSeconds(date.getSeconds())}`,
						{
							class: EmmetClass,
						},
					);
				case ":d":
					return emmetParser(
						EmmetTag,
						`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
						{
							class: EmmetClass,
						},
					);
				case ":D":
					return emmetParser(
						EmmetTag,
						`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
						{
							class: EmmetClass,
						},
					);
				case ":F":
					return emmetParser(
						EmmetTag,
						`${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${parseMinutesNSeconds(date.getMinutes())}`,
						{
							class: EmmetClass,
						},
					);
				case ":R": {
					const now = new Date();

					const diff = date.valueOf() - now.valueOf();

					const unities = {
						year: 1000 * 60 * 60 * 24 * 365,
						month: 1000 * 60 * 60 * 24 * 30,
						day: 1000 * 60 * 60 * 24,
						hour: 1000 * 60 * 60,
						minute: 1000 * 60,
						second: 1000,
					};

					let units: Intl.RelativeTimeFormatUnit;
					let value: number;
					const diffAbs = Math.abs(diff);

					if (diffAbs >= unities.year) {
						units = "year";
						value = diff / unities.year;
					} else if (diffAbs >= unities.month) {
						units = "month";
						value = diff / unities.month;
					} else if (diffAbs >= unities.day) {
						units = "day";
						value = diff / unities.day;
					} else if (diffAbs >= unities.hour) {
						units = "hour";
						value = diff / unities.hour;
					} else if (diffAbs >= unities.minute) {
						units = "minute";
						value = diff / unities.minute;
					} else {
						units = "second";
						value = diff / unities.second;
					}

					const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
					return emmetParser(EmmetTag, rtf.format(Math.round(value), units), {
						class: EmmetClass,
					});
				}
				default:
					return emmetParser(
						EmmetTag,
						`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${parseMinutesNSeconds(date.getMinutes())}`,
						{
							class: EmmetClass,
						},
					);
			}
		},
	);
}

export function parseEmojis(input: string): string {
	return input
		.replaceAll(/\\n/g, "<tr/>")
		.replaceAll(
			/<(a)?:([A-Za-z0-9_]+):(\d+)>/g,
			(_, animated: string, name: string, id: string) =>
				`<img src="https://cdn.discordapp.com/emojis/${id}.${(animated?.startsWith("a_") ?? false) ? "gif" : "webp"}" alt=":${name}:" class="discord-emoji"/>`,
		);
}
