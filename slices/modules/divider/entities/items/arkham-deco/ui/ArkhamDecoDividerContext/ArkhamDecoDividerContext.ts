import { createContext } from "react";
import type {
	ArkhamDecoDividerLayout,
	ArkhamDecoDividerProps,
} from "../../model";

type ArkhamDecoDividerContextProps = {
	divider: ArkhamDecoDividerProps;
	layout: ArkhamDecoDividerLayout;
};
export const ArkhamDecoDividerContext =
	createContext<ArkhamDecoDividerContextProps>({
		divider: {} as ArkhamDecoDividerProps,
		layout: {} as ArkhamDecoDividerLayout,
	});
