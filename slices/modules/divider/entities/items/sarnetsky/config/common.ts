import type { SarnetskyIcon, SarnetskyIconRecord } from "../model";

export const sarnetskyCategoryId = "sarnetsky";

const leftHorizontalIcon: SarnetskyIcon = {
	id: "left",
	type: "campaign",
	fontSize: 6.2,
	width: 7.1,
	height: 7.1,
	right: 76.6,
	top: 5.6,
	params: {
		scaleType: "circle",
		scaleFactor: {
			circled: 0.9,
		},
	},
};

const rightHorizontalIcon: SarnetskyIcon = {
	id: "right",
	type: "campaign",
	fontSize: 2.4,
	width: 3.2,
	height: 6.1,
	right: 2.8,
	top: 5.9,
};

const centerHorizontalIcon: SarnetskyIcon = {
	id: "center",
	type: "encounter",
	fontSize: 6.4,
	width: 9.8,
	height: 6.1,
	right: 39.6,
	top: 1.5,
};

const horizontalIcons: SarnetskyIconRecord = {
	encounter: [centerHorizontalIcon],
	scenario: [
		{
			...leftHorizontalIcon,
			type: "scenario",
		},
		rightHorizontalIcon,
	],
	campaign: [leftHorizontalIcon, rightHorizontalIcon],
};

export const sarnetskyHorizontalDividerObjects = {
	icons: horizontalIcons,
	title: {
		default: {
			top: 6.5,
			fontSize: 5,
			height: 9.5,
			left: 13.3,
			right: 13.3,
		},
		campaign: {},
		scenario: {},
		encounter: {
			top: 8.5,
			left: 4,
			right: 4,
		},
		player: {},
		investigator: {},
	},
};

const verticalIcons: SarnetskyIconRecord = {
	encounter: [],
	scenario: [],
	campaign: [],
};

export const sarnetskyVerticalDividerObjects = {
	...sarnetskyHorizontalDividerObjects,
	icons: verticalIcons,
};
