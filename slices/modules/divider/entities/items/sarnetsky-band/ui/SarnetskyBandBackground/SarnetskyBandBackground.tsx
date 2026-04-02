import type { SxProps } from "@mui/material";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import { Fragment } from "react";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { getSarnetskyStoryColor } from "../../../sarnetsky/lib";
import { sarnetskyBandImages } from "../../config/common";
import type { SarnetskyBandImage } from "../../model";
import { useSarnetskyBandContext } from "../SarnetskyBandContext";
import * as S from "./SarnetskyBandBackground.styles";

type SarnetskyBandBackgroundProps = BoxProps;

export function SarnetskyBandBackground(props: SarnetskyBandBackgroundProps) {
	const { sxOptions, divider } = useSarnetskyBandContext();
	const { type } = sxOptions;
	const getPrintSx = usePrintUnit(sxOptions);
	const backgroundColor = getSarnetskyStoryColor(divider.story);

	const frameSx = getPrintSx(S.getFrameSx);
	const variableSx = getPrintSx(S.getVariableSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const lineSx = getPrintSx(S.getLineSx);

	const images = sarnetskyBandImages[type];

	const sxMap: Record<SarnetskyBandImage["type"], SxProps> = {
		frame: frameSx,
		variable: variableSx,
		background: backgroundSx,
		line: lineSx,
	};

	return (
		<Box {...props} color={backgroundColor}>
			{images.map((item) => (
				<Fragment key={item.type}>
					{item.type === "background" ? (
						<Image sx={sxMap[item.type]} src={item.src} />
					) : (
						<Box component={item.Component} sx={sxMap[item.type]} />
					)}
				</Fragment>
			))}
		</Box>
	);
}
