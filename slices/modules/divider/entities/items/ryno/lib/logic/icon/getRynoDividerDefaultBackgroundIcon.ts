import { getFactionIcon } from "@/modules/faction/shared/lib";
import { isChallengeStory } from "@/modules/story/shared/lib";
import type { RynoDividerProps } from "../../../model";

export const getRynoDividerDefaultBackgroundIcon = (
	props: RynoDividerProps,
) => {
	if (props.layoutType === "scenario") {
		return props.story && isChallengeStory(props.story)
			? "cardicons-parallel"
			: props.story?.icon;
	}
	return getFactionIcon(props.faction);
};
