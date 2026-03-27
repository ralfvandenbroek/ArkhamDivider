import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerType,
	DividerWithRelations,
	XPCost,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getArkhamDecoLayoutObjects } from "../lib";

export type ArkhamDecoDividerParams = {
	customTitle?: string;
	smallIcon?: Icon | null;
	campaignIcon?: Icon | null;
	backgroundIcon?: Icon | null;
	secondaryIcon?: Icon | null;
};

export type ArkhamDecoDividerSxOptions = {
	objects: ArkhamDecoLayoutObjects;
	type?: DividerType;
	xpCost?: XPCost | null;
	sideXP?: boolean;
};

export type ArkhamDecoLayoutParams = {
	tabInlineMargin?: number;
};

export type ArkhamDecoPosition = "left" | "right";

export type ArkhamDecoDividerProps =
	DividerWithRelations<ArkhamDecoDividerParams>;

export type ArkhamDecoDividerLayout = DividerLayout<ArkhamDecoLayoutParams>;

export type ArkhamDecoLayoutObjects = ReturnType<
	typeof getArkhamDecoLayoutObjects
>;

export type ArkhamDecoDividerSxCallback =
	PrintSxCallback<ArkhamDecoDividerSxOptions>;

export type ArkhamDecoDividerLocaleSxCallback =
	LocaleSxCallback<ArkhamDecoDividerSxOptions>;
