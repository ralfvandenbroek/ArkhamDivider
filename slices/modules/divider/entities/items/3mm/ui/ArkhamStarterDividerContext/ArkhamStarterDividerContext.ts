import { createContext, useContext } from "react";
import type { ArkhamStarterDividerProps } from "../../model";

type ArkhamStarterDividerContextValue = {
	divider: ArkhamStarterDividerProps;
};

export const ArkhamStarterDividerContext =
	createContext<ArkhamStarterDividerContextValue>({
		divider: {} as ArkhamStarterDividerProps,
	});

export const useArkhamStarterDividerContext = () =>
	useContext(ArkhamStarterDividerContext);
