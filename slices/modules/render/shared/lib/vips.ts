import type { Image } from "wasm-vips";
import { mm2px } from "@/modules/print/shared/lib";
import type { DPI } from "@/modules/print/shared/model";
import type { Colourspace, ICCProfile } from "../model";
import { loadICCProfile } from "./logic";

type SetICCProfileOptions = {
	image: Image;
	iccProfile: ICCProfile;
	transformOptions?: {
		embedded?: boolean;
		intent?: number;
	};
};

export const setICCProfile = async ({
	image,
	iccProfile,
	transformOptions = {
		embedded: true,
		intent: 1,
	},
}: SetICCProfileOptions) => {
	await loadICCProfile(iccProfile);
	return image.iccTransform(iccProfile, transformOptions);
};

export const setColourspace = (image: Image, colourspace: Colourspace) => {
	return image.colourspace(colourspace);
};

export const setResolution = (image: Image, dpi: DPI) => {
	image.setInt("resolution-unit", 2);
	image.setString("exif-ifd0-ResolutionUnit", "2");
	const resPxPerMm = mm2px(1, dpi);
	image.setDouble("xres", resPxPerMm);
	image.setDouble("yres", resPxPerMm);
	image.setArrayInt("exif-ifd0-XResolution", [dpi, 1]);
	image.setArrayInt("exif-ifd0-YResolution", [dpi, 1]);
	return image;
};
