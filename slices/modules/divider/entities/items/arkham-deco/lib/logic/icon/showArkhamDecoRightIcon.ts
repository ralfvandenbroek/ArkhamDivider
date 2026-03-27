import type { ArkhamDecoDividerProps } from "../../../model";

type Options = {
	divider: ArkhamDecoDividerProps;
	numericXP: boolean;
};
export const showArkhamDecoRightIcon = ({ divider, numericXP }: Options) => {
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
