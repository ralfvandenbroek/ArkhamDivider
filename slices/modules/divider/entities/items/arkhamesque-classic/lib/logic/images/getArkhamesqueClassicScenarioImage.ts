import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import type { ArkhamesqueClassicDividerProps } from "../../../model";
import { findScenario, withBuildPrefix } from "./helpers";

type Options = {
	data: IArkhamesqueBuild;
	divider: ArkhamesqueClassicDividerProps;
};

export const getArkhamesqueClassicScenarioImage = ({
	data,
	divider,
}: Options): string[] | undefined => {
	if (divider.layoutType !== "scenario") {
		return;
	}

	const storyCode = divider.story?.return_to_code ?? divider.storyCode;
	const story = findStory(data, storyCode);
	if (!story) {
		return;
	}

	// For scenario dividers, try to match by scenario code; otherwise fall back to the story image.
	const scenarioCode =
		divider.type === "scenario" ? divider.scenario?.icon : undefined;
	const scenario = findScenario(story, scenarioCode);

	const filename = scenario ? `${story.name}${scenario.name}` : story.name;

	return [withBuildPrefix(data, filename)];
};

export const findStory = (
	data: IArkhamesqueBuild,
	code: string | undefined,
) => {
	if (!code) {
		return;
	}
	for (const category of data.stories) {
		const match = category.data.find((s) => s.code === code);
		if (match) {
			return match;
		}
	}
};
