import { Box, type BoxProps } from "@mui/material";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import {
	get3mmDividerDefaultIcon,
	get3mmSideStripPosition,
	show3mmDividerIconCorner,
} from "../../../lib";
import { useArkhamStarterDividerContext } from "../../ArkhamStarterDividerContext";
import { ArkhamStarterDividerStrip as Strip } from "../../ArkhamStarterDividerStrip";
import {
	ArkhamStarterDividerStoryTitleText,
	ArkhamStarterDividerTitleText as Title,
} from "../../text";
// import * as C from "./ArkhamStarterDividerSideHeader.components";
import * as S from "./ArkhamStarterDividerSideHeader.styles";

type ArkhamStarterDividerSideHeaderProps = BoxProps;

export function ArkhamStarterDividerSideHeader(
	props: ArkhamStarterDividerSideHeaderProps,
) {
	const { divider, titleObject } = useArkhamStarterDividerContext();
	const getPrintSx = usePrintUnit();

	const side = get3mmSideStripPosition(divider);

	const stripSx = getPrintSx(S.getStripSx, { side });
	const cornerIconSx = getPrintSx(S.getCornerIconSx);
	const titleSx = getPrintSx(S.getTitleSx, { title: titleObject });
	const storyTitleSx = getPrintSx(S.getStoryTitleSx, { side });
	const playerIconSx = getPrintSx(S.getPlayerIconSx, { title: titleObject });

	const showCornerIcon = show3mmDividerIconCorner(divider);

	const defaultIcon = get3mmDividerDefaultIcon(divider);

	const icon = getDividerIcon({
		divider,
		param: "icon",
		defaultIcon,
	});

	const playerIcon = getDividerIcon({
		divider,
		param: "playerIcon",
		defaultIcon: divider.story?.icon,
	});

	return (
		<Box {...props}>
			{showCornerIcon && <Icon icon={icon} sx={cornerIconSx} />}

			{playerIcon && <Icon icon={playerIcon} sx={playerIconSx} />}
			<Title sx={titleSx} />
			{divider.story && (
				<>
					<Strip sx={stripSx} />
					<ArkhamStarterDividerStoryTitleText sx={storyTitleSx} />
				</>
			)}
		</Box>
	);
}
