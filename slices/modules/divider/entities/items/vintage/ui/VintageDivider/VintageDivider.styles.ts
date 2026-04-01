import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { VintageDividerLocaleSxCallback } from "../../model";

export const getTitleSx: VintageDividerLocaleSxCallback = ({
	mm,
	objects: O,
}) => ({
	default: {
		position: "absolute",
		top: mm(O.title.default.top),
		left: mm(O.title.default.left),
		right: mm(O.title.default.right),
		height: mm(O.title.default.height),
	},
});

export const getTopTitleSx: VintageDividerLocaleSxCallback = ({
	mm,
	objects: O,
}) => ({
	default: {
		position: "absolute",
		top: mm(O.topTitle.default.top),
		left: mm(O.topTitle.default.left),
		right: mm(O.topTitle.default.right),
		height: mm(O.topTitle.default.height),
	},
});

export const getMenuSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 6,
	right: 6,
});

export const getBodySx: PrintSxCallback = () => ({
	position: "absolute",
	zIndex: 1,
	left: 0,
	right: 0,
	bottom: 0,
});
