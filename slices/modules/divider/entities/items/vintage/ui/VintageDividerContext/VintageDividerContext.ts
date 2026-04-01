import { createContext, useContext } from "react";
import type {
	VintageDividerLayout,
	VintageDividerProps,
	VintageDividerSxOptions,
} from "../../model";

export type VintageDividerContextValue = {
	divider: VintageDividerProps;
	layout: VintageDividerLayout;
	sxOptions: VintageDividerSxOptions;
};

export const VintageDividerContext = createContext<VintageDividerContextValue>({
	divider: {} as VintageDividerProps,
	layout: {} as VintageDividerLayout,
	sxOptions: {} as VintageDividerSxOptions,
});

export const useVintageDividerContext = () => {
	return useContext(VintageDividerContext);
};
