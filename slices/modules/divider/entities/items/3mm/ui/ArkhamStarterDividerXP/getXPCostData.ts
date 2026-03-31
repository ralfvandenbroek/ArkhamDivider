import type { XPCost } from "@/modules/divider/shared/model";

export const getXPCostData = (xpCost: XPCost) => {
	if (xpCost.type === "fixed") {
		return {
			key: "divider.3mm.level",
			data: {
				level: xpCost.value,
			},
		};
	}

	return {
		key: "divider.3mm.levelRange",
		data: {
			level: xpCost.min,
			max: xpCost.max,
		},
	};
};
