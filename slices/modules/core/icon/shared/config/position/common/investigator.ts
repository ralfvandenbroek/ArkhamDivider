import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	guardian: {
		left: percent(-1),
	},
	rogue: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},
	class_rogue: {
		left: percent(-1),
		top: percent(-1),
		scale: percent(90),
	},
	seeker: {
		top: percent(-2),
		left: percent(2),
		scale: percent(95),
	},
	class_seeker: {
		top: percent(-2),
		scale: percent(90),
	},
	survivor: {
		top: percent(4),
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
} as IconPositionManifest;
