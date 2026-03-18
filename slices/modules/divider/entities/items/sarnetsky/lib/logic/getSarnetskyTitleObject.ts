import type { DividerType } from "@/modules/divider/shared/model";
import type { SarnetskyDividerObjects } from "../../model";

type Options = {
	objects: SarnetskyDividerObjects;
	type: DividerType;
};

export const getSarnetskyTitleObject = ({ objects: O, type }: Options) => {
	return {
		...O.title.default,
		...O.title[type],
	};
};
