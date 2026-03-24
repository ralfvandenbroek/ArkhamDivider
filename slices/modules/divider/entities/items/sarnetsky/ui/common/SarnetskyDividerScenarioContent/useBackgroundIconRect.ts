import { useContext, useEffect } from "react";
import {
	selectDividerParam,
	setDividerParam,
} from "@/modules/divider/shared/lib";
import { getPrintNodeRect, selectDPI } from "@/modules/print/shared/lib";
import { useAppDispatch, useAppSelector, useBoundingRect } from "@/shared/lib";
import type { BoxRect } from "@/shared/model";
import { isBoxRectEquals } from "@/shared/util";
import { SarnetskyDividerContext } from "../../SarnetskyDividerContext";

type Options = {
	dividerId: string;
};

export const useBackgroundIconRect = ({ dividerId }: Options) => {
	const dispatch = useAppDispatch();
	const dpi = useAppSelector(selectDPI);
	const backgroundIconRect = useAppSelector(
		selectDividerParam<BoxRect>({ id: dividerId, key: "backgroundIconRect" }),
	);
	const { containerRef } = useContext(SarnetskyDividerContext);
	const [ref, rect] = useBoundingRect<HTMLDivElement>();

	useEffect(() => {
		if (!ref.current || !rect || !containerRef.current) {
			return;
		}

		const printRect = getPrintNodeRect({
			node: ref.current,
			container: containerRef.current,
			dpi,
		});

		if (backgroundIconRect && isBoxRectEquals(backgroundIconRect, printRect)) {
			return;
		}

		dispatch(
			setDividerParam({
				id: dividerId,
				key: "backgroundIconRect",
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
		backgroundIconRect,
	]);

	return ref;
};
