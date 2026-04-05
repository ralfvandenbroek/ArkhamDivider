import { propEq } from "ramda";
import { isUndefined } from "ramda-adjunct";
import { isChallengeStory, isSideContent } from "@/modules/story/shared/lib";
import type { Story, StoryScenario } from "@/modules/story/shared/model";

const scenarioNumbers: Record<string, string> = {
	// tcu
	disappearance_at_the_twilight_estate: "0",
	return_to_disappearance_at_the_twilight_estate: "0",
	// eoe
	fatal_mirage_2: "5",
	// tfa
	heart_of_the_elders: "5",
	return_to_heart_of_the_elders: "5",
};

export const getRynoScenarioNumber = (
	scenario: StoryScenario,
	story?: Story,
) => {
	const code = scenario.id;
	const override = scenarioNumbers[code];
	if (!isUndefined(override)) {
		return override;
	}
	if (!isUndefined(scenario?.number)) {
		return (
			scenario.number +
			(!isUndefined(scenario.number_text)
				? scenario.number_text.replace(/^[IVX]+-?/, "")
				: "")
		);
	}
	if (
		story &&
		!isChallengeStory(story) &&
		!isSideContent(story) &&
		scenario &&
		story.scenarios
	) {
		return (
			story.scenarios?.findIndex(propEq(scenario.id, "id")) + 1 || ""
		).toString();
	}
	return "";
};
