import { createContext } from "react";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
	ArkhamDecoDividerSxOptions,
	ArkhamDecoLayoutObjects,
} from "../../model";

type ArkhamDecoDividerContextProps = {
	divider: ArkhamDecoDividerProps;
	layout: ArkhamDecoDividerLayout;
	objects: ArkhamDecoLayoutObjects;
	sxOptions: ArkhamDecoDividerSxOptions;
};
export const ArkhamDecoDividerContext =
	createContext<ArkhamDecoDividerContextProps>({
		divider: {} as ArkhamDecoDividerProps,
		layout: {} as ArkhamDecoDividerLayout,
		objects: {} as ArkhamDecoLayoutObjects,
		sxOptions: {} as ArkhamDecoDividerSxOptions,
	});
