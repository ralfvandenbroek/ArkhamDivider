import { createContext } from "react";
import type {
	SarnetskyDividerCallbackProps,
	SarnetskyDividerProps,
} from "../../model";

type SarnetskyDividerContextValue = {
	divider: SarnetskyDividerProps;
	sxOptions: SarnetskyDividerCallbackProps;
};

export const SarnetskyDividerContext =
	createContext<SarnetskyDividerContextValue>({
		divider: {} as SarnetskyDividerProps,
		sxOptions: {} as SarnetskyDividerCallbackProps,
	});
