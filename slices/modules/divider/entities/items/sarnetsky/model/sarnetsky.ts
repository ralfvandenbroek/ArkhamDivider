import type { BaseIconProps } from "@/modules/core/icon/shared/model";
import type {
	DividerType,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { getSarnetskyLayoutObjects } from "../lib";

export type SarnetskyDividerParams = {
	blankBackSide?: boolean;
};

export type SarnetskyDividerProps =
	DividerWithRelations<SarnetskyDividerParams>;

export type SarnetskyIcon = {
	id: string;
	type: DividerType;
	fontSize: number;
	height: number;
	width: number;
	right: number;
	top: number;
	params?: BaseIconProps;
};

export type SarnetskyIconRecord = Partial<Record<DividerType, SarnetskyIcon[]>>;

export type SarnetskyDividerObjects = ReturnType<
	typeof getSarnetskyLayoutObjects
>;
