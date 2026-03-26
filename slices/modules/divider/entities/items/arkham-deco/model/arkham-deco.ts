import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";

export type ArkhamDecoDividerParams = {
	customTitle?: string;
	background?: Icon | null;
};

export type ArkhamDecoDividerProps =
	DividerWithRelations<ArkhamDecoDividerParams>;

export type ArkhamDecoDividerLayout = DividerLayout;
