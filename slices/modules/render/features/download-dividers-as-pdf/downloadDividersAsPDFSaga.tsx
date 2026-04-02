import type { IArkhamesqueBuild } from "arkhamesque-classic-divider-data";
import { Buffer } from "buffer";
import { last } from "ramda";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import streamSaver from "streamsaver";
import { selectArkhamesqueClassicData } from "@/modules/divider/entities/items/arkhamesque-classic/lib/store/arkhamesqueClassic";
import { getDividerPageLayouts } from "@/modules/divider/entities/lib/logic";
import { loadDividerPDFComponent } from "@/modules/divider/entities/lib/runtime";
import {
	destroyPDFDocument,
	getPDFPageLayouts,
	PDFCounterService,
	PDFCreaseService,
	PDFCropmarkService,
	PDFFontService,
	PDFIconService,
	PDFImageService,
	PDFLasercutService,
	PDFTextService,
	PDFUnitService,
} from "@/modules/pdf/shared/lib";
import {
	fromPx2Pt,
	getPageSize,
	getUnitSizePx,
} from "@/modules/print/shared/lib";
import type { ReturnAwaited } from "@/shared/model";
import type { RootState } from "@/shared/store";
import {
	finishRender,
	getVips,
	renderDivider,
	setDividerRenderId,
	setHideIconNodes,
	setHideTextNodes,
	setRenderProgress,
	setRenderProgressTotal,
	setRenderStatusMessage,
	setStreamMitm,
	startRender,
} from "../../shared/lib";
import { downloadDividersAsPDF } from "./downloadDividersAsPDF";
import { selectPDFData } from "./lib";

function loadPDFKit() {
	return import("pdfkit/js/pdfkit.standalone.js").then((m) => m.default);
}

function* worker({ payload }: ReturnType<typeof downloadDividersAsPDF>) {
	const {
		dividers,
		layoutGrid,
		pageFormat,
		doubleSided,
		layout,
		singleItemPerPage,
		icons,
		bleedEnabled,
		language,
		scenarioParams,
		playerParams,
		investigatorParams,
		cropmarksEnabled,
		enablePageCounter,
		cornerRadiusEnabled,
		lasercutEnabled,
		creaseEnabled,
	}: ReturnType<typeof selectPDFData> = yield select(selectPDFData);

	const total = dividers.length;
	const lastId = last(dividers)?.id;

	if (total === 0 || !layoutGrid || !pageFormat || !layout || !lastId) {
		return;
	}

	const { dpi = 300 } = payload;

	const PDFDocument: Awaited<ReturnType<typeof loadPDFKit>> =
		yield call(loadPDFKit);

	setStreamMitm();

	const fileName = `Arkham Divider.pdf`;
	const fileStream = streamSaver.createWriteStream(fileName);
	const unitSize = getUnitSizePx({
		unitSize: layoutGrid.unitSize,
		dpi,
	});

	// Page size must be in px for fromPx2Pt; unitSize is in mm, so convert when singleItemPerPage
	const pageSizePx = getPageSize({
		units: "px",
		pageFormat,
		dpi,
		unitSize,
		singleItemPerPage,
		cropmarksEnabled,
	});

	const px = fromPx2Pt(dpi);
	const pageSizePt = {
		width: px(pageSizePx.width),
		height: px(pageSizePx.height),
	};

	const doc = new PDFDocument({
		size: [pageSizePt.width, pageSizePt.height],
		autoFirstPage: false,
		bufferPages: true,
	});
	const writer = fileStream.getWriter();

	let cancelled = false;

	doc.on("data", (chunk) => {
		writer.write(chunk).catch(() => {
			cancelled = true;
			destroyPDFDocument(doc);
		});
	});

	doc.on("end", () => writer.close());

	doc.on("error", (error) => {
		console.error("error", error);
	});

	let progress = 0;

	yield put(
		startRender({
			renderType: "pdf",
			message: "render.status.initializing",
			total,
			value: 0,
		}),
	);

	const vips: Awaited<ReturnType<typeof getVips>> = yield call(getVips);
	// Reduce vips memory pressure: no operation cache, allow enough tracked mem for 2 images
	if (typeof vips.Cache !== "undefined") {
		vips.Cache.max(0);
		vips.Cache.maxMem(80 * 1024 * 1024);
	}

	yield put(setRenderStatusMessage("render.status.creatingPDF"));
	yield put(setHideTextNodes(true));
	yield put(setHideIconNodes(true));
	yield put(setRenderProgressTotal(total));

	const pageLayouts: ReturnType<typeof getDividerPageLayouts> = yield call(
		getDividerPageLayouts,
		{
			dividers,
			layoutGrid,
			doubleSided,
			singleItemPerPage,
		},
	);

	const pdfLayouts = getPDFPageLayouts({
		pageLayouts,
		pageFormat,
		dpi,
		singleItemPerPage,
		cropmarksEnabled,
	});

	const font = new PDFFontService(doc);
	const text = new PDFTextService(font);
	const icon = new PDFIconService(text, icons);
	const lasercut = new PDFLasercutService(doc, {
		cornerRadiusEnabled,
		bleedEnabled,
		enabled: lasercutEnabled,
	});
	const cropmarks = new PDFCropmarkService(doc);
	const image = new PDFImageService(doc);
	const counter = new PDFCounterService(text, pageSizePt);
	const crease = new PDFCreaseService(doc, { enabled: creaseEnabled });

	const hideCounter =
		(singleItemPerPage && !cropmarksEnabled) || !enablePageCounter;

	const { background = true } = layout;
	const renderComponent: ReturnAwaited<typeof loadDividerPDFComponent> =
		yield call(loadDividerPDFComponent, layout.categoryId);

	const arkhamesqueClassicData: IArkhamesqueBuild | null = yield select(
		(state: RootState) =>
			state.arkhamesqueClassic ? selectArkhamesqueClassicData(state) : null,
	);

	if (!renderComponent) {
		console.error(`No PDF component for category: ${layout.categoryId}`);
		destroyPDFDocument(doc);
		yield put(finishRender());
		return;
	}

	try {
		renderLoop: for (const pdfLayout of pdfLayouts) {
			if (cancelled) {
				break;
			}
			doc.addPage();
			for (const [rowIndex, row] of pdfLayout.items.entries()) {
				for (const [colIndex, item] of row.items.entries()) {
					if (cancelled) {
						break renderLoop;
					}

					if (!item) {
						continue;
					}

					yield put(setDividerRenderId(item.id));
					yield delay(50);

					const itemSizePt = {
						width: px(item.size.width),
						height: px(item.size.height),
					};

					const position = {
						x: px(item.position.x),
						y: px(item.position.y),
					};

					if (background) {
						const { x, y } = position;
						let contents: ReturnAwaited<typeof renderDivider> | null =
							yield call(renderDivider, {
								dividerId: item.id,
								side: item.side,
								dpi,
								size: item.size,
								imageFormat: "jpeg",
								...layout.renderOptions,
							});

						if (!contents) {
							continue;
						}
						let buffer: Buffer | null = Buffer.from(contents);
						doc.opacity(1);

						doc.image(buffer, x, y, itemSizePt);
						buffer = null;
						contents = null;
					}

					const unit = new PDFUnitService(doc, {
						dpi,
						position,
						size: itemSizePt,
						bleedEnabled,
						bleedSize: layout.bleed,
					});

					yield call(renderComponent, item, {
						dpi,
						layout,
						bleedEnabled,
						creaseEnabled,
						icon,
						text,
						unit,
						lasercut,
						crease,
						doc,
						image,
						language,
						scenarioParams,
						playerParams,
						investigatorParams,
						arkhamesqueClassicData,
					});

					if (!hideCounter) {
						yield call(counter.draw, {
							number: pdfLayout.number,
							total: pdfLayout.total,
							showSide: doubleSided,
							side: pdfLayout.side,
						});
					}

					if (cropmarksEnabled) {
						cropmarks.draw({
							grid: pdfLayout.grid,
							rowIndex,
							colIndex,
							bleedEnabled,
							bleed: layout.bleed,
							position,
						});
					}

					progress++;
					yield put(setRenderProgress(progress));
				}
			}
		}
	} catch (error) {
		console.error("error", error);
	}

	if (!cancelled) {
		doc.end();
	}

	yield put(finishRender());
}

export function* downloadDividersAsPDFSaga() {
	yield takeLatest(downloadDividersAsPDF.match, worker);
}
