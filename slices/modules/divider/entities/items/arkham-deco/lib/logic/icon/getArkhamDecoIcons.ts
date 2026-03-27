import { getDividerIcon } from "@/modules/divider/features/lib";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
} from "../../../model";
import { getArkhamDecoDefaultCampaignIcon } from "./getArkhamDecoDefaultCampaignIcon";
import { getArkhamDecoDefaultSecondaryIcon } from "./getArkhamDecoDefaultSecondaryIcon";

type Options = {
	divider: ArkhamDecoDividerProps;
	layout: ArkhamDecoDividerLayout;
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

	if (divider.type === "player") {
		return {
			left: secondaryIcon,
			right: smallIcon,
			center: campaignIcon,
		};
	}

	return {
		left: smallIcon,
		right: campaignIcon,
		center: secondaryIcon,
	};
};
