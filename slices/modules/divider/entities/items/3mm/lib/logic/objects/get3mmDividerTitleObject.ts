import { getDividerXPCost } from "@/modules/divider/shared/lib/logic/params";
import { arkhamStarterLayoutObjects as O } from "../../../config";
import type {
	ArkhamStarterDividerProps,
	ArkhamStarterDividerTitleObject,
} from "../../../model";

export const get3mmDividerTitleObject = (
	divider: ArkhamStarterDividerProps,
): ArkhamStarterDividerTitleObject => {
	const base = O.title;

	if (divider.layoutType === "scenario") {
		return base;
	}

	const xpCost = getDividerXPCost(divider);

	const maybeXP = {
		...base,
		...(xpCost ? O.title.xp : {}),
	};

	if (divider.layoutType === "player" && divider.story) {
		return {
			...maybeXP,
			...O.title.withPlayerStory,
		};
	}

	return maybeXP;
};
