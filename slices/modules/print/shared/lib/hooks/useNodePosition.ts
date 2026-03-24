import { useCallback } from "react";
import { getPrintNodeRect, selectDPI } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import type { BoxRect } from "@/shared/model";

type Options = {
	ref: React.RefObject<HTMLElement>;
	onRender: (rect: BoxRect) => void;
};
export const useNodePosition = ({ ref, onRender }: Options) => {
	const dpi = useAppSelector(selectDPI);

	const refCallback = useCallback(
		(node?: HTMLElement) => {
			if (!node) {
				return;
			}
			if (!ref.current) {
				return;
			}
			const rect = getPrintNodeRect({
				node,
				container: ref.current,
				dpi,
			});
			onRender(rect);
		},
		[ref.current, dpi, onRender],
	);

	return refCallback;
};
