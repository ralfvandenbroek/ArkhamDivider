import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = ({ mm }) => {
	return {
		fontSize: mm(2.5),
		fontFamily: "ArnoPro, serif",
		textAlign: "center",
	};
};

export const getIconSx: PrintSxCallback = ({ mm }) => {
	return {
		position: "relative",
		top: mm(0.3),
	};
};
