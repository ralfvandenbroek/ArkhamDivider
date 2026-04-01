import type { VintageDividerLocaleSxCallback } from "../../../model";

export const getSx: VintageDividerLocaleSxCallback = ({ mm, objects: O }) => ({
	default: {
		fontFamily: "Atlantic Cruise Extended, Arkhamic, Teutonic, serif",
		fontSize: mm(O.title.default.fontSize),
		textAlign: "center",
	},
	ru: {
		fontFamily: "Breamcatcher, Conkordia, serif",
	},
	cn: {
		fontFamily: "ZhenShuai, serif",
	},
	ko: {
		fontFamily: "Line Seed, serif",
	},
});
