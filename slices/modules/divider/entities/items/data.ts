import { prop } from "ramda";
import type { DividerCategory } from "../../shared/model";
import { arkhamStarterDividerCategory } from "./3mm/config";
import { arkhamDecoCategory } from "./arkham-deco/config";
import { arkhamesqueClassicCategory } from "./arkhamesque-classic/config";
import { classicCategory } from "./classic/config";
import { invocation2018Category } from "./invocation2018/config";
import { rynoCategory } from "./ryno/config";
import { sarnetskyCategory } from "./sarnetsky/config/category";
import { vintageCategory } from "./vintage/config";

/** Categories/layouts only — no UI imports. Use this from shared to avoid circular deps. */
export const dividerCategories: DividerCategory[] = [
	classicCategory,
	invocation2018Category,
	arkhamesqueClassicCategory,
	rynoCategory,
	sarnetskyCategory,
	arkhamDecoCategory,
	arkhamStarterDividerCategory,
	vintageCategory,
];

export const dividerLayouts = dividerCategories.flatMap(prop("layouts"));
