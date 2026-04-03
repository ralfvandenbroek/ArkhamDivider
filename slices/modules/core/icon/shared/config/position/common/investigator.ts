import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	class_rogue: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},

	class_seeker: {
		top: percent(-2),
		scale: percent(90),
	},

	class_survivor: {
		top: percent(4),
	},
	mystic: {
		left: percent(-1),
		top: percent(-10),
		scale: percent(90),
	},
	mystic_alt: {},
	class_mystic: {
		left: percent(-1),
		top: percent(-10),
		scale: percent(90),
	},
	neutral: {
		left: percent(-1),
		scale: percent(85),
	},
	class_neutral: {
		left: percent(-1),
		top: percent(-3),
	},
	multiclass: {
		top: percent(-1),
	},
	rogue: {
		scale: percent(75),
	},
	guardian: {
		top: percent(3),
	},
	seeker: {
		scale: percent(85),
	},
	survivor: {
		top: percent(6),
	},
} as IconPositionManifest;
