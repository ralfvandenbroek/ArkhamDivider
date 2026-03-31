import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getHeaderSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
});

export const getIconCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: mm(8),
	width: mm(13.5),
});
