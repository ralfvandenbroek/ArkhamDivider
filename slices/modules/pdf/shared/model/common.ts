import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import type {
	DividerLayout,
	DividerWithRelations,
	InvestigatorDividerParams,
	PlayerDividerParams,
	ScenarioDividerParams,
} from "@/modules/divider/shared/model";
import type { DPI } from "@/modules/print/shared/model";
import type { BoxSize } from "@/shared/model";
import type {
	PDFCreaseService,
	PDFIconService,
	PDFImageService,
	PDFLasercutService,
	PDFTextService,
	PDFUnitService,
} from "../lib";

export type PDFDividerProps = DividerWithRelations;
export type PDFDividerContext = {
	dpi: DPI;
	doc: PDFKit.PDFDocument;
	text: PDFTextService;
	icon: PDFIconService;
	unit: PDFUnitService;
	lasercut: PDFLasercutService;
	crease: PDFCreaseService;
	image: PDFImageService;
	layout: DividerLayout;
	bleedEnabled: boolean;
	creaseEnabled: boolean;
	language: string;
	scenarioParams: Partial<ScenarioDividerParams>;
	playerParams: Partial<PlayerDividerParams>;
	investigatorParams: Partial<InvestigatorDividerParams>;
	params?: Record<string, unknown>;
	/** Loaded arkhamesque build data (when slice is injected); used by arkhamesque-classic PDF. */
	arkhamesqueClassicData: IArkhamesqueBuild | null;
};

export type PDFDivider<T = void> = (
	props: PDFPageLayoutItem<DividerWithRelations<T>>,
	context: PDFDividerContext,
) => Promise<void>;

export type PDFPageLayoutItem<T> = T & {
	size: BoxSize;
	position: { x: number; y: number };
};
