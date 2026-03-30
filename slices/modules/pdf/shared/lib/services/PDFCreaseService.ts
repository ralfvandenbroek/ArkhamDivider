import { CREASE_COLOR, CREASE_LINE_WIDTH } from "../../config";

export type DrawCreaseLineOptions = {
	x: number;
	y: number;
	width: number;
};

type Options = {
	enabled: boolean;
};

export class PDFCreaseService {
	constructor(
		public readonly doc: PDFKit.PDFDocument,
		protected options: Options,
	) {}

	color = CREASE_COLOR;
	lineWidth = CREASE_LINE_WIDTH;

	/**
	 * Draw a single horizontal crease line starting at (x, y) with `width`.
	 */
	lineTo({ x, y, width }: DrawCreaseLineOptions) {
		if (!this.options.enabled) {
			return;
		}
		this.doc
			.moveTo(x, y)
			.lineTo(x + width, y)
			.lineWidth(this.lineWidth)
			.stroke(this.color);
	}
}
