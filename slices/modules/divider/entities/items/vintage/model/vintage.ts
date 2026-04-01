import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getVintageDividerObjects } from "../lib";

export type VintageDividerParams = {
	icon?: Icon;
	customTitle?: string;
	tabColor?: string;
	tabIndex?: number;
};

export type VintageDividerProps = DividerWithRelations;

export type VintageDividerLayoutParams = {
	tabWidth: number;
};

export type VintageDividerLayout = DividerLayout<VintageDividerLayoutParams>;

export type VintageDividerObjects = ReturnType<typeof getVintageDividerObjects>;

export type VintageDividerSxOptions = {
	objects: VintageDividerObjects;
};

export type VintageDividerSxCallback = PrintSxCallback<VintageDividerSxOptions>;

export type VintageDividerLocaleSxCallback =
	LocaleSxCallback<VintageDividerSxOptions>;
