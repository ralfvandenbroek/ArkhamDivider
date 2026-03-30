import type { Icon } from "@/modules/core/icon/shared/model";
import type { DividerWithRelations } from "@/modules/divider/shared/model";

export type ArkhamesqueClassicDividerParams = {
	icon?: Icon | null;
	customTitle?: string;
	campaignIcon?: Icon | null;
};

export type ArkhamesqueClassicDividerProps =
	DividerWithRelations<ArkhamesqueClassicDividerParams>;
