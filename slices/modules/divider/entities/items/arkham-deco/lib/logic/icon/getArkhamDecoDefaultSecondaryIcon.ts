import type { ArkhamDecoDividerProps } from "../../../model";

export const getArkhamDecoDefaultSecondaryIcon = (
	props: ArkhamDecoDividerProps,
) => {
	if (props.layoutType === "scenario") {
		return;
	}
	return props.faction;
};
