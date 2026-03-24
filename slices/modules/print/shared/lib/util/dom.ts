import type { BoxRect } from "@/shared/model";
import { getNodeRect, round } from "@/shared/util";
import { INCH_TO_MM } from "../../config";
import type { DPI } from "../../model";

type Key = keyof BoxRect;

export const getPrintNodeRect = (options: {
	node: HTMLElement;
	container: HTMLElement;
	dpi: DPI;
	precision?: number;
}) => {
	const { dpi, precision = 2 } = options;
	const data = getNodeRect(options);

	const keys = Object.keys(data) as Key[];

	return keys.reduce((acc, key) => {
		const px = data[key];
		acc[key] = round((px * INCH_TO_MM) / dpi, precision);
		return acc;
	}, {} as BoxRect);
};
