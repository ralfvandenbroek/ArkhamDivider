import { Box, type BoxProps } from "@mui/material";
import { useContext } from "react";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamDecoAssetUrl } from "../../config";
import { ArkhamDecoDividerContext } from "../ArkhamDecoDividerContext/ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerBackgroundIcon.styles";

type ArkhamDecoDividerBackgroundIconProps = BoxProps;
export const ArkhamDecoDividerBackgroundIcon = ({
	...props
}: ArkhamDecoDividerBackgroundIconProps) => {
	const { divider } = useContext(ArkhamDecoDividerContext);
	const getPrintSx = usePrintUnit();

	const icon = getDividerIcon({
		divider,
		param: "backgroundIcon",
		defaultIcon: divider.icon,
	});

	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const sxProp = getPrintSx(S.getSx);
	const iconSx = getPrintSx(S.getIconSx);
	const iconContainerSx = getPrintSx(S.getIconContainerSx);

	const sx = {
		...props.sx,
		...sxProp,
	};

	return (
		<Box {...props} sx={sx}>
			<Image src={`${arkhamDecoAssetUrl}/pattern.svg`} sx={backgroundSx} />
			<Box sx={iconContainerSx}>
				<DividerIcon dividerId={divider.id} icon={icon} sx={iconSx} visible />
			</Box>
		</Box>
	);
};
