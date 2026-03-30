import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { isNotNil } from "ramda";
import type { ArkhamesqueClassicDividerProps } from "../../../model";
import { findInvestigator, withBuildPrefix } from "./helpers";

type Options = {
	data: IArkhamesqueBuild;
	divider: ArkhamesqueClassicDividerProps;
};

export const getArkhamesqueClassicInvestigatorImage = ({
	data,
	divider,
}: Options): string[] | undefined => {
	if (divider.layoutType !== "investigator") {
		return;
	}

	const investigatorCode = divider.investigator?.code;
	const found = findInvestigator(data, investigatorCode);
	if (!found) {
		return;
	}

	const { categoryPrefix, investigator } = found;
	const parts = [categoryPrefix, investigator.prefix, investigator.name].filter(
		isNotNil,
	);
	const filename = parts.join("");

	return [withBuildPrefix(data, filename)];
};
