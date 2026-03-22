import type { Divider } from "@/modules/divider/shared/model";
import { isScenarioDividerType } from "../type";

export const getDividerCardsCount = <T = void>(divider: Divider<T>) => {
	if (isScenarioDividerType(divider)) {
		return divider.cardsCount;
	}
	return;
};
