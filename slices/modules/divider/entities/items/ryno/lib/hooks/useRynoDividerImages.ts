import { useMemo } from "react";
import { selectLayoutId } from "@/modules/divider/shared/lib";
import type { DividerType } from "@/modules/divider/shared/model";
import { useAppSelector } from "@/shared/lib";
import { getRynoDividerImages } from "../logic";

export const useRynoDividerImages = (type: DividerType) => {
	const layoutId = useAppSelector(selectLayoutId) as string;

	return useMemo(() => {
		return getRynoDividerImages({ layoutId, type });
	}, [layoutId, type]);
};
