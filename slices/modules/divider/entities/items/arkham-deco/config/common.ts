import { mergeDeepRight } from "ramda";

export const arkhamDecoCategoryId = "arkham-deco";

export const arkhamDecoAssetUrl = "/images/divider/background/arkham-deco";

export const arkhamDecoHorizontalObjects = {
	header: {
		height: 6,
		left: 0,
		right: 0,
	},
	leftIcon: {
		offsetTop: 0,
		fontSize: 4.2,
		width: 10.5,
		height: 6,
	},
	centralIcon: {
		offsetTop: 1.3,
		fontSize: 2.5,
	},
	rightIcon: {
		fontSize: 2.9,
		width: 8,
		height: 6,
	},
	line: {
		default: {
			offsetTop: 1.8,
		},
		noIcon: {
			offsetTop: 1.1,
		},
		tentacles: {
			offsetTop: 1,
		},
	},
	title: {
		default: {
			height: 6,
			fontSize: 4,
			top: 0,
			left: 15,
			right: 9.5,
			textAlign: "left",
		},
		campaign: {
			textAlign: "center",
			right: 15,
		},
		scenario: {
			right: 25,
		},
		xp: {
			right: 25,
		},
	},

	scenarioCorner: {
		top: 0,
		right: 10.7,
	},
	scenarioNumber: {
		fontSize: 4,
		height: 6,
	},
};

export const arkhamDecoUcfStandardObjects = mergeDeepRight(
	arkhamDecoHorizontalObjects,
	{
		header: {
			height: 4.9,
			left: 17,
			right: 17,
		},
		title: {
			default: {
				top: -0.2,
				height: 3.8,
				left: 23,
				right: 23,
			},
		},
		leftIcon: {
			offsetTop: 0.1,
			fontSize: 3.2,
			width: 6,
			height: 4.3,
		},
		centralIcon: {
			offsetTop: 0.9,
			fontSize: 3,
		},
		scenarioCorner: {
			right: 17,
		},
		scenarioNumber: {
			fontSize: 3.5,
			height: 4.3,
		},
	},
);

export const arkhamDecoUCF50bjects = mergeDeepRight(
	arkhamDecoUcfStandardObjects,
	{
		header: {
			left: 21,
			right: 21,
		},
	},
);
