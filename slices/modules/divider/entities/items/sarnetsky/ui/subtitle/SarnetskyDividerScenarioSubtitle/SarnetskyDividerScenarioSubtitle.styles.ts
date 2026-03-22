import { alpha } from "@mui/material";
import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = ({ mm }) => ({
	fontFamily: "ArnoPro, serif",
	fontWeight: "bold",
	fontStyle: "italic",
	fontSize: mm(2.5),
	textAlign: "center",
});

export const getOutlineSx: PrintSxCallback = ({ mm }) => ({
	borderWidth: mm(0.3),
	top: mm(-1),
	bottom: mm(-1),
	borderRadius: mm(1),
});

const titleColor = "#2e2622";

export const getClearSx: PrintSxCallback = ({ mm }) => ({
	top: mm(5),
	background: titleColor,
	color: "#fdf8e3",
	"@media screen": {
		"&:hover": {
			background: alpha(titleColor, 0.5),
		},
	},
});
