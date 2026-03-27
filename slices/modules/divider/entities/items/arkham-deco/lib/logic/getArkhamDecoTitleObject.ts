import type { DividerType } from "@/modules/divider/shared/model";
import type { ArkhamDecoLayoutObjects } from "../../model";

type Options = {
	type?: DividerType;
	objects: ArkhamDecoLayoutObjects;
};
export const getArkhamDecoTitleObject = ({ type, objects }: Options) => {
	switch (type) {
		case "campaign":
		case "scenario":
			return {
				...objects.title.default,
				...objects.title[type],
			};
	}

	return objects.title.default;
};
