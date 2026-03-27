import { outerSleeve } from "@/entities/sleeve/config";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { createSize } from "@/shared/util";
import type { ArkhamDecoDividerLayout } from "../model";
import { arkhamDecoCategoryId } from "./common";

const horizontalLayout: ArkhamDecoDividerLayout = {
	id: "arkham-deco",
	name: "divider.arkhamDeco.chapter1",
	image: "/images/divider/render/arkham-deco.avif",
	orientation: "horizontal",
	color: true,
	size: createSize(94, 68.5),
	printSize: {
		300: {
			size: createSize(1110, 809),
			bleedSize: createSize(1181, 880),
		},
	},
	bleed: 3,
	sleeves: [
		{
			id: outerSleeve.id,
			size: outerSleeve,
			description: "layout.sleeve.outerSleeve.description",
		},
	],
	types: ["scenario", "player", "investigator"],
	categoryId: arkhamDecoCategoryId,
	groupId: "chapter1",
};

export const arkhamDecoLayouts: DividerLayout[] = [horizontalLayout];
