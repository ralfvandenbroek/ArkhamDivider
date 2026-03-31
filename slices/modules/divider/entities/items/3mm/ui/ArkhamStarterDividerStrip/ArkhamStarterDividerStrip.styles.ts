import type { PrintSxCallback } from "@/modules/print/shared/model";

/*
    border-bottom-right-radius: 100% 10%;
    mix-blend-mode: multiply;
    transform: translateZ(0);
*/

export const getColorSx: PrintSxCallback = () => ({
	position: "absolute",
	left: "7%",
	right: 0,
	top: "22%",
	bottom: "34%",
	mixBlendMode: "multiply",
	transform: "translateZ(0)",
	borderBottomLeftRadius: "18% 100%",
	clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 8.6% 100%)",
	zIndex: 1,
});

export const getTopColorSx: PrintSxCallback = () => ({
	position: "absolute",
	left: "7%",
	right: 0,
	top: "22%",
	bottom: "34%",
	mixBlendMode: "multiply",
	transform: "translateZ(0)",
	borderBottomLeftRadius: "18% 100%",
	clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 8.6% 100%)",
	zIndex: 1,
});
