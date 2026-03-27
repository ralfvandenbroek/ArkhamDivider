import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import { selectPlayerParams } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic/params";
import { useAppSelector } from "@/shared/lib";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
	ArkhamDecoDividerSxOptions,
} from "../../model";
import { getArkhamDecoLayoutObjects } from "../logic";

export function useArkhamDecoSxOptions(divider: ArkhamDecoDividerProps) {
	const layout = useAppSelector(selectLayout) as ArkhamDecoDividerLayout;
	const { sideXP } = useAppSelector(selectPlayerParams);
	const layoutId = layout.id;
	const { orientation } = layout;
	const { type } = divider;

	const xpCost = getDividerXPCost(divider);

	return useMemo((): ArkhamDecoDividerSxOptions => {
		const objects = getArkhamDecoLayoutObjects({ layoutId, orientation });
		return {
			objects,
			type,
			xpCost,
			sideXP,
		};
	}, [type, layoutId, orientation, xpCost, sideXP]);
}
