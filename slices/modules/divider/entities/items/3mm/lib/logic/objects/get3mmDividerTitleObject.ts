import { mergeDeepRight } from "ramda";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic/params";
import { arkhamStarterLayoutObjects as O } from "../../../config";
import type { ArkhamStarterDividerProps } from "../../../model";

type Result = typeof O.title;

export const get3mmDividerTitleObject = (
	divider: ArkhamStarterDividerProps,
): Result => {
	const base = O.title;

	if (divider.layoutType === "scenario") {
		return base;
	}

	const xpCost = getDividerXPCost(divider);

	const maybeXP = mergeDeepRight(base, xpCost ? O.title.xp : {}) as Result;

	if (divider.layoutType === "player" && divider.story) {
		const result = mergeDeepRight(maybeXP, O.title.withPlayerStory);

		const customIcon = divider.params?.icon;
		const vertical = customIcon ? O.title.default.vertical : {};

		return mergeDeepRight(result, {
			vertical,
		}) as Result;
	}

	return maybeXP as Result;
};
