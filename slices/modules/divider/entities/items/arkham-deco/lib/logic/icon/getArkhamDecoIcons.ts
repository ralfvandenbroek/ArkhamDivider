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

	const small = {
		icon: smallIcon,
		param: "smallIcon",
		defaultIcon: divider.icon,
	};

	const secondary = {
		icon: secondaryIcon,
		param: "secondaryIcon",
		defaultIcon: defaultSecondaryIcon,
	};

	const campaign = {
		icon: campaignIcon,
		param: "campaignIcon",
		defaultIcon: defaultCampaignIcon,
	};

	if (layout.params?.tabInlineMargin) {
		return {
			left: small,
			right: secondary,
			center: campaign,
		};
	}

	if (divider.type === "campaign") {
		return {
			left: null,
			right: campaign,
			center: null,
		};
	}

	if (divider.type === "player") {
		return {
			left: secondary,
			right: small,
			center: campaign,
		};
	}

	if (divider.type === "investigator") {
		return {
			left: small,
			right: secondary,
			center: campaign,
		};
	}

	return {
		left: small,
		right: campaign,
		center: null,
	};
};
