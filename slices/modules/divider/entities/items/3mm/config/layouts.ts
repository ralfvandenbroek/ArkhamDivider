import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import { arkhamStarterDividerCategoryId } from "./common";

const layout: DividerLayout = {
	id: "3mm",
	types: ["scenario", "player", "investigator"],
	categoryId: arkhamStarterDividerCategoryId,
	groupId: "3mm",
	name: "3mm",
	orientation: "horizontal",
	color: true,
	size: createSize(93, 67),
	printSize: {
		300: {
			size: createSize(1098, 791),
			bleedSize: createSize(1181, 874),
		},
	},
	bleed: 3.5,
	iconParams: ["icon"],
	playerParams: {
		story: true,
	},
};

export const arkhamStarterLayouts = [layout];
