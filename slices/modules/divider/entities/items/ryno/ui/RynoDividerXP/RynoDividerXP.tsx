import { Box, type BoxProps } from "@mui/material";
import type { SxProps } from "@mui/material/styles";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { getXPLevel, getXPMax } from "@/modules/divider/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { rynoDividerAssetsBaseUrl } from "../../config";
import { useRynoDividerContext } from "../RynoDividerContext";
import * as S from "./RynoDividerXP.styles";

type RynoDividerXPProps = BoxProps;

const xpSrc = `${rynoDividerAssetsBaseUrl}/xp.avif`;

export function RynoDividerXP(props: RynoDividerXPProps) {
	const { divider } = useRynoDividerContext();
	const getPrintSx = usePrintUnit();

	if (divider.type !== "player" || !divider.xpCost) {
		return null;
	}

	const { xpCost } = divider;
	const level = getXPLevel(xpCost) ?? 0;
	const max = getXPMax(xpCost);
	const _maxIconLevel = max ?? level ?? 5;

	const containerSx = getPrintSx(S.getContainerSx);
	const imageSx = getPrintSx(S.getImageSx);
	const valueSx = getPrintSx(S.getValueSx);
	const levelsSx = getPrintSx(S.getLevelsSx);
	// const levelIconSx = getPrintSx(S.getLevelIconSx);
	const maxLevelIconSx = getPrintSx(S.getLevelIconSx);

	const sx = {
		...containerSx,
		...props.sx,
	} as SxProps;

	return (
		<Box {...props} sx={sx}>
			<Box component="img" src={xpSrc} alt="" sx={imageSx} />

			<Box sx={valueSx}>{xpCost.name}</Box>

			<Box sx={levelsSx}>
				{level > 0 && (
					<Box sx={maxLevelIconSx} color="#fff" zIndex={2}>
						<Icon icon={`ae_level_${level}`} scaleType={false} />
					</Box>
				)}
				<Box sx={maxLevelIconSx} color="#646464" zIndex={1}>
					<Icon icon={`ae_level_5`} scaleType={false} />
				</Box>
			</Box>
		</Box>
	);
}
