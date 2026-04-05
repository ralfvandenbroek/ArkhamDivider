import { isChallengeStory } from "@/modules/story/shared/lib";
import type { RynoDividerProps } from "../../../model";

export const getRynoDividerDefaultRightIcon = (props: RynoDividerProps) => {
	return props.story && isChallengeStory(props.story)
		? "cardicons-parallel"
		: props.story?.icon;
};
