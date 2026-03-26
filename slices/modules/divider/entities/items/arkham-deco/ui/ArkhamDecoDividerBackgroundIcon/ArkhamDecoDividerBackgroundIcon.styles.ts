import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getBackgroundSx: PrintSxCallback = ({ mm }) => ({
	objectFit: "contain",
	width: "100%",
	height: "100%",
});

export const getSx: PrintSxCallback = ({ mm }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	boxSizing: "border-box",
	paddingBlock: mm(5),
});

export const getIconSx: PrintSxCallback = ({ mm }) => ({
	fontSize: mm(22),
	opacity: 0.3,
});

export const getIconContainerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});
