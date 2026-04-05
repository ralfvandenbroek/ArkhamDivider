import { isUndefined } from "ramda-adjunct";
import { isChallengeStory, isSideContent } from "@/modules/story/shared/lib";
import { rynoCampaignFilters } from "../../../config";
import type { RynoDividerProps } from "../../../model";

export const getRynoDividerHeaderFilter = (props: RynoDividerProps) => {
	const { story, id } = props;

	if (story) {
		const code = story.return_to_code || story.code;
		const storyFilter = rynoCampaignFilters[code];
		const svgFilter =
			isUndefined(storyFilter) &&
			(isChallengeStory(story) || isSideContent(story))
				? rynoCampaignFilters.standalone
				: storyFilter;

		if (!isUndefined(svgFilter)) {
			const svgId = `header${id}`;
			return (
				<svg style={{ display: "block" }}>
					<title>Filter</title>
					<filter id={svgId}>
						<feComponentTransfer colorInterpolationFilters="sRGB">
							<feFuncR type="table" tableValues={svgFilter[0]}></feFuncR>
						</feComponentTransfer>
						<feColorMatrix
							colorInterpolationFilters="sRGB"
							type="matrix"
							values="1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 1 0"
						></feColorMatrix>
						<feComponentTransfer colorInterpolationFilters="sRGB">
							<feFuncR type="table" tableValues={svgFilter[1]}></feFuncR>
							<feFuncG type="table" tableValues={svgFilter[2]}></feFuncG>
							<feFuncB type="table" tableValues={svgFilter[3]}></feFuncB>
						</feComponentTransfer>
					</filter>
				</svg>
			);
		}
	}

	return undefined;
};
