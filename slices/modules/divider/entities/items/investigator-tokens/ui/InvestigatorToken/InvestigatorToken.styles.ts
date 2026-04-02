import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { Side } from "@/shared/model";

export const containerSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	opacity: 0,
	display: "flex",
	alignItems: "center",
	"@media screen": {
		":hover": {
			opacity: 1,
			backgroundColor: "rgba(0, 0, 0, 0.7)",
		},
	},
});

export const getMenuSx: PrintSxCallback = () => ({
	zoom: 0.5,
	color: "white",
});

export const backgroundSx: PrintSxCallback<{ side: Side }> = ({ side }) => ({
	filter: side === "back" ? "grayscale(1)" : "none",
});
