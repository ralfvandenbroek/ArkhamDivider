import { mergeDeepRight } from "ramda";

export const vintageDividerObjects = {
	title: {
		default: {
			top: 36.7,
			left: 5,
			right: 5,
			height: 8.2,
			fontSize: 8,
		},
		ru: {},
	},
	topTitle: {
		default: {
			top: 10.2,
			left: 5.8,
			right: 5.8,
			fontSize: 5,
			height: 6.6,
		},
		ru: {},
	},
};

export const vintageDividerVerticalObjects = mergeDeepRight(
	vintageDividerObjects,
	{
		title: {},
	},
);
