import type { DividerType } from "@/modules/divider/shared/model";
import { prefix } from "@/shared/util";
import { rynoDividerAssetsBaseUrl } from "../../../config";

const asset = prefix(rynoDividerAssetsBaseUrl);

type Options = {
	layoutId: string;
	type: DividerType;
};

export const getRynoDividerImages = (options: Options) => {
	const { layoutId, type } = options;

	const layoutMap: Record<string, string> = {
		ryno: "horizontal",
		"ryno-vertical": "vertical",
		"ryno-vertical-xl": "vertical-xl",
	};

	const id = layoutMap[layoutId] ?? layoutMap.ryno;

	const typePrefix = type === "player" ? "player-" : "";

	return {
		body: asset`/body_${id}.avif`,
		header: asset`/header_${typePrefix}${id}.avif`,
		corner: asset`/corner_${typePrefix}${id}.avif`,
		xp: asset`/xp.avif`,
	};
};
