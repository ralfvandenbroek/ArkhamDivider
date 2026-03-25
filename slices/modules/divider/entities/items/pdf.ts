import type { PDFDivider } from "@/modules/pdf/shared/model";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDividerPDF } from "./classic/ui";
import { invocation2018CategoryId } from "./invocation2018/config";
import { Invocation2018DividerPDF } from "./invocation2018/ui/Invocation2018DividerPDF";
import { sarnetskyCategoryId } from "./sarnetsky/config";
import { SarnetskyDividerPDF } from "./sarnetsky/ui";

// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
export const dividerPDFComponents: Record<string, PDFDivider<any>> = {
	[classicCategoryId]: ClassicDividerPDF,
	[invocation2018CategoryId]: Invocation2018DividerPDF,
	[sarnetskyCategoryId]: SarnetskyDividerPDF,
};
