import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getHeaderSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
});

export const getHorizontalCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: mm(8),
});

export const getCornerImageSx: PrintSxCallback = ({ mm }) => ({
	width: mm(13.5),
});

export const getVerticalCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(5.5),
	left: mm(-2.5),
	transform: "rotate(-90deg)",
});

export const getSideHeaderSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(0),
	left: mm(3.1),
	width: mm(67),
	height: mm(3.3),
	transformOrigin: "bottom left",

	transform: "rotate(-90deg)",
	zIndex: -1,
});
