import {
	arkhamDecoHorizontalObjects,
	arkhamDecoUcfStandardObjects,
} from "../../config";

export const getArkhamDecoLayoutObjects = (layoutId: string) => {
	if (layoutId === "ucf-standard") {
		return arkhamDecoUcfStandardObjects;
	}
	return arkhamDecoHorizontalObjects;
};
