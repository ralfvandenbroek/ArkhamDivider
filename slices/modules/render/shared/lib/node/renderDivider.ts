import {
	domToBlob,
	type Options as ModernScreenshotOptions,
} from "modern-screenshot";
import type Vips from "wasm-vips";
import type { Interpretation } from "wasm-vips";
import type { DPI } from "@/modules/print/shared/model";
import type { BoxSize } from "@/shared/model";
import type { ICCProfile, ImageFormat } from "../../model";
import { getVips } from "../getVips";
import { setJpegExifResolution } from "../logic/setJpegExifResolution";
import { setColourspace, setICCProfile, setResolution } from "../vips";
import { getDividerNodeById } from "./getDividerNodeById";

type Colourspace = keyof typeof Interpretation;

export type RenderDividerOptions = {
	dividerId: string;
	dpi: DPI;
	imageFormat: ImageFormat;
	renderOptions?: ModernScreenshotOptions;
	iccProfile?: ICCProfile;
	colourspace?: Colourspace;
	normaliseToSRGB?: boolean;
	size?: BoxSize;
	quality?: number;
	stripIccProfile?: boolean;
	intent?: number;
};

export const renderDivider = async ({
	dividerId,
	dpi,
	imageFormat,
	renderOptions,
	iccProfile,
	colourspace,
	normaliseToSRGB = true,
	size,
	quality,
	stripIccProfile = false,
	intent = 1, // 1 = relative
}: RenderDividerOptions) => {
	const node = getDividerNodeById(dividerId);
	// const scale = dpi / 96;
	const options = {
		...renderOptions,
		// scale,
		maximumCanvasSize: 60_000,
	};

	const iccTransformOptions = { intent };

	const blob = await domToBlob(node, options);

	const arrayBuffer = await blob.arrayBuffer();

	const vips = await getVips();
	let image: Vips.Image | null = vips.Image.newFromBuffer(arrayBuffer);

	// Normalise to sRGB first so lab+ICC pipeline is consistent (e.g. invocation AVIF with other profile).
	if (normaliseToSRGB) {
		const srgb = setColourspace(image, "srgb");
		image.delete();
		image = srgb;
	}

	if (size) {
		const scale = size.width / image.width;
		const next = image.resize(scale);
		image.delete();
		image = next;
	}

	if (!stripIccProfile && iccProfile) {
		const next = await setICCProfile({
			image,
			iccProfile,
			transformOptions: iccTransformOptions,
		});
		image.delete();
		image = next;
	}

	// Convert to color space
	if (colourspace) {
		const next = setColourspace(image, colourspace);
		image.delete();
		image = next;
	}

	// JPEG needs 8 bit depth
	if (["jpeg", "tiff"].includes(imageFormat) && image.format !== "uchar") {
		const next = image.cast("uchar");
		image.delete();
		image = next;
	}

	const ext = `.${imageFormat}`;

	const writeOptions = {
		// keep: "all",
		...(quality ? { Q: quality } : {}),
		...(imageFormat === "tiff"
			? { compression: "lzw", predictor: "horizontal" }
			: {}),
	};

	let contents: Uint8Array<ArrayBufferLike>;

	if (stripIccProfile) {
		contents = image.writeToBuffer(".jpg", {
			...writeOptions,
			strip: true,
		});
	} else {
		contents = image.writeToBuffer(ext, writeOptions);
	}

	// Delete image to free memory
	image.delete();
	image = null;

	if (!stripIccProfile) {
		return contents;
	}

	image = vips.Image.newFromBuffer(contents);

	if (iccProfile) {
		const next = await setICCProfile({
			image,
			iccProfile,
			transformOptions: iccTransformOptions,
		});
		image.delete();
		image = next;
	}

	if (imageFormat !== "jpeg") {
		image = setResolution(image, dpi);
	}

	contents = image.writeToBuffer(ext, {
		...writeOptions,
	});

	image.delete();
	image = null;

	if (imageFormat === "jpeg") {
		return setJpegExifResolution(contents, dpi);
	}

	return contents;
};
