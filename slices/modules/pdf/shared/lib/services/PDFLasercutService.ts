import { DEFAULT_CORNER_RADIUS } from "@/modules/print/shared/config";
import { fromMm2Pt } from "@/modules/print/shared/lib";
import type { Constructor } from "@/shared/model";
import {
	LASERCUT_COLOR,
	LASERCUT_GAP,
	LASERCUT_LINE_WIDTH,
} from "../../config";

/** Same as PDFKit `roundedRect` — circle-to-bezier factor for 90° arcs. */
const KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);

type Options = {
	cornerRadiusEnabled: boolean;
	enabled: boolean;
	bleedEnabled: boolean;
};

type DrawRectOptions = {
	x: number;
	y: number;
	width: number;
	height: number;
};

type XPosition = "left" | "right";
type YPosition = "top" | "bottom";
export type CornerPosition = `${YPosition}-${XPosition}`;

type DrawCornerOptions = {
	position: CornerPosition;
	x: number;
	y: number;
};

export class PDFLasercutService {
	constructor(
		public readonly doc: PDFKit.PDFDocument,
		protected options: Options,
	) {}

	color = LASERCUT_COLOR;
	lineWidth = LASERCUT_LINE_WIDTH;
	bleedGap = LASERCUT_GAP;
	defaultCornerRadius = DEFAULT_CORNER_RADIUS;

	get gap() {
		const { bleedEnabled } = this.options;
		return bleedEnabled ? this.bleedGap : 0;
	}

	get cornerRadius() {
		const mm = fromMm2Pt();

		const { cornerRadiusEnabled } = this.options;
		return cornerRadiusEnabled ? mm(this.defaultCornerRadius) : 0;
	}

	drawRect(options: DrawRectOptions) {
		if (!this.options.enabled) {
			return;
		}
		const x = options.x - this.gap;
		const y = options.y - this.gap;
		const width = options.width + 2 * this.gap;
		const height = options.height + 2 * this.gap;

		this.doc
			.roundedRect(x, y, width, height, this.cornerRadius)
			.lineWidth(this.lineWidth)
			.stroke(this.color);
	}

	drawCorner(options: DrawCornerOptions) {
		const { cornerRadiusEnabled } = this.options;
		const r = this.cornerRadius;
		const { position, x, y } = options;

		// Clockwise around the shape (PDF: y downward). (x, y) is the outer vertex.
		if (!cornerRadiusEnabled) {
			switch (position) {
				case "top-right": {
					// → along top, then ↓ along right (same endpoints as the r>0 arc)
					return this.doc.lineTo(x, y).lineTo(x, y + r);
				}
				case "top-left": {
					// ↑ along left, then → along top
					return this.doc.lineTo(x, y).lineTo(x + r, y);
				}
				case "bottom-right": {
					// ↓ along right, then ← along bottom
					return this.doc.lineTo(x, y).lineTo(x - r, y);
				}
				case "bottom-left": {
					// ← along bottom, then ↑ along left
					return this.doc.lineTo(x, y).lineTo(x, y - r);
				}
			}
		}

		const c = r * (1 - KAPPA);

		switch (position) {
			case "top-right": {
				return this.doc.bezierCurveTo(x - c, y, x, y + c, x, y + r);
			}
			case "top-left": {
				return this.doc.bezierCurveTo(x, y + c, x + c, y, x + r, y);
			}
			case "bottom-right": {
				return this.doc.bezierCurveTo(x, y - c, x - c, y, x - r, y);
			}
			case "bottom-left": {
				return this.doc.bezierCurveTo(x + c, y, x, y - c, x, y - r);
			}
		}
	}

	from<T extends PDFLasercutService>(Service: Constructor<T>): T {
		return new Service(this.doc, this.options);
	}
}
