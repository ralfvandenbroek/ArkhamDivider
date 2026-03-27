import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getSx: PrintSxCallback = () => ({
	mixBlendMode: "color",
	opacity: 0.5,
	zIndex: 1,
});
