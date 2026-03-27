import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { ArkhamDecoDividerSxCallback } from "../../model";

export const getLeftHorizontalCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-2),
	left: 0,
	width: mm(14),
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
	left: 11.1,
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

export const getLeftIconSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: 0,
	left: 0,
	fontSize: mm(O.leftIcon.fontSize),
	width: mm(O.leftIcon.width),
	height: mm(O.leftIcon.height),
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
	right: mm(10.7),
	zIndex: 1,
});

export const getScenarioBackgroundSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-1),
	left: mm(-6.9),
	width: mm(16),
	zIndex: 1,
});

export const getScenarioNumberSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	fontFamily: "Arkhamic",
	lineHeight: 1,
	position: "relative",
	zIndex: 2,
	height: mm(6),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	paddingInline: mm(1.5),
	minWidth: mm(5),
	fontSize: mm(O.scenarioNumber.fontSize),
});

export const getScenarioNumberIconSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: mm(8),
	height: mm(6),
	zIndex: 2,
});
