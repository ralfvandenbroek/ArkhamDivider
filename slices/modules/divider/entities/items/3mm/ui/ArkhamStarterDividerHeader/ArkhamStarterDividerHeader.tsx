import { Box, type BoxProps } from "@mui/material";
import { useContext } from "react";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import {
	get3mmDividerTitleObject,
	show3mmDividerIconCorner,
	show3mmDividerPlayerCorner,
} from "../../lib";
// import { Image } from "@/shared/ui";
// import { arkhamStarterDividerBaseUrl as baseUrl } from "../../../config";
import { ArkhamStarterDividerContext } from "../ArkhamStarterDividerContext";
import { ArkhamStarterDividerPlayerCorner as PlayerCorner } from "../ArkhamStarterDividerPlayerCorner";
import { ArkhamStarterDividerStrip } from "../ArkhamStarterDividerStrip";
// import * as C from "./ArkhamStarterDividerTopHeader.components";
import * as S from "./ArkhamStarterDividerHeader.styles";

type ArkhamStarterDividerTopHeaderProps = BoxProps & {
	orientation?: "vertical" | "horizontal";
};

export function ArkhamStarterDividerHeader({
	orientation = "horizontal",
	...props
}: ArkhamStarterDividerTopHeaderProps) {
	const { divider } = useContext(ArkhamStarterDividerContext);
	const getPrintSx = usePrintUnit();
	const getLocaleSx = useLocaleSx();

	const titleObject = get3mmDividerTitleObject(divider);

	const titleSx = getLocaleSx(S.getTitleSx, { title: titleObject });
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const cornerIconSx = getPrintSx(S.getCornerIconSx);
	const stripSx = getPrintSx(S.getStripSx);
	const storyTitleSx = getLocaleSx(S.getStoryTitleSx);
	const storyStrokeSx = getPrintSx(S.getStoryStrokeSx);
	const playerCornerSx = getPrintSx(S.getPlayerCornerSx);

	const {
		value: title,
		translatedValue: translatedTitle,
		onChange: onTitleChange,
		onBlur: onTitleBlur,
		onFontSizeChange,
	} = useDividerText({
		divider: divider,
		param: "customTitle",
	});

	const {
		value: storyTitle,
		translatedValue: translatedStoryTitle,
		onChange: onStoryTitleChange,
		onBlur: onStoryTitleBlur,
		onFontSizeChange: onStoryFontSizeChange,
	} = useDividerText({
		divider: divider,
		param: "customStoryTitle",
		fontSizeScaleParam: "customStoryTitleFontSizeScale",
		custom: true,
		defaultValue: divider.story?.name,
	});

	const getDividerIcon = useDividerIcon({
		dividerId: divider.id,
	});

	const [icon, selectIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: divider.icon,
	});

	const isHorizontal = orientation === "horizontal";

	const showCornerIcon = show3mmDividerIconCorner(divider);
	const showPlayerCorner = show3mmDividerPlayerCorner(divider) && isHorizontal;

	return (
		<Box {...props}>
			{showCornerIcon && (
				<Icon icon={icon} sx={cornerIconSx} onClick={selectIcon} />
			)}
			{showPlayerCorner && <PlayerCorner sx={playerCornerSx} />}
			<DividerText
				dividerId={divider.id}
				sx={titleSx}
				value={title}
				defaultValue={translatedTitle}
				fitTextOptions={{
					minFontSize: 8,
					onFontSizeChange,
				}}
				onValueChange={onTitleChange}
				onBlur={onTitleBlur}
				clearProps={{ sx: titleClearSx }}
				outlineSx={outlineSx}
				contentEditable={isHorizontal}
			/>
			{divider.story && (
				<>
					<DividerText
						dividerId={divider.id}
						sx={storyTitleSx}
						value={storyTitle}
						defaultValue={translatedStoryTitle}
						fitTextOptions={{
							minFontSize: 8,
							onFontSizeChange: onStoryFontSizeChange,
						}}
						onValueChange={onStoryTitleChange}
						onBlur={onStoryTitleBlur}
						clearProps={{ sx: titleClearSx }}
						outlineSx={outlineSx}
						contentEditable={isHorizontal}
						strokeSx={storyStrokeSx}
					/>
					<ArkhamStarterDividerStrip sx={stripSx} />
				</>
			)}
		</Box>
	);
}
