import type { DividerType, XPCost } from "@/modules/divider/shared/model";
import type { ArkhamDecoLayoutObjects } from "../../model";

type Options = {
	type?: DividerType;
	objects: ArkhamDecoLayoutObjects;
	xpCost?: XPCost | null;
	sideXP?: boolean;
};
export const getArkhamDecoTitleObject = ({
	type,
	objects,
	xpCost,
	sideXP,
}: Options) => {
	switch (type) {
		case "campaign":
		case "scenario":
			return {
				...objects.title.default,
				...objects.title[type],
			};
	}

	if (type === "player" && xpCost && sideXP) {
		return {
			...objects.title.default,
			...objects.title.xp,
		};
	}

	return objects.title.default;
};
