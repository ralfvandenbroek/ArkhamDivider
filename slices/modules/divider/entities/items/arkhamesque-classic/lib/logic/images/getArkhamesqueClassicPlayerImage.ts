import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { isNotNil } from "ramda";
import { isBoolean, isNumber } from "ramda-adjunct";
import { getXPLevel } from "@/modules/divider/shared/lib";
import type { ArkhamesqueClassicDividerProps } from "../../../model";
import { withBuildPrefix } from "./helpers";

type Options = {
	data: IArkhamesqueBuild;
	divider: ArkhamesqueClassicDividerProps;
};

export const getArkhamesqueClassicPlayerImage = ({
	data,
	divider,
}: Options): string[] | undefined => {
	if (divider.layoutType !== "player") {
		return;
	}

	const found = findPlayerItem(data, divider);
	if (!found) {
		return;
	}

	const { categoryPrefix, item } = found;
	const parts = [categoryPrefix, item.name].filter(isNotNil);
	const filename = parts.join("");

	return [withBuildPrefix(data, filename)];
};

const getDefaultSubtype = (divider: ArkhamesqueClassicDividerProps) => {
	if (divider.layoutType !== "player") {
		return;
	}
	if (divider.faction === "multiclass" && divider.subtype === "investigators") {
		return "faction";
	}
	return divider.subtype;
};

export const findPlayerItem = (
	data: IArkhamesqueBuild,
	divider: ArkhamesqueClassicDividerProps,
) => {
	if (divider.layoutType !== "player") {
		return;
	}
	const xpCost = divider.xpCost ?? undefined;
	const xpLevel = getXPLevel(xpCost);

	// Map divider props to build item fields
	const subtype = getDefaultSubtype(divider);

	const { faction } = divider;
	const type = subtype ?? divider.cardType;

	for (const category of data.player) {
		const match = category.data.find((item) => {
			if (item.faction && item.faction !== faction) {
				return false;
			}
			if (type && item.type !== type) {
				return false;
			}

			// XP matching: numeric for fixed, boolean for "has XP" buckets
			if (isNumber(item.xp)) {
				return isNumber(xpLevel) ? item.xp === xpLevel : false;
			}
			if (isBoolean(item.xp)) {
				return Boolean(xpCost) === item.xp;
			}

			return true;
		});

		if (match) {
			return { categoryPrefix: category.prefix, item: match };
		}
	}
};
