import type { PDFDivider } from "@/modules/pdf/shared/model";
import { arkhamDecoCategoryId } from "./arkham-deco/config";
import { ArkhamDecoDividerPDF } from "./arkham-deco/ui";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDividerPDF } from "./classic/ui";
import { invocation2018CategoryId } from "./invocation2018/config";
import { Invocation2018DividerPDF } from "./invocation2018/ui/Invocation2018DividerPDF";
import { rynoCategoryId } from "./ryno/config/common";
import { RynoDividerPDF } from "./ryno/ui/pdf";
import { sarnetskyCategoryId } from "./sarnetsky/config";
import { SarnetskyDividerPDF } from "./sarnetsky/ui";

// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
export const dividerPDFComponents: Record<string, PDFDivider<any>> = {
	[arkhamDecoCategoryId]: ArkhamDecoDividerPDF,
	[classicCategoryId]: ClassicDividerPDF,
	[invocation2018CategoryId]: Invocation2018DividerPDF,
	[rynoCategoryId]: RynoDividerPDF,
	[sarnetskyCategoryId]: SarnetskyDividerPDF,
};
