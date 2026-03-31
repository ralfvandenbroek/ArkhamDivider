import { Box, type BoxProps } from "@mui/material";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamStarterDividerBaseUrl } from "../../config";

// import { usePrintUnit } from "@/modules/print/shared/lib";

const asset = prefix(arkhamStarterDividerBaseUrl);

type ArkhamStarterDividerPlayerCornerProps = BoxProps;

export function ArkhamStarterDividerPlayerCorner(
	props: ArkhamStarterDividerPlayerCornerProps,
) {
	// const getPrintSx = usePrintUnit();
	// const playerCornerSx = getPrintSx(S.getSx);
	return (
		<Box {...props}>
			<Image src={asset`/player.avif`} width="100%" />
		</Box>
	);
}
