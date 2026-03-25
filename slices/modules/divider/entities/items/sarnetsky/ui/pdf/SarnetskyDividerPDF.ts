import { getLocaleConfig } from "@/modules/core/i18n/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import {
	getDividerFaction,
	getDividerSubtype,
} from "@/modules/divider/shared/lib/logic/params";
import { cmyk, type DrawIconOptions } from "@/modules/pdf/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	getIsSarnetskyLightTitleColor,
	getSarnetskyDefaultDividerIcon,
	getSarnetskyLayoutObjects,
} from "../../lib";
import type { SarnetskyDividerParams } from "../../model";

const black = cmyk(0, 0, 0, 100);
const white = cmyk(0, 0, 0, 0);

export const SarnetskyDividerPDF: PDFDivider<SarnetskyDividerParams> = async (
	props,
	ctx,
) => {
	const { story, fontSizeScale = 100, type } = props;
	const { text, lasercut, unit, language, layout } = ctx;

	const params = props.params as SarnetskyDividerParams | undefined;

	const O = getSarnetskyLayoutObjects(layout);
	const t = withStoryTranslation(story);

	const textConfig = getLocaleConfig(language, O.title);
	const translatedTitle = t(props.title);
	const title = params?.customTitle ?? translatedTitle;

	const { mm } = unit;

	const fontSize = mm((fontSizeScale / 100) * textConfig.fontSize);
	const bleed = unit.fromBleed();

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const fontFamily = getDefaultDividerFontFamily(language);

	const textHeight = mm(textConfig.height);
	const textTop = bleed.y(textConfig.top);

	const subtype = getDividerSubtype(props);
	const faction = getDividerFaction(props);

	const isLight = getIsSarnetskyLightTitleColor({
		faction,
		subtype,
	});

	const color = isLight ? white : black;

	await text.draw(title, {
		x: bleed.x(textConfig.left),
		y: textTop + textHeight / 2,
		width: bleed.width(textConfig.left, textConfig.right),
		height: textHeight,
		fontSize,
		align: "center",
		baseline: "middle",
		overprint: !isLight,
		fontFamily,
		color,
	});

	const iconObjects = O.icons[type] ?? [];

	const defaultCampaignIcon = props.story?.icon;

	for (const config of iconObjects) {
		const defaultIcon = getSarnetskyDefaultDividerIcon({
			type: config.type,
			iconId: config.id,
			icon: props.icon,
			campaignIcon: defaultCampaignIcon,
		});

		// const customIcon = params?.[config.id];
		const customIcon = getDividerIcon({
			divider: props,
			param: config.id,
			defaultIcon,
		});

		if (!customIcon) {
			continue;
		}

		const color = config.light ? white : black;

		await ctx.icon.draw(customIcon, {
			x: bleed.right(config.right + config.width),
			y: bleed.y(config.top),
			width: mm(config.width),
			height: mm(config.height),
			fontSize: mm(config.fontSize),
			color,
			overprint: !config.light,
			iconOptions: config.params,
		});
	}

	const backgroundIcon = getDividerIcon({
		divider: props,
		param: "background",
		defaultIcon: props.icon,
	});

	const bgRect = params?.backgroundIconRect;

	if (props.layoutType === "scenario" && bgRect && backgroundIcon) {
		const bgBox = bleed.box({
			top: bgRect.top,
			left: bgRect.left,
			width: bgRect.width,
			height: bgRect.height,
		});
		const fontSize = mm(bgRect.height);

		const drawOptions = {
			x: bgBox.x(),
			y: bgBox.y(),
			width: bgBox.width(),
			height: bgBox.height(),
			fontSize,
			color: black,
			opacity: O.background.opacity,
			overprint: true,
			manifest: false,
		} as DrawIconOptions;

		await ctx.icon.draw(backgroundIcon, drawOptions);
	}

	const scenarioEncounters = params?.scenarioEncounters ?? [];

	if (props.layoutType === "scenario" && scenarioEncounters.length > 0) {
		for (const encounter of scenarioEncounters) {
			const box = bleed.box({
				top: encounter.top,
				left: encounter.left,
				width: encounter.width,
				height: encounter.height,
			});
			const fontSize = mm(encounter.height);

			await ctx.icon.draw(encounter.icon, {
				x: box.x(),
				y: box.y(),
				width: box.width(),
				height: box.height(),
				fontSize,
				color: black,
				overprint: true,
			});
		}
	}

	if (props.layoutType === "scenario") {
		// const scenarioSubtitle =
	}
};
