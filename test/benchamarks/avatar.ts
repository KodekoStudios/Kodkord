import type { DefaultUserAvatarAssets } from "discord-api-types/v10";
import type { Nullable } from "../../src/types";
import { group, bench, run } from "mitata";

class CAvatar {
	public readonly default_avatar: DefaultUserAvatarAssets;
	public readonly avatar: Nullable<string>;

	constructor(avatar: Nullable<string>, default_avatar: DefaultUserAvatarAssets) {
		this.default_avatar = default_avatar;
		this.avatar = avatar;
	}

	public url(size: number) {
		if (this.avatar) {
			return `https://example.com/images/${this.avatar}?size=${size}`;
		}

		return null;
	}

	public default(size: number) {
		return `https://example.com/images/default_${this.default_avatar}?size=${size}`;
	}

	public display(size: number) {
		return this.avatar ? this.url(4096) : this.default(4096);
	}
}

const OAvatar = (avatar: Nullable<string>, default_avatar: DefaultUserAvatarAssets) => ({
	avatar,
	default_avatar,

	url(size: number) {
		if (this.avatar) {
			return `https://example.com/images/${this.avatar}?size=${size}`;
		}

		return null;
	},

	default(size: number) {
		return `https://example.com/images/default_${this.default_avatar}?size=${size}`;
	},

	display(size: number) {
		return this.avatar ? this.url(size) : this.default(size);
	},
});

group("Class vs Object", () => {
	bench("Object", () => OAvatar("avatar_example", 1));
	bench("Class", () => new CAvatar("avatar_example", 1));
});

await run();
