import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { arkhamesqueClassicCategoryId } from "./common";

const large: DividerLayout = {
	id: "arkhamesque-classic",
	types: ["scenario", "player", "investigator"],
	categoryId: arkhamesqueClassicCategoryId,
	groupId: "large",
	name: "divider.arkhamesque-classic.large",
	orientation: "horizontal",
	color: true,
	size: createSize(89, 80),
	printSize: {
		300: {
			size: createSize(1051, 960),
			bleedSize: createSize(1122, 1032),
		},
	},
	bleed: 3,
	iconParams: ["icon", "campaignIcon"],
};

const medium: DividerLayout = {
	...large,
	id: "arkhamesque-classic-3",
	groupId: "medium",
	name: "divider.arkhamesque-classic.medium",
	size: createSize(89, 77),
	printSize: {
		300: {
			size: createSize(1051, 898),
			bleedSize: createSize(1122, 969),
		},
	},
};

export const arkhamesqueClassicLayouts = [large, medium];
