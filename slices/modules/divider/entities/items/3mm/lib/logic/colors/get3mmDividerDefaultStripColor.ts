import { isChallengeStory, isSideContent } from "@/modules/story/shared/lib";
import { storyStripColor as stripColor } from "../../../config";
import type { ArkhamStarterDividerProps } from "../../../model";

export const get3mmDividerDefaultStripColor = (
	divider: ArkhamStarterDividerProps,
) => {
	const { story } = divider;
	if (!story) {
		return stripColor.empty;
	}

	const { code, return_to_code } = story;

	if (stripColor[code]) {
		return stripColor[code] ?? stripColor.empty;
	}

	if (return_to_code && stripColor[return_to_code]) {
		return stripColor[return_to_code];
	}

	if (isChallengeStory(story)) {
		return stripColor.challenge;
	}

	if (isSideContent(story)) {
		return stripColor.standalone;
	}

	return stripColor.empty;
};
