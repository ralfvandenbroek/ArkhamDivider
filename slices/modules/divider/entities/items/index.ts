import type { PDFDivider } from "@/modules/pdf/shared/model";
import type { DividerWithRelations } from "../../shared/model";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDivider, ClassicDividerPDF } from "./classic/ui";
import { dividerCategories, dividerLayouts } from "./data";
import { invocation2018CategoryId } from "./invocation2018/config";
import { Invocation2018Divider } from "./invocation2018/ui";
import { Invocation2018DividerPDF } from "./invocation2018/ui/Invocation2018DividerPDF";
import { sarnetskyCategoryId } from "./sarnetsky/config";
import { SarnetskyDivider } from "./sarnetsky/ui";

export { dividerCategories, dividerLayouts, invocation2018CategoryId };

export const dividerComponents: Record<
	string,
	// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
	React.ComponentType<DividerWithRelations<any>>
> = {
	[classicCategoryId]: ClassicDivider,
	[invocation2018CategoryId]: Invocation2018Divider,
	[sarnetskyCategoryId]: SarnetskyDivider,
};

// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
export const dividerPDFComponents: Record<string, PDFDivider<any>> = {
	[classicCategoryId]: ClassicDividerPDF,
	[invocation2018CategoryId]: Invocation2018DividerPDF,
};
