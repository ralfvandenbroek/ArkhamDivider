import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectStories } from "../stories";
import { selectStory } from "./selectStory";

export const selectReturnStory = createSelector(
	[selectStory, selectStories],
	(story, stories) => {
		if (!story) {
			return;
		}
		return stories.find(propEq(story.return_to_code, "code"));
	},
);
