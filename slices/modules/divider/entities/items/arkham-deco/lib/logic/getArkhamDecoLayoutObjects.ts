import type { DividerOrientation } from "@/modules/divider/shared/model";
import { arkhamDecoHorizontalObjects } from "../../config";

type Options = {
	layoutId: string;
	orientation: DividerOrientation;
};
export const getArkhamDecoLayoutObjects = (_: Options) => {
	return arkhamDecoHorizontalObjects;
};
