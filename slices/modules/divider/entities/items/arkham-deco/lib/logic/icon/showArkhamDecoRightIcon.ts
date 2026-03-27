import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
} from "../../../model";

type Options = {
	divider: ArkhamDecoDividerProps;
	layout: ArkhamDecoDividerLayout;
	numericXP: boolean;
};
export const showArkhamDecoRightIcon = ({
	divider,
	layout,
	numericXP,
}: Options) => {
	if (layout.params?.tab) {
		return false;
	}
	if (divider.type !== "player") {
		return true;
	}
	if (!divider.xpCost) {
		return true;
	}

	if (numericXP) {
		return false;
	}

	return true;
};
