import { Box, type BoxProps } from "@mui/material";
import { useContext } from "react";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamDecoAssetUrl } from "../../config";
import { getArkhamDecoDefaultBackgroundIcon as getDefaultBackgroundIcon } from "../../lib";
import { ArkhamDecoDividerContext } from "../ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerBackgroundIcon.styles";

type ArkhamDecoDividerBackgroundIconProps = BoxProps;
export const ArkhamDecoDividerBackgroundIcon = ({
	...props
}: ArkhamDecoDividerBackgroundIconProps) => {
	const { divider } = useContext(ArkhamDecoDividerContext);
	const getPrintSx = usePrintUnit();

	const defaultIcon = getDefaultBackgroundIcon(divider);

	const getDividerIcon = useDividerIcon({ dividerId: divider.id, defaultIcon });

	const [icon, selectIcon] = getDividerIcon({
		param: "backgroundIcon",
	});

	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const sxProp = getPrintSx(S.getSx);
	const iconSx = getPrintSx(S.getIconSx);
	const iconContainerSx = getPrintSx(S.getIconContainerSx);
	const iconSelectionSx = getPrintSx(S.getIconSelectionSx);

	const sx = {
		...props.sx,
		...sxProp,
	};

	return (
		<>
			<Box {...props} sx={sx}>
				<Image src={`${arkhamDecoAssetUrl}/pattern.svg`} sx={backgroundSx} />
				<Box sx={iconContainerSx}>
					<DividerIcon dividerId={divider.id} icon={icon} sx={iconSx} visible />
				</Box>
			</Box>
			<Box sx={iconSelectionSx} onClick={selectIcon} />
		</>
	);
};
