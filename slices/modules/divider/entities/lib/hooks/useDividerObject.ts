import { useEffect } from "react";
import {
	selectDividerParam,
	setDividerParam,
} from "@/modules/divider/shared/lib";
import { getPrintNodeRect, selectDPI } from "@/modules/print/shared/lib";
import { useAppDispatch, useAppSelector, useBoundingRect } from "@/shared/lib";
import type { BoxRect } from "@/shared/model";
import { isBoxRectEquals } from "@/shared/util";

type Options = {
	dividerId: string;
	containerRef: React.RefObject<HTMLElement | null>;
	param: string;
};

export const useDividerObject = ({
	dividerId,
	containerRef,
	param,
}: Options) => {
	const dispatch = useAppDispatch();
	const dpi = useAppSelector(selectDPI);
	const currentRect = useAppSelector(
		selectDividerParam<BoxRect>({ id: dividerId, key: param }),
	);
	const [ref, rect] = useBoundingRect<HTMLElement>();

	useEffect(() => {
		if (!ref.current || !rect || !containerRef.current) {
			return;
		}

		const printRect = getPrintNodeRect({
			node: ref.current,
			container: containerRef.current,
			dpi,
		});

		if (currentRect && isBoxRectEquals(currentRect, printRect)) {
			return;
		}

		dispatch(
			setDividerParam({
				id: dividerId,
				key: param,
				value: printRect,
			}),
		);

		console.log({
			dividerId,
			printRect,
		});
	}, [
		rect,
		dispatch,
		dividerId,
		ref.current,
		containerRef.current,
		dpi,
		currentRect,
		param,
	]);

	return ref;
};
