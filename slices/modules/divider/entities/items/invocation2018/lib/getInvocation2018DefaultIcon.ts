import { getDividerIcon } from "@/modules/divider/features/lib";
import type { Divider } from "@/modules/divider/shared/model";
import { getFactionIcon } from "@/modules/faction/shared/lib";

export const getInvocation2018DefaultIcon = (props: Divider) => {
	const icon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: props.icon,
	});

	if ("faction" in props && getFactionIcon(props.faction) === icon) {
		return;
	}
	return icon;
};
