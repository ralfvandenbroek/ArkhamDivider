import { getDividerIcon } from "@/modules/divider/features/lib";
import type { ArkhamDecoDividerProps, ArkhamDecoLayout } from "../../../model";
import { getArkhamDecoDefaultCampaignIcon } from "./getArkhamDecoDefaultCampaignIcon";
import { getArkhamDecoDefaultSecondaryIcon } from "./getArkhamDecoDefaultSecondaryIcon";

type Options = {
	divider: ArkhamDecoDividerProps;
	layout: ArkhamDecoLayout;
};

export const getArkhamDecoIcons = ({ divider, layout }: Options) => {
	const defaultCampaignIcon = getArkhamDecoDefaultCampaignIcon(divider);
	const defaultSecondaryIcon = getArkhamDecoDefaultSecondaryIcon(divider);

	const smallIcon = getDividerIcon({
		divider,
		param: "smallIcon",
		defaultIcon: divider.icon,
	});

	const campaignIcon = getDividerIcon({
		divider,
		param: "campaignIcon",
		defaultIcon: defaultCampaignIcon,
	});

	const secondaryIcon = getDividerIcon({
		divider,
		param: "secondaryIcon",
		defaultIcon: defaultSecondaryIcon,
	});

	if (layout.params?.tabInlineMargin) {
		return {
			left: smallIcon,
			right: secondaryIcon,
			center: campaignIcon,
		};
	}

	if (divider.type === "campaign") {
		return {
			left: null,
			right: campaignIcon,
			center: secondaryIcon,
		};
	}

	return {
		left: smallIcon,
		right: campaignIcon,
		center: secondaryIcon,
	};
};
