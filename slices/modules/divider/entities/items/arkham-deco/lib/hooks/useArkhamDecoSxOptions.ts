import { useMemo } from "react";
import { selectLayout } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
	ArkhamDecoDividerSxOptions,
} from "../../model";
import { getArkhamDecoLayoutObjects } from "../logic";

export function useArkhamDecoSxOptions(divider: ArkhamDecoDividerProps) {
	const layout = useAppSelector(selectLayout) as ArkhamDecoDividerLayout;
	const layoutId = layout.id;
	const { orientation } = layout;
	const { type } = divider;

	return useMemo((): ArkhamDecoDividerSxOptions => {
		const objects = getArkhamDecoLayoutObjects({ layoutId, orientation });
		return {
			objects,
			type,
		};
	}, [type, layoutId, orientation]);
}
