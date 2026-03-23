import {
	getIsSarnetskyLightTitleColor,
	getSarnetskyTitleObject as getTitleObject,
} from "../../lib";
import type { SarnetskyDividerSxCallback } from "../../model";

export const getTitleSx: SarnetskyDividerSxCallback = (params) => {
	const { mm } = params;
	const O = getTitleObject(params);

	return {
		position: "absolute",
		top: mm(O.top),
		height: mm(O.height),
		left: mm(O.left),
		right: mm(O.right),
		zIndex: 4,
	};
};

export const getSx: SarnetskyDividerSxCallback = (params) => {
	const isLight = getIsSarnetskyLightTitleColor(params);
	const color = isLight ? "#fff" : "#000";

	return {
		color,
	};
};

export const getRadialXPSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(5.8),
	right: mm(5.3),
	fontSize: mm(6.4),
	zIndex: 3,
});

export const getInlineXPSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(8),
	right: mm(16.5),
	fontSize: mm(2),
	zIndex: 3,
});

export const getScenarioSubtitleSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(17.5),
	right: mm(16.5),
	left: mm(16.5),
	zIndex: 3,
});

export const getPlayerSubtitleSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(16.8),
	right: mm(16.5),
	left: mm(16.5),
	zIndex: 3,
});

export const getScenarioContentSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.scenarioContent.top),
	left: mm(O.scenarioContent.left),
	right: mm(O.scenarioContent.right),
	bottom: mm(O.scenarioContent.bottom),
	zIndex: 3,
});
