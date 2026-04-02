import { sarnetskyBandAssets } from "@assets/images/background/sarnetsky-band";
import { mergeDeepRight } from "ramda";
import { prefix } from "@/shared/util";
import type { SarnetskyBandImage, SarnetskyBandType } from "../model";

export const sarnetskyBandCategoryId = "sarnetsky-band";

export const sarnetskyBandBaseUrl = "/images/divider/background/sarnetsky-band";

export const sarnetskyBandCampaignObjects = {
	inlinePosition: {
		scenario: "right",
		encounter: "left",
		standalone: "right",
		concealed: "right",
	},
	icon: {
		scenario: {
			inlineValue: 51.1,
			top: 8,
			width: 9.6,
			height: 9.6,
			fontSize: 8.3,
		},
		encounter: {
			inlineValue: 57,
			top: 8,
			width: 9.4,
			height: 9.2,
			fontSize: 10,
		},
		standalone: {
			inlineValue: 148.3,
			top: 8,
			width: 9.6,
			height: 9.6,
			fontSize: 8.3,
		},
	},
	title: {
		scenario: {
			top: 8.3,
			inlineValue: 55.9 + 5,
			fontSize: 5,
			height: 9.6,
			width: 63 - 5,
			textAlign: "center",
		},
		encounter: {
			top: 7,
			inlineValue: 71,
			fontSize: 6,
			height: 12,
			width: 40,
			textAlign: "left",
		},
		standalone: {
			top: 8.3,
			inlineValue: 153.1 + 5,
			fontSize: 5,
			height: 9.6,
			width: 63 - 5,
			textAlign: "center",
		},
		concealed: {
			top: 7.2,
			inlineValue: 50,
			fontSize: 4.25,
			height: 10,
			textAlign: "center",
		},
	},
};

export const sarnetskyBandStandaloneObjects = mergeDeepRight(
	sarnetskyBandCampaignObjects,
	{
		content: {
			left: 0,
			right: 56.8,
		},
		icon: {
			left: 0,
		},
		title: {
			fontSize: 4.6,
		},
	},
);

const asset = prefix(sarnetskyBandBaseUrl);

const imagesWithPrefix = (
	type: "scenario" | "standalone",
): SarnetskyBandImage[] => {
	const assets = sarnetskyBandAssets[type];
	return [
		{
			type: "frame",
			Component: assets.frame,
		},
		{
			type: "variable",
			Component: assets.variable,
		},
		{
			type: "background",
			src: asset(`/background.png`),
		},
	];
};

export const sarnetskyBandImages: Record<
	SarnetskyBandType,
	SarnetskyBandImage[]
> = {
	scenario: imagesWithPrefix("scenario"),
	standalone: imagesWithPrefix("standalone"),
	encounter: [
		{
			type: "variable",
			Component: sarnetskyBandAssets.encounter.variable,
		},
	],
	concealed: [
		{
			type: "background",
			src: asset("/concealed/background.png"),
		},
	],
};
