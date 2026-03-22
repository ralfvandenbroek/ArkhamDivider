import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { isScenarioDividerType } from "../type";

export const getDividerCards = <T = void>(divider: DividerWithRelations<T>) => {
	if (!isScenarioDividerType(divider)) {
		return [];
	}

	return divider.cards ?? [];
};
