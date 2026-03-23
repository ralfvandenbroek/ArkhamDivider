import { Box, type BoxProps, Stack, type SxProps } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import {
	getDividerFaction,
	getXPCostRangeName,
} from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic/params";
import { getFactionIcon } from "@/modules/faction/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import type { SarnetskyDividerProps } from "../../../model";
import { SarnetskyDividerContext } from "../../SarnetskyDividerContext";
import * as S from "./SarnetskyDividerPlayerSubtitle.styles";

type SarnetskyDividerPlayerSubtitleProps = BoxProps & {
	divider: SarnetskyDividerProps;
};

export function SarnetskyDividerPlayerSubtitle(
	props: SarnetskyDividerPlayerSubtitleProps,
) {
	const { sxOptions } = useContext(SarnetskyDividerContext);
	const { divider } = props;
	const { t } = useTranslation();
	const faction = getDividerFaction(divider);
	const xpCost = getDividerXPCost(divider);

	const factionIcon = faction && getFactionIcon(faction);
	const getPrintSx = usePrintUnit(sxOptions);
	const sxProp = getPrintSx(S.getSx);
	const iconSx = getPrintSx(S.getIconSx);

	const sx = {
		...props.sx,
		...sxProp,
	} as SxProps;

	if (!faction) {
		return null;
	}

	const key =
		divider.type === "investigator"
			? `cards.investigator`
			: `cards.faction.${faction}`;

	const title = t(key);

	const level = xpCost && getXPCostRangeName({ xpCost, absolute: true });

	return (
		<Box {...props} sx={sx}>
			<Stack>
				<Box>
					{title} (
					<Icon icon={factionIcon} sx={iconSx} />)
				</Box>
				{level && (
					<Box>
						{t(`divider.sarnetsky.xpCost`, {
							level,
						})}
					</Box>
				)}
			</Stack>
		</Box>
	);
}
