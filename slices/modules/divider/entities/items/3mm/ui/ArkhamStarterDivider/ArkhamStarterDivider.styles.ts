import type { PrintSxCallback } from "@/modules/print/shared/model";
import { arkhamStarterSharedPositions as P } from "../../config";

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
	bottom: mm(P.sideHeaderBox.bottom),
	left: mm(P.sideHeaderBox.left),
	width: mm(P.sideHeaderBox.width),
	height: mm(P.sideHeaderBox.height),
	transformOrigin: "bottom left",

	transform: "rotate(-90deg)",
	zIndex: -1,
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: `calc(50% + ${mm(4)})`,
	transform: "translateY(-50%)",
	left: mm(10),
	width: mm(67),
	height: mm(3.3),
	opacity: 0.8,
	zIndex: 2,
});
