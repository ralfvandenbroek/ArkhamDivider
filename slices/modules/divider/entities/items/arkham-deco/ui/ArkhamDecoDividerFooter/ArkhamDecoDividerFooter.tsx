import { Box } from "@mui/material";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamDecoAssetUrl } from "../../config";
import * as S from "./ArkhamDecoDividerFooter.styles";

const asset = prefix(arkhamDecoAssetUrl);

export function ArkhamDecoDividerFooter() {
	const getPrintSx = usePrintUnit();
	const lineSx = getPrintSx(S.getBottomLineSx);

	return (
		<>
			<BottomCorner position="left" />
			<BottomCorner position="right" />
			<Image src={asset("/bottom-line.svg")} sx={lineSx} />
		</>
	);
}

const BottomCorner = ({ position }: { position: "left" | "right" }) => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getBottomCornerSx, { position });
	const imageSx = getPrintSx(S.getBottomCornerImageSx);
	const tentacleSx = getPrintSx(S.getBottomTentacleSx);

	return (
		<Box sx={sx}>
			<Image src={asset("/bottom-tentacle.svg")} sx={tentacleSx} />
			<Image src={asset("/bottom-corner.svg")} sx={imageSx} />
		</Box>
	);
};
