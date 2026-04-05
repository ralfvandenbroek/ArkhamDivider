import { useTranslation } from "react-i18next";
import { isChallengeStory, isSideContent } from "@/modules/story/shared/lib";
import type { RynoDividerProps } from "../../../model";
import { getRynoStoryNumber } from "./getRynoStoryNumber";

export const getRynoDividerDefaultSubtitle = (props: RynoDividerProps) => {
	const { t } = useTranslation();
	if (props.story) {
		const storyNumber = getRynoStoryNumber(props.story);
		return (
			isChallengeStory(props.story)
				? `${t("Challenge Scenario")} ${storyNumber}`
				: isSideContent(props.story) && props.story.code !== "zbh"
					? `${t("Standalone Adventure")} ${storyNumber}`
					: `${storyNumber?.toLowerCase()} ${t(props.story.name)}`
		).trim();
	} else {
		return "";
	}
};
