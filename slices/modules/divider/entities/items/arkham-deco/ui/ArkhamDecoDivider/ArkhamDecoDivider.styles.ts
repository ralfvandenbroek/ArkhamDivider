import type { PrintSxCallback } from "@/modules/print/shared/model";

const headerHeight = 6;

export const getContentSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: mm(0.8),
	right: mm(0.8),
	bottom: mm(0.8),
});

export const getBodySx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(headerHeight),
	left: 0,
	right: 0,
	bottom: 0,
});

export const getSideBorderSx: PrintSxCallback<{
	position: "left" | "right";
}> = ({ mm, position }) => ({
	position: "absolute",
	height: mm(15),
	top: "50%",
	[position]: 0,
	transform:
		position === "left" ? "translateY(-50%) scaleX(-1)" : "translateY(-50%)",
});

export const getBackgroundIconSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 3,
});
