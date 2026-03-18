import { alpha } from "@mui/material/styles";
import {
	getIsSarnetskyLightTitleColor,
	getSarnetskyTitleObject as getTitleObject,
} from "../../lib";
import type {
	SarnetskyDividerLocaleCallback,
	SarnetskyDividerSxCallback,
} from "../../model";

export const getTitleSx: SarnetskyDividerLocaleCallback = (params) => {
	const { mm } = params;
	const O = getTitleObject(params);
	const isLightColor = getIsSarnetskyLightTitleColor(params);
	const color = isLightColor ? "#fff" : "#000";

	return {
		default: {
			fontSize: mm(5),
			fontFamily: "Arkhamic, Teutonic, serif",
			textAlign: "center",
			position: "absolute",
			top: mm(O.top),
			height: mm(O.height),
			left: mm(O.left),
			right: mm(O.right),
			color,
		},
		ru: {
			fontFamily: "Conkordia, Arkhamic, Teutonic, serif",
		},
		cn: {
			fontFamily: "FZLiBian, Arkhamic, Teutonic, serif",
		},
		ko: {
			fontFamily: "SanCn, Arkhamic, Teutonic, serif",
		},
	};
};

export const getOutlineSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	borderRadius: mm(1),
	top: mm(-1.7),
	bottom: mm(3),
});

export const getStrokeSx: SarnetskyDividerSxCallback = () => ({
	position: "absolute",
	color: "transparent",
	zIndex: -1,
});

const titleColor = "#2e2622";

export const getTitleClearSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	top: `calc(100% + ${mm(1)})`,
	background: titleColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
});

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
