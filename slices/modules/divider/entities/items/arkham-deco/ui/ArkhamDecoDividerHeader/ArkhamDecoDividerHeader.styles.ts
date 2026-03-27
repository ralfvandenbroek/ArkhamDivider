import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getLeftHorizontalCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-1.6),
	left: 0,
	width: mm(13.1),
	mixBlendMode: "multiply",
});

export const getLeftVerticalCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	// left: mm(-1.1),
	width: mm(12.9),
	mixBlendMode: "multiply",
});

export const getRightHorizontalScenarioCornerSx: PrintSxCallback = ({
	mm,
}) => ({
	position: "absolute",
	top: mm(-2),
	right: 0,
	width: mm(12.8),
	zIndex: 2,
});

export const getVerticalScenarioCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: mm(11),
});

const topLineCropMm = {
	left: 10.1,
	right: 26.8,
};

export const getTopLineSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(6 - 0.15),
	left: 0,
	width: mm(110),
	clipPath: `inset(0 ${mm(topLineCropMm.right)} 0 ${mm(topLineCropMm.left)})`,
	zIndex: 3,
});

const noIconLineCropMm = {
	left: 10.5,
	right: 10.3,
};

export const getNoIconLineSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	left: mm(-1),
	top: mm(6 - 1.1),
	width: mm(94.4),
	clipPath: `inset(0 ${mm(noIconLineCropMm.right)} 0 ${mm(noIconLineCropMm.left)})`,
	zIndex: 3,
});

export const getLeftIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	fontSize: mm(4.2),
	width: mm(12),
	height: mm(6),
});

export const getRightIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	right: 0,
	fontSize: mm(2.9),
	width: mm(8),
	height: mm(6),
	zIndex: 3,
});

export const getScenarioCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-0.5),
	right: mm(7.5),
	width: mm(14.7),
	zIndex: 1,
});
