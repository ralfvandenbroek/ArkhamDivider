import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getBackgroundSx: PrintSxCallback = () => ({
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
	top: "1px",
	left: "1px",
});

export const getIconSelectionSx: PrintSxCallback = () => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "40%",
	aspectRatio: 1,
	borderRadius: "50%",
	zIndex: 5,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			background: "rgba(255, 255, 255, 0.5)",
		},
	},
});

export const getIconContainerSx: PrintSxCallback = () => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});
