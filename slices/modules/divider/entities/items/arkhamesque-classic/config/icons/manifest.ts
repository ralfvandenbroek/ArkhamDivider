import { defaultIconPositionManifest } from "@/modules/core/icon/shared/config";
import { percent } from "@/shared/util";

export const arkhamesqueClassicManifest = {
	...defaultIconPositionManifest,
	rogue: {
		scale: percent(75),
	},
	guardian: {
		top: percent(3),
	},
	seeker: {
		top: percent(2),
		scale: percent(90),
	},
	survivor: {
		top: percent(6),
	},
};
