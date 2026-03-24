import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";

export const getSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: 0,
	right: 0,
	width: mm(4),
	height: mm(4),
	borderRadius: "50%",
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(50),
		},
	},
});
