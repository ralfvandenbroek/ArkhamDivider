import { Box, type BoxProps } from "@mui/material";
import { useContext } from "react";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic/params";
import { usePrintUnit } from "@/modules/print/shared/lib";
import {
	get3mmDividerDefaultIcon,
	get3mmDividerTitleObject,
	show3mmDividerIconCorner,
	show3mmDividerPlayerCorner,
	show3mmDividerPlayerIcon,
} from "../../lib";
// import { Image } from "@/shared/ui";
// import { arkhamStarterDividerBaseUrl as baseUrl } from "../../../config";
import { ArkhamStarterDividerContext } from "../ArkhamStarterDividerContext";
import { ArkhamStarterDividerPlayerCorner as PlayerCorner } from "../ArkhamStarterDividerPlayerCorner";
import { ArkhamStarterDividerStrip } from "../ArkhamStarterDividerStrip";
import { ArkhamStarterDividerXP } from "../ArkhamStarterDividerXP";
// import * as C from "./ArkhamStarterDividerTopHeader.components";
import * as S from "./ArkhamStarterDividerHeader.styles";

type ArkhamStarterDividerTopHeaderProps = BoxProps;

export function ArkhamStarterDividerHeader({
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
	const playerIconSx = getPrintSx(S.getPlayerIconSx);
	const xpSx = getPrintSx(S.getXPSx);

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

	const xpCost = getDividerXPCost(divider);

	const getDividerIcon = useDividerIcon({
		dividerId: divider.id,
	});

	const [icon, selectIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: get3mmDividerDefaultIcon(divider),
	});

	const [playerIcon, selectPlayerIcon] = getDividerIcon({
		param: "playerIcon",
		defaultIcon: divider.story?.icon,
	});

	const showCornerIcon = show3mmDividerIconCorner(divider);
	const showPlayerCorner = show3mmDividerPlayerCorner(divider);
	const showPlayerIcon = show3mmDividerPlayerIcon(divider);

	return (
		<Box {...props}>
			{showCornerIcon && (
				<Icon icon={icon} sx={cornerIconSx} onClick={selectIcon} />
			)}
			{showPlayerIcon && (
				<Icon icon={playerIcon} sx={playerIconSx} onClick={selectPlayerIcon} />
			)}
			{showPlayerCorner && (
				<PlayerCorner sx={playerCornerSx} onClick={selectIcon} />
			)}

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
						strokeSx={storyStrokeSx}
					/>
					<ArkhamStarterDividerStrip sx={stripSx} />
				</>
			)}
			{xpCost && (
				<ArkhamStarterDividerXP
					xpCost={xpCost}
					sx={xpSx}
					titleClearSx={titleClearSx}
					outlineSx={outlineSx}
				/>
			)}
		</Box>
	);
}
