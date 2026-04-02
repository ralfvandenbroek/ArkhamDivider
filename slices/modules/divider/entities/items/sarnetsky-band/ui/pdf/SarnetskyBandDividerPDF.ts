import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import type { SarnetskyBandParams } from "../../model";

const black = cmyk(0, 0, 0, 100);

export const SarnetskyBandDividerPDF: PDFDivider<SarnetskyBandParams> = async (
	props,
	ctx,
) => {
	const { story, fontSizeScale = 100 } = props;
	const { unit, text, lasercut, language } = ctx;
	const params = props.params as SarnetskyBandParams | undefined;

	const bleed = unit.fromBleed();
	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const t = withStoryTranslation(story);
	const title = params?.customTitle ?? t(props.title);
	const fontFamily = getDefaultDividerFontFamily(language);

	await text.draw(title, {
		x: bleed.x(),
		y: bleed.y() + bleed.height() / 2,
		width: bleed.width(),
		height: bleed.height(),
		fontSize: unit.mm((fontSizeScale / 100) * 4.8),
		align: "center",
		baseline: "middle",
		fontFamily,
		color: black,
		overprint: true,
	});

	const icon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: props.icon,
	});

	if (icon) {
		await ctx.icon.draw(icon, {
			x: bleed.x(unit.mm(2)),
			y: bleed.y(unit.mm(2)),
			width: unit.mm(10),
			height: unit.mm(10),
			fontSize: unit.mm(7),
			color: black,
			overprint: true,
			iconOptions: { scaleType: "circle" },
		});
	}
};
