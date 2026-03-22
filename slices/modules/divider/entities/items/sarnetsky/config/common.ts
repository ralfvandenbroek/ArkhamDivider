import type { SarnetskyIcon, SarnetskyIconRecord } from "../model";

export const sarnetskyCategoryId = "sarnetsky";

const encounterRightIcon: SarnetskyIcon = {
	id: "encounter-right",
	type: "encounter",
	fontSize: 2.8,
	width: 3.2,
	height: 6.1,
	right: 4.2,
	top: 1.9,
	light: true,
};

const leftHorizontalIcon: SarnetskyIcon = {
	id: "left",
	type: "campaign",
	fontSize: 6.4,
	width: 7.1,
	height: 7.1,
	right: 76.5,
	top: 5.7,
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
	top: 0.8,
};

const horizontalIcons: SarnetskyIconRecord = {
	encounter: [centerHorizontalIcon, encounterRightIcon],
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
			left: 15,
			right: 15,
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
		xp: {
			right: 27,
		},
	},
	background: {
		size: 40,
		fontSize: 30,
		top: 19,
		left: 24.5,
		opacity: 0.07,
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
