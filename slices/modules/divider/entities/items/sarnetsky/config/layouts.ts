import { largeCCG } from "@/entities/sleeve/config/sizes";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { sarnetskyCategoryId } from "./common";

const iconParams = ["icon", "background", "campaignIcon"];

const horizontal: DividerLayout = {
	id: "sarnetsky-horizontal",
	categoryId: sarnetskyCategoryId,
	groupId: "sarnetsky-horizontal",
	name: "Double Side",
	orientation: "horizontal",
	color: true,
	size: createSize(89, 75),
	types: ["scenario", "player", "investigator"],
	bleed: 2,
	printSize: {
		300: {
			size: createSize(1051, 886),
			bleedSize: createSize(1098, 933),
		},
	},
	sleeves: [
		{
			id: largeCCG.id,
			size: largeCCG,
			description: "layout.classic.sleeve.largeCCG.description",
		},
	],
	scenarioParams: {
		campaignIcon: true,
		cardCount: false,
	},
	playerParams: {
		numericXP: true,
	},
	iconParams,
};

const horizontalBlank: DividerLayout = {
	...horizontal,
	id: "sarnetsky-horizontal-blank",
	name: "Single Side",
	params: {
		blankBackSide: true,
	},
};

const vertical: DividerLayout = {
	id: "sarnetsky-vertical",
	categoryId: sarnetskyCategoryId,
	groupId: "sarnetsky-vertical",
	name: "Double Side",
	image: "/images/divider/render/sarnetsky.avif",
	orientation: "vertical",
	color: true,
	size: createSize(63, 105),
	types: ["scenario"],
	bleed: 2,
	printSize: {
		300: {
			size: createSize(744, 1240),
			bleedSize: createSize(791, 1287),
		},
	},
	scenarioParams: {
		campaignIcon: true,
		cardCount: false,
	},
	iconParams,
};

const verticalBlank: DividerLayout = {
	...vertical,
	id: "sarnetsky-vertical-blank",
	name: "Single Side",
	params: {
		blankBackSide: true,
	},
};

export const sarnetskyLayouts: DividerLayout[] = [
	horizontal,
	horizontalBlank,
	vertical,
	verticalBlank,
];
