import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import type { ArkhamesqueClassicDividerProps } from "../../model";
import { findScenario, findStory } from "./images/helpers";

type Options = {
	data: IArkhamesqueBuild;
	divider: ArkhamesqueClassicDividerProps;
};

export const getArkhamesqueClassicScenarioNumberText = ({
	data,
	divider,
}: Options) => {
	if (divider.layoutType !== "scenario") {
		return;
	}

	const storyCode = divider.story?.return_to_code ?? divider.storyCode;
	const story = findStory(data, storyCode);
	if (!story) {
		return;
	}

	// Mirrors scenario image matching: map scenario to its build code.
	const scenarioCode =
		divider.type === "scenario" && "scenario" in divider
			? divider.scenario?.id
			: undefined;
	const scenario = findScenario(story, scenarioCode);

	return (
		scenario?.number_text ??
		(divider.type === "scenario" && "scenario" in divider
			? divider.scenario?.number_text
			: undefined)
	);
};
